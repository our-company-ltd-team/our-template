using ourCompany.cms.Attributes;

namespace template.Models
{
    [ParentOf(typeof(Config), typeof(Home))]
    [Root]
    public class Root
    {
    }
}