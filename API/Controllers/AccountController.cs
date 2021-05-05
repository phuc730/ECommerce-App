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
    public class AccountController : BaseAPIController
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly ITokenService _tokenService;
        private readonly IMapper _mapper;
        public AccountController(UserManager<AppUser> userManager,RoleManager<Role> roleManager, SignInManager<AppUser> signInManager, ITokenService tokenService, IMapper mapper)
        {
            _mapper = mapper;
            _tokenService = tokenService;
            _signInManager = signInManager;
            _userManager = userManager;
        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult<UserDto>> GetCurrentUser()
        {
            //var email = HttpContext.User?.Claims?.FirstOrDefault(x => x.Type == ClaimTypes.Email)?.Value;

            var user = await _userManager.FindByEmailFromClaimsPrinciple(HttpContext.User);

            return new UserDto
            {
                Email = user.Email,
                Token = _tokenService.CreateToken(user),
                DisplayName = user.DisplayName
            };
        }

        [HttpGet("emailexists")]
        public async Task<ActionResult<bool>> CheckEmailExistsAsync([FromQuery] string email)
        {
            return await _userManager.FindByEmailAsync(email) != null;
        }

        [Authorize]
        [HttpGet("address")]
        public async Task<ActionResult<AddressDTO>> GetUserAddress()
        {

            var user = await _userManager.FindUserByClaimsPrincipleWithAddressAsync(HttpContext.User);

            return _mapper.Map<Address, AddressDTO>(user.Address);
        }

        [Authorize]
        [HttpPut("address")]
        public async Task<ActionResult<AddressDTO>> UpdateUserAddress(AddressDTO address)
        {
            var user = await _userManager.FindUserByClaimsPrincipleWithAddressAsync(HttpContext.User);

            user.Address = _mapper.Map<AddressDTO, Address>(address);

            var result = await _userManager.UpdateAsync(user);

            if (result.Succeeded) return Ok(_mapper.Map<Address, AddressDTO>(user.Address));

            return BadRequest(new APIResponse(400));
        }
        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDTO loginDto)
        {
            var user = await _userManager.FindByEmailAsync(loginDto.Email);

            if (user == null)
            {
                return Unauthorized(new APIResponse(401));
            }

            var result = await _signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);

            if (!result.Succeeded)
            {
                //We don't want to give any hint whether password is correct
                return Unauthorized(new APIResponse(401));
            }

            return new UserDto
            {
                Email = user.Email,
                Token = _tokenService.CreateToken(user),
                DisplayName = user.DisplayName
            };
        }

        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDTO registerDto)
        {
            if (CheckEmailExistsAsync(registerDto.Email).Result.Value)
            {
                return new BadRequestObjectResult(new APIValidationError{Errors = new[] {"Email address is already in use"}});
            }
            var user = new AppUser
            {
                DisplayName = registerDto.DisplayName,
                Email = registerDto.Email,
                UserName = registerDto.Email
            };
            var result = await _userManager.CreateAsync(user, registerDto.Password);
            if(result.Succeeded){
                await _userManager.AddToRoleAsync(user,role:"Khach");
            }
            if (!result.Succeeded) return BadRequest(new APIResponse(400));
            return new UserDto
            {
                DisplayName = registerDto.DisplayName,
                Token = _tokenService.CreateToken(user),
                Email = registerDto.Email
            };

        }

        [Cached(500)]
        [HttpGet("user")]
        public async Task<ActionResult<Pagination<UserDto>>> GetUsers(
            [FromQuery] ProductSpecParams productParams)
        {
            // var user = _userManager.Users.Count();
            // var users = _userManager.Users.ToList();
            // return users;
            var countSpec = new UserWithFiltersForCountSpec(productParams);
            var totalItems =  _userManager.Users.Count();
            var users =   _userManager.Users.ToList();

            var data = _mapper.Map<IReadOnlyList<AppUser>, IReadOnlyList<UserDto>>(users);
            return Ok(new Pagination<UserDto>(productParams.PageIndex, productParams.PageSize, totalItems, data));
        }

        [HttpPost("createUser")]
        public async Task<ActionResult<UserDto>> CreateUser(UserDto userDto)
        {
            if (CheckEmailExistsAsync(userDto.Email).Result.Value)
            {
                return new BadRequestObjectResult(new APIValidationError{Errors = new[] {"Email address is already in use"}});
            }
            var user = new AppUser
            {
                DisplayName = userDto.DisplayName,
                Email = userDto.Email,
                UserName = userDto.Email
            };
            var result = await _userManager.CreateAsync(user, userDto.Password);
            if(result.Succeeded){
                await _userManager.AddToRolesAsync(user,userDto.role);
            }
            if (!result.Succeeded) return BadRequest(new APIResponse(400));
            return new UserDto
            {
                DisplayName = userDto.DisplayName,
                Token = _tokenService.CreateToken(user),
                Email = userDto.Email,
                role = userDto.role
            };

        }

        [HttpPut("updateUser")]
        public async Task<ActionResult<RoleDTO>> UpdateUser(UserDto userDto)
        {
            var user= await _userManager.FindByEmailAsync(userDto.Email);
            _mapper.Map<UserDto, AppUser>(userDto, user);
            var result = await _userManager.UpdateAsync(user);

            if (result.Succeeded) return Ok(_mapper.Map<AppUser, UserDto>(user));

            return BadRequest(new APIResponse(400));
        }

        [HttpDelete("{mail}")]
        public async Task<IActionResult> DeleteUser(string mail)
        {
            var user= await _userManager.FindByEmailAsync(mail);

            if (user == null) return NotFound();

            await _userManager.DeleteAsync(user);
            return NoContent();
        }
    }
}