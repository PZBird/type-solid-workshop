# Принцип подстановки Барбары Лисков (LSP) ([EN](./README.md))

Принцип подстановки Барбары Лисков гласит, что объекты суперкласса должны заменяться объектами подкласса без ущерба для корректности программы. Это означает, что любой подкласс должен иметь возможность заменить свой родительский класс, не вызывая ошибок или неожиданного поведения.

Следуя LSP, могут создавать код, который будет более модульный и прост в тестировании. Это так же позволяет выстроить более лучшее иерархию зависимостей и помогает избежать тесной связи между классами.

Представим, у нас есть класс `Rectangle` представляющий прямоугольник со свойствами ширина (`width`) и высота(`height`), а также класс `Square`  расширяющий класс `Rectangle` и представляющий квадрат, со свойством сторона - `side`:

```typescript
class Rectangle {
  constructor(public width: number, public height: number) {}

  area() {
    return this.width * this.height;
  }
}

class Square extends Rectangle {
  constructor(public side: number) {
    super(side, side);
  }
}
```

Теперь представьте, что нам надо сделать функцию `printArea` которая возьмет за основу объект `Rectangle` и выведет его площадь:

```typescript
function printArea(rectangle: Rectangle) {
  console.log(rectangle.area());
}
```

Если мы предоставим объект `Rectangle` в функцию `printArea`, то вывод будет корректным:

```typescript
const rectangle = new Rectangle(4, 5);
printArea(rectangle); // Вывод: 20
```

Также, если мы предоставим объект `Square` в функцию  `printArea`, то вывод также будет корректным, так как квадрат - частный случай прямоугольника:

```typescript
const square = new Square(4);
printArea(square); // Вывод: 16
```

Но как только мы попробуем модифицировать объект `Square` изменив свойство ширины или высоты, мы нарушим принцип подстановки Лисков, потому что поведение класса  `Square` больше не соответствует поведению класса `Rectangle`:

```typescript
const square = new Square(4);
square.width = 5;
printArea(square); // Вывод: 20 вместо 25
```

Что бы переписать код, в соответствии с принципом LSP, мы можем создать интерфейс `Shape` который будет предоставлять метод `area`, а затем сделать классы `Rectangle` и `Square` имплементацией интерфейса `Shape`:

```typescript
interface Shape {
  area(): number;
}

class Rectangle implements Shape {
  constructor(public width: number, public height: number) {}

  area() {
    return this.width * this.height;
  }
}

class Square implements Shape {
  constructor(public side: number) {}

  area() {
    return this.side * this.side;
  }
}
```

Теперь, если мы предоставим объект класса `Rectangle` или `Square` в функцию `printArea`, то она будет считать `area` правильно:

```typescript
const rectangle = new Rectangle(4, 5);
printArea(rectangle); // Вывод: 20

const square = new Square(4);
printArea(square); // Вывод: 16
```

И, если мы попробуем изменить свойство высоты или ширины объекта `Square`, это вызовет ошибку, так как объект класса `Square` не имеет таких свойств:

```typescript
const square = new Square(4);
(square as any).width = 5; // Error: Property 'width' does not exist on type 'Square'
printArea(square); // Вывод: 16
```

В новом коде, мы использовали принцип подстановки Барбары Лисков, сделав классы `Rectangle` and `Square` реализацией интерфейса `Shape` и гарантировали, что они ведут себя корректно, когда предоставляются в функцию `printArea`. Это сделало наш код более поддерживаемым и гибким, так как мы можем легко добавлять новые фигуры, которые будут реализовывать интерфейс `Shape` без модификации существующего кода.

[Вернуться на главную](../README_RU.md) | [Предыдущая](../O/README_RU.md) | [Следующая](../I/README_RU.md)
