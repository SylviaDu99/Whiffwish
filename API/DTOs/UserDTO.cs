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
        public CartDto Cart { get; set; }

        public UserDto(User user)
        {
            Id = user.Id;
            UserId = user.UserId;
            Email = user.Email;
            CreatedAt = user.CreatedAt;
            Cart = new CartDto()
            {
                Id = user.Cart.Id,
                UserId = user.Cart.UserId,
                Items = user.Cart.Items.Select(item => new CartItemDto
                {
                    ProductId = item.ProductId,
                    Name = item.Product.Name,
                    PictureUrl = item.Product.PictureUrl,
                    Price = item.Product.Price,
                    Quantity = item.Quantity,
                    Brand = item.Product.Brand,
                    Type = item.Product.Type
                }).ToList()
            };
        }
    }
}

