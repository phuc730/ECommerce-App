using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class RoleDTO
    {
        public string Id {get; set;}
        [Required]
        public string Name { get; set; }
    }
}