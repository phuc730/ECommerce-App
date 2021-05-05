using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;

namespace Core.Entities.Identity
{
    public class AppUser : IdentityUser
    {
        public string DisplayName { get; set; }
        public Address Address { get; set; }
        
    }
}