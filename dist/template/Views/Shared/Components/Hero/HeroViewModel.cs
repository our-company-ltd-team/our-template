using <%=namespace %>.Tools;

namespace <%=namespace %>.Views.Blocks.Hero
{
    public class HeroViewModel : ViewModel
    {
        public string Title { get; set; }
        public Slider.SliderViewModel Slider { get; set; }

        public static HeroViewModel FromHome(Models.Home home)
        {
            return new HeroViewModel { Title = home.Title, Slider = new Blocks.Slider.SliderViewModel { Title = home.Title } };
        }
    }
}