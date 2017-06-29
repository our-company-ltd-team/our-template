using ImageSharp;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Logging;
using System;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace ImageResizer
{
    public class ImageResizerMiddleware
    {
        private struct ResizeParams
        {
            public bool hasParams;
            public int w;
            public int h;
            public bool autorotate;
            public int quality; // 0 - 100
            public string format; // png, jpg, jpeg
            public string mode; // pad, max, crop, stretch

            public static string[] modes = new string[] { "pad", "max", "crop", "stretch" };

            public override string ToString()
            {
                var sb = new StringBuilder();
                sb.Append($"w: {w}, ");
                sb.Append($"h: {h}, ");
                sb.Append($"autorotate: {autorotate}, ");
                sb.Append($"quality: {quality}, ");
                sb.Append($"format: {format}, ");
                sb.Append($"mode: {mode}");

                return sb.ToString();
            }
        }

        private readonly RequestDelegate _next;
        private readonly ILogger<ImageResizerMiddleware> _logger;
        private readonly IHostingEnvironment _env;
        private readonly IMemoryCache _memoryCache;

        private static readonly string[] suffixes = new string[] {
            ".png",
            ".jpg",
            ".jpeg"
        };

        public ImageResizerMiddleware(RequestDelegate next, IHostingEnvironment env, ILogger<ImageResizerMiddleware> logger, IMemoryCache memoryCache)
        {
            _next = next;
            _env = env;
            _logger = logger;
            _memoryCache = memoryCache;
        }

        public async Task Invoke(HttpContext context)
        {
            var path = context.Request.Path;

            // hand to next middleware if we are not dealing with an image
            if (context.Request.Query.Count == 0 || !IsImagePath(path))
            {
                await _next.Invoke(context);
                return;
            }

            // hand to next middleware if we are dealing with an image but it doesn't have any usable resize querystring params
            var resizeParams = GetResizeParams(path, context.Request.Query);
            if (!resizeParams.hasParams || (resizeParams.w == 0 && resizeParams.h == 0))
            {
                await _next.Invoke(context);
                return;
            }

            // if we got this far, resize it
            _logger.LogInformation($"Resizing {path.Value} with params {resizeParams}");
            await _Invoke(context, path, resizeParams);
        }

        private async Task _Invoke(HttpContext context, PathString path, ResizeParams resizeParams)
        {
            var wwwroot = _env.WebRootPath ?? Path.Combine(Directory.GetCurrentDirectory(), "wwwroot");
            // get the image location on disk
            var imagePath = Path.Combine(
                wwwroot,
                path.Value.Replace('/', Path.DirectorySeparatorChar).TrimStart(Path.DirectorySeparatorChar));

            // check file lastwrite
            var lastWriteTimeUtc = File.GetLastWriteTimeUtc(imagePath);
            if (lastWriteTimeUtc.Year < 1601) // file doesn't exist, pass to next middleware
            {
                await _next.Invoke(context);
                return;
            }

            var imageData = GetImageData(imagePath, resizeParams, lastWriteTimeUtc);

            // write to stream
            context.Response.ContentType = resizeParams.format == "png" ? "image/png" : "image/jpeg";
            context.Response.ContentLength = imageData.Length;
            await context.Response.Body.WriteAsync(imageData.ToArray(), 0, (int)imageData.Length);
        }

        private byte[] GetImageData(string imagePath, ResizeParams resizeParams, DateTime lastWriteTimeUtc)
        {
            // check cache and return if cached
            long cacheKey;
            unchecked
            {
                cacheKey = imagePath.GetHashCode() + lastWriteTimeUtc.ToBinary() + resizeParams.ToString().GetHashCode();
            }

            byte[] imageBytes;
            bool isCached = _memoryCache.TryGetValue<byte[]>(cacheKey, out imageBytes);
            if (isCached)
            {
                _logger.LogInformation("Serving from cache");
                return imageBytes;
            }

            using (var image = Image.Load(imagePath))
            {
                if (resizeParams.autorotate) image.AutoOrient();
                if (resizeParams.h == 0)
                    resizeParams.h = (int)Math.Round(image.Height * (float)resizeParams.w / image.Width);
                else if (resizeParams.w == 0)
                    resizeParams.w = (int)Math.Round(image.Width * (float)resizeParams.h / image.Height);

                if (resizeParams.mode == "crop") image.Crop(resizeParams.w, resizeParams.h);
                if (resizeParams.mode == "pad" || resizeParams.mode == "max")
                {
                    var bitmapRatio = (float)image.Width / image.Height;
                    var resizeRatio = (float)resizeParams.w / resizeParams.h;

                    if (bitmapRatio > resizeRatio) // original is more "landscape"
                        resizeParams.h = (int)Math.Round(image.Height * ((float)resizeParams.w / image.Width));
                    else
                        resizeParams.w = (int)Math.Round(image.Width * ((float)resizeParams.h / image.Height));
                }

                image.Resize(resizeParams.w, resizeParams.h);
                using (var ms = new MemoryStream())
                {
                    image.Save(ms);
                    imageBytes = ms.ToArray();
                }
                _memoryCache.Set<byte[]>(cacheKey, imageBytes);
            }

            return imageBytes;
        }

        private bool IsImagePath(PathString path)
        {
            if (path == null || !path.HasValue)
                return false;

            return suffixes.Any(x => x.EndsWith(x, StringComparison.OrdinalIgnoreCase));
        }

        private ResizeParams GetResizeParams(PathString path, IQueryCollection query)
        {
            ResizeParams resizeParams = new ResizeParams();

            // before we extract, do a quick check for resize params
            resizeParams.hasParams =
                resizeParams.GetType().GetTypeInfo()
                .GetFields().Where(f => f.Name != "hasParams")
                .Any(f => query.ContainsKey(f.Name));

            // if no params present, bug out
            if (!resizeParams.hasParams)
                return resizeParams;

            // extract resize params

            if (query.ContainsKey("format"))
                resizeParams.format = query["format"];
            else
                resizeParams.format = path.Value.Substring(path.Value.LastIndexOf('.') + 1);

            if (query.ContainsKey("autorotate"))
                bool.TryParse(query["autorotate"], out resizeParams.autorotate);

            int quality = 100;
            if (query.ContainsKey("quality"))
                int.TryParse(query["quality"], out quality);
            resizeParams.quality = quality;

            int w = 0;
            if (query.ContainsKey("w"))
                int.TryParse(query["w"], out w);
            resizeParams.w = w;

            int h = 0;
            if (query.ContainsKey("h"))
                int.TryParse(query["h"], out h);
            resizeParams.h = h;

            resizeParams.mode = "max";
            // only apply mode if it's a valid mode and both w and h are specified
            if (h != 0 && w != 0 && query.ContainsKey("mode") && ResizeParams.modes.Any(m => query["mode"] == m))
                resizeParams.mode = query["mode"];

            return resizeParams;
        }
    }
}