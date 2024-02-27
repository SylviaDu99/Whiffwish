using API.Entities;

namespace API.Services
{
    public interface IUserService
    {
        Task<bool> UserExists(string email);
        Task<User> GetUserByEmail(string email);
    }
}

