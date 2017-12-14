using System.Collections.Generic;

namespace <%=namespace %>.Tools
{
    public interface IViewModel
    {
        string ComponentName { get; }
        IEnumerable<string> Modifiers { get; }
    }
}