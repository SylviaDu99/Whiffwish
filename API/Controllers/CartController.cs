using System.Reflection.Metadata.Ecma335;
using API.Data;
using API.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers {
    public class CartController: BaseApiController {
        private readonly StoreContext _context;
        public CartController (StoreContext context) { 
            _context = context;
        }
        
        [HttpGet(Name = "GetCart")]
        public async Task<ActionResult<CartDto>> GetCart()
        {

            Cart cart = await RetrieveCart();

            if (cart == null) return NotFound();

            return MapCartToDto(cart);
        }

        [HttpPost]
        public async Task<ActionResult<CartDto>> AddItemToCart(int productId, int quantity) {
            
            var cart = await RetrieveCart();
            if (cart == null) cart = CreateCart();
            
            var product = await _context.Products.FindAsync(productId);
            if (product == null) return BadRequest(new ProblemDetails{Title = "Product not found"});
            
            cart.AddItem(product, quantity);
            
            var result = await _context.SaveChangesAsync() > 0;

            if (result) return CreatedAtRoute("GetCart", MapCartToDto(cart));
            
            return BadRequest(new ProblemDetails{Title = "Problem adding item to cart"});
        }

        [HttpDelete]
        public async Task<ActionResult> RemoveItemFromCart(int productId, int quantity) {
            var cart = await RetrieveCart();
            if (cart == null) return NotFound();
            cart.RemoveItem(productId, quantity);
            var result = await _context.SaveChangesAsync() > 0;
            if (result)return Ok();
            return BadRequest(new ProblemDetails{Title = "Problem removing item from basket"});
        }
        
        private CartDto MapCartToDto(Cart cart)
        {
            return new CartDto
            {
                Id = cart.Id,
                UserId = cart.UserId,
                Items = cart.Items.Select(item => new CartItemDto
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

        private async Task<Cart> RetrieveCart() {
            return await _context.Carts
                .Include(i => i.Items)
                .ThenInclude(p => p.Product)
                .FirstOrDefaultAsync(x => x.UserId == Request.Cookies["userId"]);
        }

        private Cart CreateCart()
        {
            var userId = Guid.NewGuid().ToString();
            var cookieOptions = new CookieOptions{IsEssential = true, Expires=DateTime.Now.AddDays(30)};
            Response.Cookies.Append("userId", userId, cookieOptions);
            var cart = new Cart{UserId = userId};
            _context.Carts.Add(cart);
            return cart;
        }
    }
}