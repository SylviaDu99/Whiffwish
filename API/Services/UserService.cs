using API.Data;
using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Services
{
    public class UserService : IUserService
    {
        private readonly StoreContext _storeContext;

        public UserService(StoreContext storeContext)
        {
            _storeContext = storeContext;
        }

        public async Task<bool> UserExists(string email)
        {
            return await _storeContext.Users.AnyAsync(u => u.Email == email);
        }
        
        // return null when user not found
        public async Task<User> GetUserByEmail(string email)
        {
            return await _storeContext.Users.FirstOrDefaultAsync(u => u.Email == email);
        }
    }
}

