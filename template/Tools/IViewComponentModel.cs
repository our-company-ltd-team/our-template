using System.Collections.Generic;

namespace OURNAMESPACE.Tools
{
    public interface IViewComponentModel
    {
        string ComponentName { get; }
        IEnumerable<string> Modifiers { get; }
    }
}