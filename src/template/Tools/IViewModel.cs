using System.Collections.Generic;

namespace OURNAMESPACE.Tools
{
    public interface IViewModel
    {
        string ComponentName { get; }
        IEnumerable<string> Modifiers { get; }
    }
}