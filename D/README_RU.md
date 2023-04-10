# Принцип инверсии зависимостей (DIP) ([EN](./README.md))

Принцип инверсии зависимостей (DIP) гласит, что модули верхнего порядка не должны зависить от модулей нижнего порядка. Вместо этого, оба уровня должны зависить от абстракции. Это означает, что детали реализации должны быть скрыты за интерфейсом или абстрактным классом.

Следуя DIP, разработчики могут создавать более гибкий и простой для тестирования код. Это также способствует лучшему разделению задач и помогает избежать тесной связи между модулями.

## Пример

Предположим у нас есть класс `PaymentService` отвечающий за процессинг оплаты:

```typescript
class PaymentService {
  processPayment(amount: number, paymentMethod: string) {
    // Оплатить используя платежный метод
  }
}
```

Теперь предположим у нас есть класс `ShoppingCartService` который должен использовать `PaymentService` для платежей:

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

В этом примере, класс `ShoppingCartService` имеет зависимость от класса `PaymentService`, что нарушает принцип инверсии зависимостей. Все потому что класс `ShoppingCartService` зависит от конкретной реализации класса `PaymentService`, который создает сложности модифицирования кода в дальнейшем, например, если мы захотим использовать другой платежный сервис.

Что бы изменить этот код, следуя DIP, мы можем использовать интерфейс, который определит поведение `PaymentService`, и сделать класс `PaymentService` реализацией нового интерфейса:

```typescript
interface IPaymentService {
  processPayment(amount: number, paymentMethod: string): void;
}

class PaymentService implements IPaymentService {
  processPayment(amount: number, paymentMethod: string) {
    // Оплатить используя платежный метод
  }
}
```

Теперь мы можем модифицировать класс `ShoppingCartService` так, что бы он был зависим от интерфейса `IPaymentService`, вместо конкретного класса `PaymentService`:

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

Будучи зависимой от интерфейса `IPaymentService`, класс `ShoppingCartService` становится независим от конкретной реализации платежного сервиса, что позволяет коду быть более гибким и его стало проще модифицировать его, если нам понадобится изменить платежный сервис в будущем.

Мы так же можем использовать инъекцию зависимости предоставив экземпляр `PaymentService` для класса `ShoppingCartService` в исполняемой среде, вместо того, что бы класс `ShoppingCartService` cсоздавал экзампляр класса `PaymentService` напрямую:

```typescript
const paymentService = new PaymentService();
const shoppingCartService = new ShoppingCartService(paymentService);
```

Таким образом, мы создали экземпляр класс `PaymentService` и пробросили его в конструктор класса `ShoppingCartService`. Таким способом, мы можем легко поменять экземпляр класс `PaymentService` любой другой реализацией, не меняя, при этом, класс `ShoppingCartService`.

[Вернуться на главную](../README_RU.md) | [Предыдущая](../I/README_RU.md)
