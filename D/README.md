# Dependency Inversion Principle (DIP) ([RU](./README_RU.md))

The Dependency Inversion Principle (DIP) states that high-level modules should not depend on low-level modules. Instead, both should depend on abstractions. This means that the details of implementation should be hidden behind an interface or abstract class.

By adhering to DIP, developers can create code that is more flexible and easier to test. It also promotes better separation of concerns and helps avoid tight coupling between modules.

Suppose we have a `PaymentService` class that is responsible for processing payments:

```typescript
class PaymentService {
  processPayment(amount: number, paymentMethod: string) {
    // Process payment using the given payment method
  }
}
```

Now suppose we have a `ShoppingCartService` class that needs to use the `PaymentService` to process payments:

```typescript
class ShoppingCartService {
  constructor(private paymentService: PaymentService) {}

  checkout(cart: ShoppingCart) {
    const totalAmount = cart.getTotalAmount();
    this.paymentService.processPayment(totalAmount, "credit card");
    cart.empty();
  }
}
```

In this example, the `ShoppingCartService` class has a dependency on the `PaymentService` class, which violates the Dependency Inversion Principle. This is because the `ShoppingCartService` class depends on a concrete implementation of the `PaymentService` class, which makes it difficult to modify the code later on if we want to use a different payment service.

To refactor this code to follow the DIP, we can use an interface to define the behavior of the `PaymentService`, and have the `PaymentService` class implement this interface:

```typescript
interface IPaymentService {
  processPayment(amount: number, paymentMethod: string): void;
}

class PaymentService implements IPaymentService {
  processPayment(amount: number, paymentMethod: string) {
    // Process payment using the given payment method
  }
}
```

Now we can modify the `ShoppingCartService` class to depend on the `IPaymentService` interface, instead of the concrete `PaymentService` class:

```typescript
class ShoppingCartService {
  constructor(private paymentService: IPaymentService) {}

  checkout(cart: ShoppingCart) {
    const totalAmount = cart.getTotalAmount();
    this.paymentService.processPayment(totalAmount, "credit card");
    cart.empty();
  }
}
```

By depending on the `IPaymentService` interface, the `ShoppingCartService` class is decoupled from the concrete implementation of the payment service, which makes it more flexible and easier to modify later on if we want to use a different payment service.

We can also use dependency injection to provide the `PaymentService` instance to the `ShoppingCartService` class at runtime, instead of having the `ShoppingCartService` class create an instance of the `PaymentService` class directly:

```typescript
const paymentService = new PaymentService();
const shoppingCartService = new ShoppingCartService(paymentService);
```

In this code, we create an instance of the `PaymentService` class and pass it to the constructor of the `ShoppingCartService` class. This way, we can easily swap out the `PaymentService` instance with a different implementation, without modifying the `ShoppingCartService` class.

[Main](../README.md) | [Previous](../I/README.md)
