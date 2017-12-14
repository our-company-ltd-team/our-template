using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using Microsoft.Extensions.DependencyInjection;
using MongoDB.Driver;
using ourCompany.cms.Data;
using ourCompany.cms.Data.Providers;
using System.Linq;

namespace OURNAMESPACE.Routing.Constraints
{
    // todo : move to the right place
    public class NodeExistsConstraint<T> : IRouteConstraint
    {
        public const string HTTPCONTEXT_ITEMS_KEY = "__Constraint";

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
            var elementName = _MatchElementName ?? routeKey;
            var db = values.ContainsKey("lang") ? dbProvider.Databases.FirstOrDefault(d => d.Language == values["lang"].ToString()) : dbProvider.Default;
            var exists = db.Find(filter: Builders<T>.Filter.Eq(elementName, value)).Any();
            if (exists)
            {
                httpContext.Items[$"{HTTPCONTEXT_ITEMS_KEY}:{routeKey}"] = new NodeConstraints { Type = typeof(T), ElementName = elementName, Key = routeKey, Value = value };
            }
            return exists;
        }
    }
}