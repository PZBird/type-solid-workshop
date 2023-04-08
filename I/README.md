# Interface Segregation Principle (ISP)

The Interface Segregation Principle (ISP) states that clients should not be forced to depend on interfaces they do not use. This means that interfaces should be designed in such a way that clients only need to know about the methods that are relevant to them.

By following ISP, developers can create code that is more modular and easier to maintain. It also promotes better separation of concerns and helps avoid bloated interfaces that can be difficult to work with.

Suppose we have an `Employee` interface that has several methods:

```typescript
interface Employee {
  name: string;
  id: number;
  email: string;
  hireDate: Date;
  getTitle(): string;
  getDescription(): string;
  calculatePay(): number;
  approveTimeOff(startDate: Date, endDate: Date): void;
}
```

Now suppose we have a `Developer` class that implements the `Employee` interface:

```typescript
class Developer implements Employee {
  constructor(
    public name: string,
    public id: number,
    public email: string,
    public hireDate: Date,
  ) {}

  getTitle() {
    return "Developer";
  }

  getDescription() {
    return "Develops software applications.";
  }

  calculatePay() {
    // Calculate pay based on the number of hours worked
    return 0;
  }

  approveTimeOff(startDate: Date, endDate: Date) {
    // approve time off request
  }
}
```

In this example, the `Developer` class implements all of the methods in the `Employee` interface, even though not all of these methods are relevant to a developer's job. This violates the Interface Segregation Principle because the `Employee` interface is too large and not all of its methods are needed by every class that implements it.

To refactor this code to follow the ISP, we can create separate interfaces for each group of related methods:

```typescript
interface Employee {
  name: string;
  id: number;
  email: string;
  hireDate: Date;
}

interface JobTitle {
  getTitle(): string;
  getDescription(): string;
}

interface Payroll {
  calculatePay(): number;
}

interface TimeOffApprove {
  approveTimeOff(startDate: Date, endDate: Date): void;
}
```

Now we can have the `Developer` class implement only the interfaces that are relevant to its job:

```typescript
class Developer implements Employee, JobTitle, Payroll {
  constructor(
    public name: string,
    public id: number,
    public email: string,
    public hireDate: Date,
  ) {}

  getTitle() {
    return "Developer";
  }

  getDescription() {
    return "Develops software applications.";
  }

  calculatePay() {
    // Calculate pay based on the number of hours worked
    return 0;
  }
}
```

And we can have another class, such as an `HRManager`, implement the `TimeOffApprove` interface:

```typescript
class HRManager implements Employee, TimeOffApprove {
  constructor(
    public name: string,
    public id: number,
    public email: string,
    public hireDate: Date,
  ) {}

  approveTimeOff(startDate: Date, endDate: Date) {
    // Approve time off request
  }
}
```

In this refactored code, we have used the Interface Segregation Principle by separating the large `Employee` interface into smaller, more focused interfaces. This makes our code more maintainable and flexible, because we can easily add new classes that implement only the interfaces that are relevant to their job, without modifying the existing code.
