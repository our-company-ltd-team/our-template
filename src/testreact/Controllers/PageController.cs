using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using ourservers.io.Views.Shared.Components.Header;
using ourservers.io.Views.Shared.Components.Menu;
using System.Collections.Generic;

namespace ourservers.io.Controllers
{
	public class PageController : BaseController
    {
        public PageController(IHtmlHelper htmlHelper) : base(htmlHelper)
        {
        }

		public IActionResult Index()
		{
			var page = new PageControllerViewModel
			{
				Header = new HeaderViewModel (),
				Menu = new MenuViewModel {
					MenuItems = new List<MenuViewModel.MenuItem> {
						
					}
				}
			};
			return View(page);
		}

		public class PageControllerViewModel
		{
			public HeaderViewModel Header { get; set; }
			public MenuViewModel Menu { get; set; }

		}
    }
}