using Core.Entities;

namespace Core.Specifications
{
    public class ProductTypedWithFiltersForCountSpec : BaseSpecification<ProductType>
    {
        public ProductTypedWithFiltersForCountSpec(ProductSpecParams productParams)
       : base(x => 
                (string.IsNullOrEmpty(productParams.Search) || x.Name.ToLower().Contains
                (productParams.Search)) 
                // && 
                // (!productParams.BrandId.HasValue || x.ProductBrandId == productParams.BrandId) &&
                // (!productParams.TypeId.HasValue || x.ProductTypeId == productParams.TypeId)
            )
            {
                
            }
        public ProductTypedWithFiltersForCountSpec(string brandName) : base(x => (x.Name == brandName))
        {
            // AddInclude(x => x.ProductType);
            // AddInclude(x => x.ProductBrand);
        }
            
    }
}