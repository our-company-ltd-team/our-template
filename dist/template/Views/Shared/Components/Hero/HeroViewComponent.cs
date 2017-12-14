using Microsoft.AspNetCore.Mvc;
using <%=namespace %>.Tools;

namespace <%=namespace %>.Views.Blocks.Hero
{
    [ViewComponent(Name = "Hero")]
    public class HeroViewComponent : ViewComponent<HeroViewModel>
    {
    }
}