using System.Collections.Generic;
using System.Threading.Tasks;
using Core.Entities;
using Microsoft.AspNetCore.Mvc;
using Core.Interfaces;
using Core.Specifications;
using API.DTOs;
using AutoMapper;
using API.Errors;
using Microsoft.AspNetCore.Http;
using API.Helpers;

namespace API.Controllers
{
    public class ProductsController : BaseAPIController
    {

        private readonly IEcommerceRepository<Product> _productsRepo;
        private readonly IEcommerceRepository<ProductBrand> _productBrandRepo;
        private readonly IEcommerceRepository<ProductType> _productTypeRepo;
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;

        public ProductsController(IEcommerceRepository<Product> productsRepo, IEcommerceRepository<ProductBrand> productBrandRepo,
        IEcommerceRepository<ProductType> productTypeRepo, IMapper mapper, IUnitOfWork unitOfWork)
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork;
            _productTypeRepo = productTypeRepo;
            _productBrandRepo = productBrandRepo;
            _productsRepo = productsRepo;
        }
        [HttpGet]
        public async Task<ActionResult<Pagination<ProductToReturnDTO>>> GetProducts(
            [FromQuery] ProductSpecParams productParams)
        {
            var spec = new ProductWithTypesAndBrandsSpecification(productParams);
            var countSpec = new ProductWithFiltersForCountSpec(productParams);
            var totalItems = await _productsRepo.CounAsync(countSpec);
            var products = await _productsRepo.ListAsync(spec);

            var data = _mapper.Map<IReadOnlyList<Product>, IReadOnlyList<ProductToReturnDTO>>(products);
            return Ok(new Pagination<ProductToReturnDTO>(productParams.PageIndex, productParams.PageSize, totalItems, data));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ProductToReturnDTO>> GetProduct(int id)
        {
            var spec = new ProductWithTypesAndBrandsSpecification(id);
            var product = await _productsRepo.GetEntityWithSpec(spec);

            if (product == null)
                return NotFound(new APIResponse(404));
            return _mapper.Map<Product, ProductToReturnDTO>(product);
        }

        [HttpPost]
        public async Task<ActionResult<ProductToReturnDTO>> CreateProduct(ProductToReturnDTO productToReturnDTO)
        {
            var product = _mapper.Map<ProductToReturnDTO, Product>(productToReturnDTO);
            _unitOfWork.Repository<Product>().AddProduct(product);
            await _unitOfWork.Complete();
            // return CreatedAtAction(nameof(GetProduct), new { Id = product.Id }, product);
            return Ok(product);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProduct(ProductToReturnDTO productDto)
        {
            var product = await _unitOfWork.Repository<Product>().GetByIdAsync(productDto.Id);

            if (product == null) return NotFound(new APIResponse(404));

            _mapper.Map<ProductToReturnDTO, Product>(productDto, product);
            _unitOfWork.Repository<Product>().Update(product);
            await _unitOfWork.Complete();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            var product = await _unitOfWork.Repository<Product>().GetByIdAsync(id);

            if (product == null) return NotFound();

            _unitOfWork.Repository<Product>().Delete(product);
            await _unitOfWork.Complete();

            return NoContent();
        }

        [HttpGet("brands")]
        public async Task<ActionResult<IReadOnlyList<ProductBrand>>> GetProductBrands(
            [FromQuery] ProductSpecParams productParams)
        {
            return Ok(await _productBrandRepo.ListAllAsync());
        }

        [HttpGet("types")]
        public async Task<ActionResult<IReadOnlyList<ProductType>>> GetProductTypes()
        {
            return Ok(await _productTypeRepo.ListAllAsync());
        }

        [HttpGet("searchBy/type={type}&&brand={brand}")]
        public async Task<ActionResult<Pagination<ProductToReturnDTO>>> GetProductByTypeOrBrand(string type, string brand,string pictureURL
        ,[FromQuery] ProductSpecParams productParams)
        {
            var spec = new ProductWithTypesAndBrandsSpecification(type,brand,pictureURL);
            var products = await _productsRepo.ListAsync(spec);
            var countSpec = new ProductWithFiltersForCountSpec(type,brand,pictureURL);
            var totalItems = await _productsRepo.CounAsync(countSpec);

            if (products == null)
                return NotFound(new APIResponse(404));
            var data = _mapper.Map<IReadOnlyList<Product>, IReadOnlyList<ProductToReturnDTO>>(products);
            return Ok(new Pagination<ProductToReturnDTO>(productParams.PageIndex, productParams.PageSize, totalItems, data));
        }

    }
}