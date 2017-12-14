using ourCompany.cms.Attributes;
using ourCompany.cms.Model;
using ourCompany.cms.Widgets;

namespace <%=namespace %>.Models
{
    public class Home : CmsEntry
    {
        [Max]
        public static int Max => 1;

        public static MenuIcon? EditIcon => MenuIcon.Home;

        public string EditLegend => "Home";

        [Text(Legend = "Title", Multiline = true, Localized = true)]
        public string Title { get; set; }

        [Text(Legend = "Titre du navigateur", Localized = true)]
        public string BrowserTitle { get; set; }

        [Text(Legend = "Decription Google", Multiline = true, Localized = true)]
        public string GoogleDescription { get; set; }
    }
}