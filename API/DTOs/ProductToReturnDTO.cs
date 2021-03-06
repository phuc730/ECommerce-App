using Core.Entities;

namespace API.DTOs
{
    public class ProductToReturnDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public string PictureUrl { get; set; }
        public string Status {get; set;}
        public int Quantity {get; set;}
        public string ProductType { get; set; }
        public string ProductBrand { get; set; }
        public int ProductTypeId { get; set; }
        public int ProductBrandId { get; set; }
        public string Image { get; set; }
        public int ImageId {get; set;}
    }
}