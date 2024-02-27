using System.Reflection.Metadata.Ecma335;
using API.Data;
using API.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using API.Services;

namespace API.Controllers {
    public class UserController: BaseApiController
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }
        
        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(SignupDto signupDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Check if the user already exists
            var userExists = await _userService.UserExists(signupDto.Email);
            if (userExists)
            {
                return Conflict("User with this email already exists.");
            }

            // Hash the password before saving it to the database
            string hashedPassword = PasswordHasher.HashPassword(signupDto.Password);

            // Create a new user entity
            var newUser = new User
            {
                UserId = signupDto.UserId,
                Email = signupDto.Email,
                PasswordHash = hashedPassword,
                CreatedAt = signupDto.CreatedAt
            };

            // Save the new user to the database
            CreateUserInDatabase(newUser);

            // Optionally, you can return some data or a success message
            return Ok("User signed up successfully.");
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Retrieve the user from the database based on the provided email
            var user = await _userService.GetUserByEmail(loginDto.Email);

            // Check if the user exists
            if (user == null)
            {
                return NotFound("User not found.");
            }

            // Verify the provided password against the hashed password stored in the database
            if (!PasswordHasher.VerifyPassword(user.PasswordHash, loginDto.Password))
            {
                return Unauthorized("Invalid email or password.");
            }
            var userDto = new UserDto(user);
            return Ok(userDto);
        }
        
        /*
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
