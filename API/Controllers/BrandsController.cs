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
using Microsoft.AspNetCore.Authorization;

namespace API.Controllers
{
    public class BrandsController : BaseAPIController
    {
        private readonly IEcommerceRepository<Product> _productsRepo;
        private readonly IEcommerceRepository<ProductBrand> _productBrandRepo;
        private readonly IEcommerceRepository<ProductType> _productTypeRepo;
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;

        public BrandsController(IEcommerceRepository<Product> productsRepo, IEcommerceRepository<ProductBrand> productBrandRepo,
        IEcommerceRepository<ProductType> productTypeRepo, IMapper mapper, IUnitOfWork unitOfWork)
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork;
            _productTypeRepo = productTypeRepo;
            _productBrandRepo = productBrandRepo;
            _productsRepo = productsRepo;
        }

        [HttpGet]
        public async Task<ActionResult<Pagination<ProductBrandDTO>>> GetProductBrands(
            [FromQuery] ProductSpecParams productParams)
        {
            var countSpec = new ProductBrandWithFiltersForCountSpec(productParams);
            var totalItems = await _productBrandRepo.CounAsync(countSpec);
            var productBrands = await _productBrandRepo.ListAllAsync();

            var data = _mapper.Map<IReadOnlyList<ProductBrand>, IReadOnlyList<ProductBrandDTO>>(productBrands);
            return Ok(new Pagination<ProductBrandDTO>(productParams.PageIndex, productParams.PageSize, totalItems, data));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ProductBrandDTO>> GetProductBrand(int id)
        {
            var productBrand = await _productBrandRepo.GetByIdAsync(id);

            if (productBrand == null)
                return NotFound(new APIResponse(404));
            return _mapper.Map<ProductBrand, ProductBrandDTO>(productBrand);
        }


        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<ProductBrandDTO>> CreateProductBrand(ProductBrandDTO productBrandDTO)
        {
            var productBrand = _mapper.Map<ProductBrandDTO, ProductBrand>(productBrandDTO);
            _unitOfWork.Repository<ProductBrand>().AddProduct(productBrand);
            await _unitOfWork.Complete();
            return CreatedAtAction(nameof(GetProductBrand), new { Id = productBrand.Id }, productBrand);

        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProductBrand(ProductBrandDTO productBrandDTO)
        {
            var productBrand = await _unitOfWork.Repository<ProductBrand>().GetByIdAsync(productBrandDTO.Id);
            if (productBrand == null) return NotFound(new APIResponse(404));
            _mapper.Map<ProductBrandDTO, ProductBrand>(productBrandDTO, productBrand);
            _unitOfWork.Repository<ProductBrand>().Update(productBrand);
            await _unitOfWork.Complete();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            var productBrand = await _unitOfWork.Repository<ProductBrand>().GetByIdAsync(id);

            if (productBrand == null) return NotFound();

            _unitOfWork.Repository<ProductBrand>().Delete(productBrand);
            await _unitOfWork.Complete();

            return NoContent();
        }

        [HttpGet("searchBy/name={brandName}")]
        public async Task<ActionResult<Pagination<ProductBrandDTO>>> GetProductBrandByName(string brandName
        ,[FromQuery] ProductSpecParams productParams)
        {
            var spec = new ProductBrandWithNameSpecification(brandName);
            var productBrands = await _productBrandRepo.ListAsync(spec);
            var countSpec = new ProductBrandWithFiltersForCountSpec(brandName);
            var totalItems = await _productBrandRepo.CounAsync(countSpec);

            if (productBrands == null)
                return NotFound(new APIResponse(404));
            var data = _mapper.Map<IReadOnlyList<ProductBrand>, IReadOnlyList<ProductBrandDTO>>(productBrands);
            return Ok(new Pagination<ProductBrandDTO>(productParams.PageIndex, productParams.PageSize, totalItems, data));
        }
    }
}