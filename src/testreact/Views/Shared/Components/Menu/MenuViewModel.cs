using ourservers.io.Tools;
using System;
using System.Collections.Generic;

namespace ourservers.io.Views.Shared.Components.Menu
{
    public class MenuViewModel : ViewModel
    {
		public class MenuItem
		{
			public string Title { get; set; }
			//public string Url { get; set; }
			public bool Active { get; set; }
		}

		public class SubMenuItem
		{
			public IEnumerable<Tuple<string, int>> Title { get; set; }
			public bool Active { get; set; }

		}
		public IEnumerable<MenuItem> MenuItems { get; set; }
		public IEnumerable<SubMenuItem> SubMenuItems { get; set; }
	}
}