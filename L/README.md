# Liskov Substitution Principle (LSP) ([RU](./RU/README.md))

The Liskov Substitution Principle (LSP) states that objects of a superclass should be replaceable with objects of a subclass without affecting the correctness of the program. This means that any subclass should be able to substitute its parent class without causing errors or unexpected behavior.

By following LSP, developers can create code that is more modular and easier to test. It also promotes better inheritance hierarchy and helps avoid tight coupling between classes.


Suppose we have a `Rectangle` class that represents a rectangle with a width and a height property, and a `Square` class that extends the `Rectangle` class and represents a square with a `side` property:

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

Now suppose we have a function `printArea` that takes a `Rectangle` object and prints its area:

```typescript
function printArea(rectangle: Rectangle) {
  console.log(rectangle.area());
}
```

If we pass a `Rectangle` object to the `printArea` function, it will print the area correctly:

```typescript
const rectangle = new Rectangle(4, 5);
printArea(rectangle); // Output: 20
```

However, if we pass a `Square` object to the `printArea` function, it will also print the area correctly because a square is a special case of a rectangle:

```typescript
const square = new Square(4);
printArea(square); // Output: 16
```

But if we try to modify the `Square` object by changing its width or height properties, we will violate the LSP because the behavior of the `Square` object will no longer be the same as the behavior of a `Rectangle` object:

```typescript
const square = new Square(4);
square.width = 5;
printArea(square); // Output: 20 instead of 25
```

To refactor this code to follow the LSP, we can create a new `Shape` class that represents a shape with an `area` method, and make the `Rectangle` and `Square` classes implement the `Shape` class:

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

Now if we pass a `Rectangle` or a `Square` object to the printArea function, it will print the `area` correctly:

```typescript
const rectangle = new Rectangle(4, 5);
printArea(rectangle); // Output: 20

const square = new Square(4);
printArea(square); // Output: 16
```

And if we try to modify the `Square` object by changing its width or height properties, it will throw an error because the `Square` object does not have these properties:

```typescript
const square = new Square(4);
(square as any).width = 5; // Error: Property 'width' does not exist on type 'Square'
printArea(square); // Output: 16
```

In this refactored code, we have used the Liskov Substitution Principle by making the `Rectangle` and `Square` classes implement the `Shape` interface and ensuring that they behave correctly when passed to the `printArea` function. This makes our code more maintainable and flexible, because we can easily add new shapes that implement the `Shape` interface without modifying the existing code.

[Main](../README.md) | [Previous](../O/README.md) | [Next](../I/README.md)
