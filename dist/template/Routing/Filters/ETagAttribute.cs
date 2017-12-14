using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Extensions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using ourCompany.cms;
using System;
using System.Security.Cryptography;
using System.Text;

namespace <%=namespace %>.Routing.Filters
{
    /// <summary>
    /// Adds ETags on ActionResults 
    /// </summary>

    /// <seealso cref="Microsoft.AspNetCore.Mvc.Filters.IActionFilter" />
    public class CmsETagFilter : IActionFilter
    {
        public static int Database_Version = 0;
        private readonly int[] _statusCodes;
        private readonly long _versionPrefix;
        private int _database_version;

        /// <summary>
        /// Initializes a new instance of the <see cref="ETagAttribute" /> class. 
        /// </summary>
        /// <param name="statusCodes"> The status codes. </param>
        public CmsETagFilter(params int[] statusCodes)
        {
            _statusCodes = statusCodes;
            _versionPrefix = DateTime.UtcNow.Ticks;
            Events.Instance.Changed += (sender, nodes) => _database_version += 1;
            if (statusCodes.Length == 0) _statusCodes = new[] { 200 };
        }

        /// <summary>
        /// Called before the action executes, after model binding is complete. 
        /// </summary>
        /// <param name="context">
        /// The <see cref="T:Microsoft.AspNetCore.Mvc.Filters.ActionExecutingContext" />.
        /// </param>
        public void OnActionExecuting(ActionExecutingContext context)
        {
            var etag = GenerateETag(context.HttpContext.Request, $"{_versionPrefix}_{_database_version}");
            if (context.HttpContext.Request.Headers.Keys.Contains("If-None-Match") && context.HttpContext.Request.Headers["If-None-Match"].ToString() == etag)
            {
                context.Result = new StatusCodeResult(304);
            }
            context.HttpContext.Response.Headers.Add("ETag", new[] { etag });
        }

        /// <summary>
        /// Called after the action executes, before the action result. 
        /// </summary>
        /// <param name="context">
        /// The <see cref="T:Microsoft.AspNetCore.Mvc.Filters.ActionExecutedContext" />.
        /// </param>
        public void OnActionExecuted(ActionExecutedContext context)
        {
            //if (context.HttpContext.Request.Method == "GET")
            //{
            //    if (_statusCodes.Contains(context.HttpContext.Response.StatusCode))
            //    {
            //        //I just serialize the result to JSON, could implement IEquality<> for better performance.
            //        var content = context.Result;
            //        var etag = string.Empty;
            //        if (content is FileContentResult fileContentResult)
            //        {
            //            etag = GenerateETag(context.HttpContext.Request, fileContentResult.FileDownloadName);
            //        }
            //        else if (content is Results.PageResult pageResult)
            //        {
            //            etag = GenerateETag(context.HttpContext.Request, pageResult.Content);
            //        }
            //        if (etag == string.Empty) return;

            //        if (context.HttpContext.Request.Headers.Keys.Contains("If-None-Match") && context.HttpContext.Request.Headers["If-None-Match"].ToString() == etag)
            //        {
            //            context.Result = new StatusCodeResult(304);
            //        }
            //        context.HttpContext.Response.Headers.Add("ETag", new[] { etag });
            //    }
            //}
        }

        private static string GenerateETag(HttpRequest req, string body)
        {
            // TODO: consider supporting VaryBy header in key? (not required atm in this app)
            var combinedKey = req.GetDisplayUrl() + body;
            var combinedBytes = Encoding.UTF8.GetBytes(combinedKey);

            using (var md5 = MD5.Create())
            {
                var hash = md5.ComputeHash(combinedBytes);
                var hex = BitConverter.ToString(hash);
                return hex.Replace("-", "");
            }
        }
    }
}