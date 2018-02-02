using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace ourservers.io.Tools
{
    public abstract class ViewComponent<TModel> : ViewComponent where TModel : IViewModel
    {
        public virtual Task<IViewComponentResult> InvokeAsync(TModel model)
        {
            return Task.FromResult((IViewComponentResult)View(model.ComponentName, model));
        }
    }
}