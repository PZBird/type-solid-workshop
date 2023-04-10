# Принцип открытости-закрытости (OCP) ([EN](../README.md))

Принцип открытости-закрытости (OCP) говорит, что любая сущность (класс, модуль, функция и проч.) должны быть открыты для расширения, но закрыты для модификации. Это значит, что мы должны иметь возможность добавить новую функциональность, без изменения существующего кода.

Придерживаясь OCP, разработчик может сделать код более гибким и его будет проще поддерживать. Это также позволяет лучше переиспользовать код и предоставляет возможность использовать интерфейсы и абстракции для достижения целей.

Представим, что у нас есть класс `Order` который расчитывает общую стоимость заказа, основываясь на списке товаров и их цен:

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

Теперь представим, что мы хотим предложить скидку на заказ, который содержит более 3 товаров. Если мы просто добавим расчет скидки в `Order` класс, мы нарушим принцип OCP, так как мы изменим существующий класс, вместо того, что бы расширить его:

```typescript
class Order {
  constructor(private products: { name: string; price: number }[]) {}

  calculateTotalPrice() {
    let total = 0;
    for (const product of this.products) {
      total += product.price;
    }

    // Скидка на заказы с количеством товаров более 3
    if (this.products.length > 3) {
      total *= 0.9; // 10% скидка
    }

    return total;
  }
}
```

Чтобы переписать данный код, следуя принципу открытости-закрытости, мы должны сделать новый класс `DiscountedOrder`, который будет расширять класс `Order` добавляя в него расчет скидки:

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

    // Скидка на заказы с количеством товаров более 3
    if (this.products.length > 3) {
      total *= 0.9; // 10% скидка
    }

    return total;
  }
}
```

В этом коде мы расширили класс `Order` новым классом `DiscountedOrder`, который добавляет расчет скидки без модификации существующего класса `Order`. Это соответствует принципу открытости-закрытости, потому что не изменяет поведение класса `Order`, что делает наш код более гибким и простым для поддержки.

[Вернуться на главную](../../README_RU.md) | [Предыдущая](../../S/RU/README.md) | [Следующая](../../L/RU/README.md)