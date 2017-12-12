using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using MongoDB.Driver;
using ourCompany.cms.Data;
using ourCompany.cms.Data.Providers;
using OURNAMESPACE.Tools;
using OURNAMESPACE.Views.Blocks.Hero;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace OURNAMESPACE.Controllers
{
    public class HomeController : BaseController
    {
        public HomeController(IHtmlHelper htmlHelper, IDBProvider dbProvider) : base(htmlHelper, dbProvider)
        {
        }

        public async Task<IActionResult> Index()
        {
            var home = await DB.Find<Models.Home>().FirstOrDefaultAsync();

            if (home == null) return NotFound();

            var model = new HomeViewModel { Components = new List<IViewComponentModel> { new HeroViewComponentModel { Title = home.Title } } };

            ViewBag.BrowserTitle = !string.IsNullOrEmpty(home.BrowserTitle) ? home.BrowserTitle : ViewBag.BrowserTitle;
            ViewBag.GoogleDescription = !string.IsNullOrEmpty(home.GoogleDescription) ? home.GoogleDescription : ViewBag.GoogleDescription;
            //ViewBag.FacebookImages = ToAbsoluteUrl(HomeObject.Image.Src);

            // somewhere prepare the HeroViewComponentModel
            //ViewBag.HeroViewComponentModel = HeroViewComponentModel
            return View(model);
        }

        public class HomeViewModel
        {
            public IEnumerable<IViewComponentModel> Components { get; set; }
        }
    }
}