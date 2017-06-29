using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Routing;
using Microsoft.AspNetCore.Http;
using ourCompany.cms.Data.Providers;
using ourCompany.cms.Data;
using MongoDB.Driver;

namespace <%=namespace %>.Routing.Constraints
{
    // todo : move to the right place
    public class NodeExistsConstraint<T> : IRouteConstraint
    {
        private string _MatchElementName;

        public NodeExistsConstraint(string matchElementName = null)
        {
            _MatchElementName = matchElementName;
        }

        public bool Match(HttpContext httpContext, IRouter route, string routeKey, RouteValueDictionary values, RouteDirection routeDirection)
        {
            if (!values.ContainsKey(routeKey)) return false;
            var value = values[routeKey];
            var dbProvider = httpContext.RequestServices.GetService<IDBProvider>();
            return dbProvider.Default.Find(filter: Builders<T>.Filter.Eq(_MatchElementName ?? routeKey, value)).Count() > 0;
        }
    }
}
