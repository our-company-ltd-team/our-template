using System.Collections.Generic;

namespace OURNAMESPACE.Tools
{
    public abstract class BaseViewComponentModel : IViewComponentModel
    {
        public IEnumerable<string> Modifiers { get; set; }
        public abstract string ComponentName { get; }
    }
}