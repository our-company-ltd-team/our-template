using System.Collections.Generic;

namespace ourservers.io.Tools
{
    public interface IViewModel
    {
        string ComponentName { get; }
        IEnumerable<string> Modifiers { get; }
    }
}