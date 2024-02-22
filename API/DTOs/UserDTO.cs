using API.Entities;

namespace API.DTOs
{
    public class UserDto
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public string Email { get; set; }
        public string PasswordHash { get; set; }
        public DateTime CreatedAt { get; set; }

        public UserDto(User user)
        {
            Id = user.Id;
            UserId = user.UserId;
            Email = user.Email;
            CreatedAt = user.CreatedAt;
        }
    }
}

