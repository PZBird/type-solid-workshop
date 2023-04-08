class GoodOrderClass {
  constructor(protected products: { name: string; price: number }[]) {}

  calculateTotalPrice() {
    let total = 0;
    for (const product of this.products) {
      total += product.price;
    }
    return total;
  }
}

class DiscountedOrder extends GoodOrderClass {
  constructor(products: { name: string; price: number }[]) {
    super(products);
  }

  calculateTotalPrice() {
    let total = super.calculateTotalPrice();

    // Discount for orders with more than 3 products
    if (this.products.length > 3) {
      total *= 0.9; // 10% discount
    }

    return total;
  }
}
