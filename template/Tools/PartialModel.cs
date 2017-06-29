using ourCompany.cms.Data;
using System.Collections;
using System.Collections.Generic;

namespace <%=namespace %>.Tools
{
    public class PartialModel<T> : IEnumerable<string> where T : class
    {
        public PartialModel(object element)
        {
            Element = element as T;
        }

        public PartialModel<T> Add(string modifier)
        {
            Modifiers.Add(modifier.ToLowerInvariant());
            return this;
        }

        public readonly T Element;

        private readonly IList<string> Modifiers = new List<string>();

        public bool HasModifier(string key) => Modifiers.Contains(key.ToLowerInvariant());

        IEnumerator IEnumerable.GetEnumerator() => Modifiers.GetEnumerator();

        IEnumerator<string> IEnumerable<string>.GetEnumerator() => Modifiers.GetEnumerator();

        public PartialModel<T> AddRange(IEnumerable<string> modifiers)
        {
            foreach (var m in modifiers) Add(m);
            return this;
        }
    }

    public class PartialFluentModel<T> : PartialModel<T> where T : class
    {
        public PartialFluentModel(DBFluent fluent, object element) : base(element)
        {
            Fluent = fluent;
        }

        public readonly DBFluent Fluent;
    }
}