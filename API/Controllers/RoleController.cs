using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using API.DTOs;
using API.Errors;
using API.Extensions;
using AutoMapper;
using Core.Entities.Identity;
using Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using API.Helpers;
using Core.Specifications;
using System.Collections.Generic;
namespace API.Controllers
{
    public class RoleController : BaseAPIController
    {
        private readonly RoleManager<Role> _roleManager;
        private readonly ITokenService _tokenService;
        private readonly IMapper _mapper;
        public RoleController(RoleManager<Role> roleManager, ITokenService tokenService, IMapper mapper)
        {
            _mapper = mapper;
            _tokenService = tokenService;
            _roleManager = roleManager;
        }

        [HttpGet]
        public async Task<ActionResult<Pagination<RoleDTO>>> GetRoles(
            [FromQuery] ProductSpecParams productParams)
        {
            var countSpec = new RoleWithFiltersForCountSpec(productParams);
            var totalItems =  _roleManager.Roles.Count();
            var roles =   _roleManager.Roles.ToList();

            var data = _mapper.Map<IReadOnlyList<Role>, IReadOnlyList<RoleDTO>>(roles);
            return Ok(new Pagination<RoleDTO>(productParams.PageIndex, productParams.PageSize, totalItems, data));
        }

        [HttpGet("roleexists")]
        public async Task<ActionResult<bool>> CheckRoleNameExistsAsync([FromQuery] string role)
        {
            return await _roleManager.FindByNameAsync(role) != null;
        }

        [HttpPost]
        public async Task<ActionResult<RoleDTO>> createRole(RoleDTO roleDTO)
        {    
            if(CheckRoleNameExistsAsync(roleDTO.Name).Result.Value){
                 return new BadRequestObjectResult(new APIValidationError{Errors = new[] {"Role is exists!!!"}});
            }       
            var role = new Role
            {
                Name = roleDTO.Name
            };
            var result = await _roleManager.CreateAsync(role);            
            if (!result.Succeeded) return BadRequest(new APIResponse(400));
            return new RoleDTO
            {
                Id = roleDTO.Id,
                Name = roleDTO.Name
            };

        }

        [HttpPut]
        public async Task<ActionResult<RoleDTO>> UpdateRole(RoleDTO roleDTO)
        {
            var role= await _roleManager.FindByIdAsync(roleDTO.Id);
            if(CheckRoleNameExistsAsync(roleDTO.Name).Result.Value){
                 return new BadRequestObjectResult(new APIValidationError{Errors = new[] {"Role is exists!!!"}});
            }
            _mapper.Map<RoleDTO, Role>(roleDTO, role);
            var result = await _roleManager.UpdateAsync(role);

            if (result.Succeeded) return Ok(_mapper.Map<Role, RoleDTO>(role));

            return BadRequest(new APIResponse(400));
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRole(string id)
        {
            var role= await _roleManager.FindByIdAsync(id);

            if (role == null) return NotFound();

            await _roleManager.DeleteAsync(role);
            return NoContent();
        }
    }
}