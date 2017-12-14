using Microsoft.AspNetCore.Mvc;
using OURNAMESPACE.Tools;

namespace OURNAMESPACE.Views.Blocks.Slider
{
    [ViewComponent(Name = "Slider")]
    public class SliderViewComponent : ViewComponent<SliderViewModel>
    {
    }
}