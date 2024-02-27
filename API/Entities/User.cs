namespace API.Entities
{
    public class User
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public string Email { get; set; }
        public string PasswordHash { get; set; }
        public DateTime CreatedAt { get; set; }
        
        // navigation property
        public Cart Cart { get; set; } = new Cart();
        
        
        public void AddItemToCart(Product product, int quantity)
        {
            Cart.AddItem(product, quantity);
        }

        public void RemoveItemFromCart(int productId, int quantity)
        {
            Cart.RemoveItem(productId, quantity);
        }
        
        
        /*
         public StoreContext<Order> Orders { get; set; } = new List
         */
    }
}

