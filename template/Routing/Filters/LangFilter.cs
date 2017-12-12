using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Routing;
using MongoDB.Bson;
using MongoDB.Driver;
using ourCompany.cms.Data;
using ourCompany.cms.Data.Providers;
using ourCompany.cms.Model;
using OURNAMESPACE.Routing.Constraints;
using System.Globalization;
using System.Linq;

namespace OURNAMESPACE.Routing.Filters
{
    public class LangFilter : IActionFilter
    {
        public void OnActionExecuted(ActionExecutedContext context)
        {
        }

        public void OnActionExecuting(ActionExecutingContext context)
        {
            var l = context.HttpContext.Request.Query["switch-lang"];
            if (string.IsNullOrEmpty(l)) return;
            RedirectLang(context, l);
        }

        private void RedirectLang(ActionExecutingContext context, string lang)
        {
            var dbProvider = context.HttpContext.RequestServices.GetService(typeof(IDBProvider)) as IDBProvider;
            var db = dbProvider.Databases.First(d => d.Language == lang);
            var dict = new RouteValueDictionary(context.RouteData.Values)
            {
                ["lang"] = lang
            };

            var contraintKeys = context.HttpContext.Items.Values.OfType<NodeConstraints>();

            foreach (var constraint in contraintKeys)
            {
                var nodemap = NodeMap.Lookup(constraint.Type);
                var collectionName = nodemap.CollectionName;
                var filter = Builders<BsonDocument>.Filter.Eq(constraint.ElementName, constraint.Value);
                var target = dbProvider.Default.Find(collectionName: nodemap.CollectionName, filter: filter).First();
                var idElementName = nodemap.ClassMap.IdMemberMap?.ElementName ?? "_id";
                var newTarget = db.Find(collectionName: nodemap.CollectionName, filter: Builders<BsonDocument>.Filter.Eq(idElementName, target[idElementName])).First();

                dict[constraint.Key] = newTarget[constraint.ElementName].AsString;
            }
            // set the current lang =
            var cultureInfo = new CultureInfo(lang);
            CultureInfo.DefaultThreadCurrentCulture = cultureInfo;
            CultureInfo.DefaultThreadCurrentUICulture = cultureInfo;
            CultureInfo.CurrentCulture = cultureInfo;
            CultureInfo.CurrentUICulture = cultureInfo;

            var query = context.HttpContext.Request.Query;

            foreach (var key in query.Keys)
            {
                if (key != "switch-lang" && !dict.ContainsKey(key))
                {
                    dict.Add(key, query[key].FirstOrDefault() ?? "");
                }
            }

            context.Result = new RedirectToRouteResult(dict);
        }
    }
}