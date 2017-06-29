
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.Extensions.Localization;
using ourCompany.cms.Data;
using ourCompany.cms.Data.Providers;

namespace template.Controllers
{
    public class HomeController : BaseController
    {
        public HomeController(IHtmlHelper htmlHelper, IDBProvider dbProvider) : base(htmlHelper, dbProvider)
        {
        }

        public IActionResult Index()
        {

            var home = DB.Fluent.FirstOrDefault<Models.Home>();

            if (home == null) return NotFound();

            var HomeObject = home.Get();

            ViewBag.BrowserTitle = !string.IsNullOrEmpty(HomeObject.BrowserTitle) ? HomeObject.BrowserTitle : ViewBag.BrowserTitle;
            ViewBag.GoogleDescription = !string.IsNullOrEmpty(HomeObject.GoogleDescription) ? HomeObject.GoogleDescription : ViewBag.GoogleDescription;
            //ViewBag.FacebookImages = ToAbsoluteUrl(HomeObject.Image.Src);

            return View(home);
        }
    }
}