using ourCompany.cms.Attributes;

namespace OURNAMESPACE.Models
{
    [ParentOf(typeof(Config), typeof(Home))]
    [Root]
    public class Root
    {
    }
}