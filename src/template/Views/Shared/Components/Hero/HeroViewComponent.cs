using Microsoft.AspNetCore.Mvc;
using OURNAMESPACE.Tools;

namespace OURNAMESPACE.Views.Blocks.Hero
{
    [ViewComponent(Name = "Hero")]
    public class HeroViewComponent : ViewComponent<HeroViewModel>
    {
    }
}