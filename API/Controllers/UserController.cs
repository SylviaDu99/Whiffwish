using System.Reflection.Metadata.Ecma335;
using API.Data;
using API.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers {
    public class UserController: BaseApiController {
        /*
        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(UserDto userDto)
        {
            var result = await _authService.RegisterAsync(userDto);

            if (!result.Success)
            {
                return BadRequest(result.Message);
            }

            return Ok(result.Data);
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(UserDto userDto)
        {
            var result = await _authService.LoginAsync(userLoginDto);

            if (!result.Success)
            {
                return BadRequest(result.Message);
            }

            return Ok(result.Data);
        }

        [HttpGet("profile")]
        public async Task<ActionResult<UserDto>> GetUserProfile()
        {
            var userId = User.GetUserId();
            var user = await _authService.GetUserProfileAsync(userId);

            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }

        [HttpPut("profile")]
        public async Task<ActionResult<UserDto>> UpdateUserProfile(UserUpdateDto userUpdateDto)
        {
            var userId = User.GetUserId();
            var result = await _authService.UpdateUserProfileAsync(userId, userUpdateDto);

            if (!result.Success)
            {
                return BadRequest(result.Message);
            }

            return Ok(result.Data);
        }
        */
        
        [HttpGet("{id}")]
        public ActionResult<UserDto> GetUser(int id)
        {
            User user = GetUserById(id);

            if (user == null)
            {
                return NotFound(); // User not found
            }

            // Map the user entity to a user DTO
            UserDto userDto = new UserDto(user);

            return Ok(userDto);
        }

        [HttpPost]
        public ActionResult<UserDto> CreateUser(UserDto userDto)
        {
            // Create a new user entity from the user DTO
            User user = new User
            {
                UserId = userDto.UserId,
                Email = userDto.Email,
                PasswordHash = userDto.PasswordHash,
                CreatedAt = userDto.CreatedAt
            };

            CreateUserInDatabase(user);

            // Return the created user DTO
            return CreatedAtAction(nameof(GetUser), new { id = user.Id }, userDto);
        }
        
        private User GetUserById(int id)
        {
            return new User
            {
                //TODO
            };
        }

        private void CreateUserInDatabase(User user)
        {
            //TODO
        }
    }
}
