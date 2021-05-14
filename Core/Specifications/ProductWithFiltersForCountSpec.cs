using Core.Entities;

namespace Core.Specifications
{
    public class ProductWithFiltersForCountSpec : BaseSpecification<Product>
    {
        public ProductWithFiltersForCountSpec(ProductSpecParams productParams)
       : base(x => 
                (string.IsNullOrEmpty(productParams.Search) || x.Name.ToLower().Contains
                (productParams.Search)) && 
                (!productParams.BrandId.HasValue || x.ProductBrandId == productParams.BrandId) &&
                (!productParams.TypeId.HasValue || x.ProductTypeId == productParams.TypeId) 
            )
            {
                
            }
        public ProductWithFiltersForCountSpec(string typeName, string brandName,string picurl) 
        : base(x => (x.ProductType.Name == typeName) || 
                    (x.ProductBrand.Name == brandName ) || 
                     (x.Image.PictureUrl == picurl )
                    )
        {
            AddInclude(x => x.ProductType);
            AddInclude(x => x.ProductBrand);
             AddInclude(x => x.Image);
        }
            
    }
}