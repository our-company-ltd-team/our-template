using ourCompany.cms.Attributes;
using ourCompany.cms.Model;
using ourCompany.cms.Widgets;

namespace <%=namespace %>.Models
{
    
    public class Config
    {
        [Max]
        public static int Max => 1;
        public static MenuIcon? EditIcon => MenuIcon.Cog;

        
        [Text(Legend = "Default Browser Title", Localized = true)]
		public string BrowserTitle { get; set; }

        [Text(Legend = "Default Google Description", Multiline = true, Localized = true)]
		public string GoogleDescription { get; set; }
    }
}
