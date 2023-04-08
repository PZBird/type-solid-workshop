class BadOrderClass {
  constructor(private products: { name: string; price: number }[]) {}

  calculateTotalPrice() {
    let total = 0;
    for (const product of this.products) {
      total += product.price;
    }

    // Discount for orders with more than 3 products
    if (this.products.length > 3) {
      total *= 0.9; // 10% discount
    }

    return total;
  }
}
