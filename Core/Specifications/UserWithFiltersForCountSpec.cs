using Core.Entities;
using Core.Entities.Identity;
namespace Core.Specifications
{
    public class UserWithFiltersForCountSpec : BaseSpecification<AppUser>
    {
        public UserWithFiltersForCountSpec(ProductSpecParams productParams)
       : base(x => 
                (string.IsNullOrEmpty(productParams.Search) || x.DisplayName.ToLower().Contains
                (productParams.Search)) 
                // && 
                // (!productParams.BrandId.HasValue || x.ProductBrandId == productParams.BrandId) &&
                // (!productParams.TypeId.HasValue || x.ProductTypeId == productParams.TypeId)
            )
            {
                
            }
        public UserWithFiltersForCountSpec(string DisplayName) : base(x => (x.DisplayName == DisplayName))
        {
            // AddInclude(x => x.ProductType);
            // AddInclude(x => x.ProductBrand);
        }
            
    }
}