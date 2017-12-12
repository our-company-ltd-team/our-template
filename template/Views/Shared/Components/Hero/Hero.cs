using Microsoft.AspNetCore.Mvc;
using OURNAMESPACE.Tools;
using System.Threading.Tasks;

namespace OURNAMESPACE.Views.Blocks.Hero
{
    public class HeroViewComponentModel : BaseViewComponentModel
    {
        public string Title { get; set; }

        public override string ComponentName => "Hero";
    }

    [ViewComponent(Name = "Hero")]
    public class HeroViewComponent : ViewComponent
    {
        public Task<IViewComponentResult> InvokeAsync(HeroViewComponentModel model)
        {
            return Task.FromResult((IViewComponentResult)View(model));
        }
    }
}