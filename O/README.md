# Open-Closed Principle (OCP)

Suppose we have an Order class that calculates the total price of an order based on a list of products and their prices:

```typescript
class Order {
  constructor(private products: { name: string; price: number }[]) {}

  calculateTotalPrice() {
    let total = 0;
    for (const product of this.products) {
      total += product.price;
    }
    return total;
  }
}
```

Now suppose we want to offer a discount on orders that contain more than 3 products. If we simply add the discount calculation to the Order class, we will be violating the OCP because we will be modifying an existing class instead of extending it:

```typescript
class Order {
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
```

To refactor this code to follow the OCP, we can create a new class DiscountedOrder that extends the Order class and adds the discount calculation:

```typescript
class Order {
  constructor(private products: { name: string; price: number }[]) {}

  calculateTotalPrice() {
    let total = 0;
    for (const product of this.products) {
      total += product.price;
    }
    return total;
  }
}

class DiscountedOrder extends Order {
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
```

In this refactored code, we have extended the `Order` class with a new `DiscountedOrder` class that adds the discount calculation without modifying the existing `Order` class. This follows the OCP of SOLID principles because we have extended the behavior of the `Order` class without modifying it, which makes our code more flexible and easier to maintain.
