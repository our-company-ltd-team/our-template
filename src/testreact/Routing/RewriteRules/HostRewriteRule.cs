using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Rewrite;
using Microsoft.Net.Http.Headers;
using System;
using System.Net;

namespace ourservers.io.Routing.RewriteRules
{
    /// <summary>
    /// <see cref="IRule" /> that redirects the request from a host to the another host for a
    /// specific folder
    /// </summary>
    /// <seealso cref="Microsoft.AspNetCore.Rewrite.IRule" />
    public class HostRewriteRule : IRule
    {
        private readonly PathString directory;
        private readonly string newhost;
        private readonly string oldhost;

        /// <summary>
        /// Initializes a new instance of the <see cref="LocalHostDropboxRewriteRule" /> class. 
        /// </summary>
        /// <param name="oldhost"> The old host name </param>
        /// <param name="newhost"> The new host name </param>
        /// <param name="foldername"> The directory name. </param>
        public HostRewriteRule(string oldhost, string newhost, string directory = null)
        {
            this.oldhost = oldhost;
            this.newhost = newhost;
            if (directory != null)
                this.directory = $"/{directory.Trim('/')}";
        }

        public int StatusCode => (int)HttpStatusCode.Moved;

        /// <summary>
        /// Applies the rule. Implementations of ApplyRule should set the value for
        /// <see cref="P:Microsoft.AspNetCore.Rewrite.RewriteContext.Result" /> (defaults to
        /// RuleResult.ContinueRules)
        /// </summary>
        /// <param name="context"></param>
        public void ApplyRule(RewriteContext context)
        {
            var request = context.HttpContext.Request;
            var host = request.Host;

            if (!string.Equals(host.Host, oldhost, StringComparison.OrdinalIgnoreCase))
            {
                context.Result = RuleResult.ContinueRules;
                return;
            }

            if (directory != null && !request.Path.StartsWithSegments(directory))
            {
                context.Result = RuleResult.ContinueRules;
                return;
            }

            var newPath = request.Scheme + "://" + newhost + request.PathBase + request.Path + request.QueryString;

            var response = context.HttpContext.Response;
            response.StatusCode = StatusCode;
            response.Headers[HeaderNames.Location] = newPath;
            context.Result = RuleResult.EndResponse; // Do not continue processing the request
        }
    }
}