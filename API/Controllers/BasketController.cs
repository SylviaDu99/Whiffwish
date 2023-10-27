using System.Reflection.Metadata.Ecma335;
using API.Data;
using API.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers {
    public class BasketController: BaseApiController {
        private readonly StoreContext _context;
        public BasketController (StoreContext context) { 
            _context = context;
        }
        
        [HttpGet]
        public async Task<ActionResult<BasketDto>> GetBasket() {

            Basket basket = await RetrieveBasket();

            if (basket == null) return NotFound();
            
            return new BasketDto {
                Id = basket.Id,
                UserId = basket.UserId,
                Items = basket.Items.Select(item => new BasketItemDto{
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

        private async Task<Basket> RetrieveBasket() {
            return await _context.Baskets
                .Include(i => i.Items)
                .ThenInclude(p => p.Product)
                .FirstOrDefaultAsync(x => x.UserId == Request.Cookies["userId"]);
        }

        [HttpPost]
        public async Task<ActionResult> AddItemToBasket(int productId, int quantity) {
            // get the basket || create basket
            var basket = await RetrieveBasket();
            if (basket == null) basket = CreateBasket();
            // get product
            var product = await _context.Products.FindAsync(productId);
            if (product == null) return NotFound();
            // add product to basket
            basket.AddItem(product, quantity);
            // save changes
            var result = await _context.SaveChangesAsync() > 0;

            if (result) return StatusCode(201);
            
            return BadRequest(new ProblemDetails{Title = "Problem adding item to basket"});
        }

        private Basket CreateBasket()
        {
            var userId = Guid.NewGuid().ToString();
            var cookieOptions = new CookieOptions{IsEssential = true, Expires=DateTime.Now.AddDays(30)};
            Response.Cookies.Append("userId", userId, cookieOptions);
            var basket = new Basket{UserId = userId};
            _context.Baskets.Add(basket);
            return basket;
        }

        [HttpDelete]
        public async Task<ActionResult> RemoveItemFromBasket(int productId, int quantity) {
            var basket = await RetrieveBasket();
            if (basket == null) return NotFound();
            basket.RemoveItem(productId, quantity);
            var result = await _context.SaveChangesAsync() > 0;
            if (result )return Ok();
            return BadRequest(new ProblemDetails{Title = "Problem removing item from basket"});
        }
    }
}