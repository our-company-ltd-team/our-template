using Microsoft.AspNetCore.Mvc;
using ourservers.io.Tools;

namespace ourservers.io.Views.Shared.Components.Header
{
    [ViewComponent(Name = "Header")]
    public class HeaderViewComponent : ViewComponent<HeaderViewModel>
    {
    }
}