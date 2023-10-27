namespace API.Entities
{
    public class Basket {
        public int Id { get; set; }
        public string UserId { get; set; }
        public List<BasketItem> Items { get; set; } = new();

        public void AddItem(Product product, int quantity)
        {
            var existingItem = Items.FirstOrDefault(item => item.ProductId == product.Id);

            if (existingItem != null)
            {
                existingItem.Quantity += quantity;
            }
            else
            {
                Items.Add(new BasketItem
                {
                    ProductId = product.Id,
                    Quantity = quantity,
                });
            }
        }

        public void RemoveItem(int ProductId, int quantity) {
            var item = Items.FirstOrDefault(item => item.ProductId == ProductId);
            if (item != null) {
                if (item.Quantity > quantity) {
                    item.Quantity -= quantity;
                } else {
                    Items.Remove(item);
                }
            }
        }
    }
}