using Core.Entities;
using Microsoft.AspNetCore.Http;  
using System.ComponentModel.DataAnnotations;
namespace API.DTOs
{
    public class ImageDTO
    {
        public string PictureUrl { get; set; }
        public string FileName { get; set; }
        public int ProductId { get; set; }
        public IFormFile profileImage {get; set;}
    }
}