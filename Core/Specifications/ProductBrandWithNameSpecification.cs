using System;
using System.Linq.Expressions;
using Core.Entities;

namespace Core.Specifications
{
     public class ProductBrandWithNameSpecification : BaseSpecification<ProductBrand>
     {
          public ProductBrandWithNameSpecification(ProductSpecParams productParams)
            : base(x => 
                (string.IsNullOrEmpty(productParams.Search) || x.Name.ToLower().Contains
                (productParams.Search)) 
                // && 
                // (!productParams.BrandId.HasValue || x.ProductBrandId == productParams.BrandId) &&
                // (!productParams.TypeId.HasValue || x.ProductTypeId == productParams.TypeId)
            )
        {
            // AddInclude(x => x.ProductType);
            // AddInclude(x => x.ProductBrand);
            AddOrderBy(x => x.Name);
            ApplyPaging(productParams.PageSize * (productParams.PageIndex -1), productParams.PageSize);

            if(!string.IsNullOrEmpty(productParams.Sort))
            {
                switch(productParams.Sort)
                {
                    case "priceAsc":
                        AddOrderBy(p => p.Name);
                        break;
                    case "priceDesc":
                        AddOrderByDesc(p => p.Name);
                        break;
                    default:
                        AddOrderBy(n =>n.Name);
                        break;
                }
            }
        }
        public ProductBrandWithNameSpecification(string brandName) : base(x => (x.Name == brandName))
        {
            // AddInclude(x => x.ProductType);
            // AddInclude(x => x.ProductBrand);
        }
     }
}