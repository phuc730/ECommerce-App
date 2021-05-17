using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;

namespace API.DTOs
{
    public class UserDto
    {
        public string Email { get; set; }
        public string DisplayName { get; set; }
        public string Token { get; set; }   
        [Required]
        [RegularExpression("(?=^.{6,10}$)(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\\s).*$"
        , ErrorMessage="Password must have 1 uppercase, 1 lowercase, 1 number, 1 non alphanumeric and at least 6 characters long.")]
        public string Password { get; set; }
        public string role {get; set;}
        //public RoleDTO role {get; set;}
    }
}