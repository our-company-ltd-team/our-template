using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Mvc.Rendering;
using ourCompany.cms.Data;
using ourCompany.cms.Data.Providers;
using <%=namespace %>.Models;
using System.Threading.Tasks;

namespace <%=namespace %>.Controllers
{
    /// <summary>
    /// A base class for an MVC controller with view support and DB support using D.I. 
    /// </summary>
    /// <seealso cref="Microsoft.AspNetCore.Mvc.Controller" />
    public abstract class BaseController : Controller
    {
        protected readonly IDBProvider DBProvider;
        protected readonly IHtmlHelper HtmlHelper;
        //protected readonly IStringLocalizer<SharedResource> SharedLocalizer;

        public BaseController(IHtmlHelper htmlHelper, IDBProvider dbProvider) //, IStringLocalizer<SharedResource> sharedLocalizer)
        {
            DBProvider = dbProvider;
            HtmlHelper = htmlHelper;
            //SharedLocalizer = sharedLocalizer;
        }

        protected DB DB => DBProvider.Default;

        public override Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            ViewBag.DB = DBProvider.Default;

            var config = DB.Root.Child<Config>().Get();

            // we keep the BrowserTitle and GoogleDescription in the Viewbag in order to be able to
            // override them in the controllers
            ViewBag.BrowserTitle = config?.BrowserTitle ?? "";
            ViewBag.GoogleDescription = config?.GoogleDescription ?? "";

            var lang = System.Globalization.CultureInfo.CurrentCulture.Name;

            return base.OnActionExecutionAsync(context, next);
        }

        public string ToAbsoluteUrl(string relativeUrl)
        {
            return string.Format("http{0}://{1}{2}",
                (Request.IsHttps) ? "s" : "",
                Request.Host,
                Url.Content(relativeUrl)
            );
        }
    }
}