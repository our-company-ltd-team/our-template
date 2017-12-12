using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Localization;
using System;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace OURNAMESPACE.Routing.RequestCultureProviders
{
    public class UrlRequestCultureProvider : IRequestCultureProvider
    {
        public Task<ProviderCultureResult> DetermineProviderCultureResult(HttpContext httpContext)
        {
            var url = httpContext.Request.Path;

            //Quick and dirty parsing of language from url path, which looks like /api/es-ES/hello-world
            var parts = httpContext.Request.Path.Value
                         .Split('/')
                         .Where(p => !String.IsNullOrWhiteSpace(p));
            if (!parts.Any())
            {
                return Task.FromResult<ProviderCultureResult>(null);
            }
            var culture = parts.FirstOrDefault();
            var hasCulture = Regex.IsMatch(culture, @"^[a-z]{2}(?:-[A-Z]{2})?$");
            if (!hasCulture)
            {
                return Task.FromResult<ProviderCultureResult>(null);
            }
            return Task.FromResult(new ProviderCultureResult(culture));
        }
    }
}