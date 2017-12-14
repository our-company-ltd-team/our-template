using System.Collections.Generic;
using System.Linq;

namespace OURNAMESPACE.Tools
{
    public abstract class ViewModel : IViewModel
    {
        public string BlockName { get; set; }
        public IEnumerable<string> Modifiers { get; set; }

        public virtual string ComponentName => GetType().Name.Replace("ViewComponentModel", "").Replace("ViewModel", "");

        public ViewModel WithModifiers(params string[] modifiers)
        {
            var final = Modifiers == null ? modifiers : Modifiers.Concat(modifiers);
            Modifiers = final;
            return this;
        }
    }
}