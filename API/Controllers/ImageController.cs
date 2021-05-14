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
using Microsoft.AspNetCore.Hosting;
using System;
using System.IO;

namespace API.Controllers
{
     public class ImageController : BaseAPIController
     {
        private readonly IEcommerceRepository<Image> _ImgRepo;
        private readonly IEcommerceRepository<ProductBrand> _productBrandRepo;
        private readonly IEcommerceRepository<ProductType> _productTypeRepo;
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IWebHostEnvironment webHostEnvironment;
        public ImageController(IEcommerceRepository<Image> imgRepo, IEcommerceRepository<ProductBrand> productBrandRepo,
        IEcommerceRepository<ProductType> productTypeRepo, IMapper mapper, IUnitOfWork unitOfWork,  IWebHostEnvironment hostEnvironment)
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork;
            _productTypeRepo = productTypeRepo;
            _productBrandRepo = productBrandRepo;
            _ImgRepo = imgRepo;
            webHostEnvironment = hostEnvironment;
        }

        [Cached(500)]
        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<Image>>> GetProductTypes()
        {
            return Ok(await _ImgRepo.ListAllAsync());
        }
        
        [Cached(500)]
        [HttpGet("{id}")]
        public async Task<ActionResult<ImageDTO>> GetImage(int id)
        {
            var image = await _ImgRepo.GetByIdAsync(id);

            if (image == null)
                return NotFound(new APIResponse(404));
            return _mapper.Map<Image, ImageDTO>(image);
        }

        [Cached(500)]
        [HttpPost]
        public async Task<ActionResult<ImageDTO>> CreateImage(ImageDTO imageDTO)
        {
            
            if (ModelState.IsValid)
            {
                string uniqueFileName = UploadedFile(imageDTO);

                 Image image = new Image
                {
                    PictureUrl = uniqueFileName,
                };
                 _unitOfWork.Repository<Image>().AddProduct(image);
                await _unitOfWork.Complete();
                 
                // dbContext.Add(employee);
                // await dbContext.SaveChangesAsync();
                // return RedirectToAction(nameof(Index));
            return CreatedAtAction(nameof(GetImage), new { Id = image.Id }, image);

            }
           return null;

        }
         private string UploadedFile(ImageDTO imageDTO)
        {
            string uniqueFileName = null;

            if (imageDTO.PictureUrl != null)
            {
                string uploadsFolder = Path.Combine(webHostEnvironment.WebRootPath, "assets/images");
                uniqueFileName = Guid.NewGuid().ToString() + "_" + imageDTO.PictureUrl;
                string filePath = Path.Combine(uploadsFolder, uniqueFileName);
                using (var fileStream = new FileStream(filePath, FileMode.Create))
                {
                    // imageDTO.profileImage.CopyTo(fileStream);
                }
            }
            return uniqueFileName;
        }


     }
}