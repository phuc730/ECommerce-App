using Core.Entities;
using Microsoft.AspNetCore.Mvc;
using Core.Interfaces;
using Core.Specifications;
using API.DTOs;
using AutoMapper;
using API.Errors;
using Microsoft.AspNetCore.Http;
using API.Helpers;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace API.Controllers
{
     public class TypesController : BaseAPIController
     {
        private readonly IEcommerceRepository<Product> _productsRepo;
        private readonly IEcommerceRepository<ProductBrand> _productBrandRepo;
        private readonly IEcommerceRepository<ProductType> _productTypeRepo;
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;

        public TypesController(IEcommerceRepository<Product> productsRepo, IEcommerceRepository<ProductBrand> productBrandRepo,
        IEcommerceRepository<ProductType> productTypeRepo, IMapper mapper, IUnitOfWork unitOfWork)
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork;
            _productTypeRepo = productTypeRepo;
            _productBrandRepo = productBrandRepo;
            _productsRepo = productsRepo;
        }

        [Cached(500)]
        [HttpGet]
        public async Task<ActionResult<Pagination<ProductTypeDTO>>> GetProductTypes(
            [FromQuery] ProductSpecParams productParams)
        {
            var countSpec = new ProductTypedWithFiltersForCountSpec(productParams);
            var totalItems = await _productTypeRepo.CounAsync(countSpec);
            var productBrands = await _productTypeRepo.ListAllAsync();

            var data = _mapper.Map<IReadOnlyList<ProductType>, IReadOnlyList<ProductTypeDTO>>(productBrands);
            return Ok(new Pagination<ProductTypeDTO>(productParams.PageIndex, productParams.PageSize, totalItems, data));
        }

        [Cached(500)]
        [HttpGet("{id}")]
        public async Task<ActionResult<ProductTypeDTO>> GetProductType(int id)
        {
            var productType = await _productTypeRepo.GetByIdAsync(id);

            if (productType == null)
                return NotFound(new APIResponse(404));
            return _mapper.Map<ProductType, ProductTypeDTO>(productType);
        }

        [Cached(500)]
        [HttpPost]
        public async Task<ActionResult<ProductTypeDTO>> CreateProductType(ProductTypeDTO productTypeDTO)
        {
            var productType = _mapper.Map<ProductTypeDTO, ProductType>(productTypeDTO);
            _unitOfWork.Repository<ProductType>().AddProduct(productType);
            await _unitOfWork.Complete();
            return CreatedAtAction(nameof(GetProductType), new { Id = productType.Id }, productType);

        }

        [Cached(500)]
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProductType(ProductTypeDTO productTypeDTO)
        {
            var productType = await _unitOfWork.Repository<ProductType>().GetByIdAsync(productTypeDTO.Id);

            if (productType == null) return NotFound(new APIResponse(404));

            _mapper.Map<ProductTypeDTO, ProductType>(productTypeDTO, productType);
            _unitOfWork.Repository<ProductType>().Update(productType);
            await _unitOfWork.Complete();
            return NoContent();
        }

         [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProductType(int id)
        {
            var productType = await _unitOfWork.Repository<ProductType>().GetByIdAsync(id);

            if (productType == null) return NotFound();

            _unitOfWork.Repository<ProductType>().Delete(productType);
            await _unitOfWork.Complete();

            return NoContent();
        }

        [Cached(500)]
        [HttpGet("searchBy/name={typeName}")]
        public async Task<ActionResult<Pagination<ProductTypeDTO>>> GetProductTypeByName(string typeName
        ,[FromQuery] ProductSpecParams productParams)
        {
            var spec = new ProductTypedWithNameSpecification(typeName);
            var productTypes = await _productTypeRepo.ListAsync(spec);
            var countSpec = new ProductTypedWithFiltersForCountSpec(typeName);
            var totalItems = await _productTypeRepo.CounAsync(countSpec);

            if (productTypes == null)
                return NotFound(new APIResponse(404));
            var data = _mapper.Map<IReadOnlyList<ProductType>, IReadOnlyList<ProductTypeDTO>>(productTypes);
            return Ok(new Pagination<ProductTypeDTO>(productParams.PageIndex, productParams.PageSize, totalItems, data));
        }
     }
}