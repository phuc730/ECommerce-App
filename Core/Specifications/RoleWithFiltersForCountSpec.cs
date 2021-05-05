using Core.Entities;
using Core.Entities.Identity;
namespace Core.Specifications
{
    public class RoleWithFiltersForCountSpec : BaseSpecification<Role>
    {
        public RoleWithFiltersForCountSpec(ProductSpecParams productParams)
       : base(x => 
                (string.IsNullOrEmpty(productParams.Search) || x.Name.ToLower().Contains
                (productParams.Search)) 
                // && 
                // (!productParams.BrandId.HasValue || x.ProductBrandId == productParams.BrandId) &&
                // (!productParams.TypeId.HasValue || x.ProductTypeId == productParams.TypeId)
            )
            {
                
            }
        public RoleWithFiltersForCountSpec(string name) : base(x => (x.Name == name))
        {
            // AddInclude(x => x.ProductType);
            // AddInclude(x => x.ProductBrand);
        }
            
    }
}