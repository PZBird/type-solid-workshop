# Принцип разделения интерфейсов (ISP) ([EN](../README.md))

Принцип разделения интерфейсов гласит, что клиенты не должны зависеть от интерфейсов, которые они не используют. Это означает, что интерфейсы должны быть разработаны таким образом, чтобы клиентам нужно было знать только о тех методах, которые имеют отношение к ним.

Следуя ISP, разработчики могут создавать более модульный код, который проще поддерживать. Это также способствует лучшему разделению задач и помогает избежать раздутых интерфейсов, с которыми может быть сложно работать.

## Пример

Предположим у нас есть интерфейс `Employee` у которого есть несколько полей иметодов:

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

Теперь предположим, у нас есть класс `Developer` реализующий интерфейс `Employee`:

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
    // Расчитать оплату исходя из часов
    return 0;
  }

  approveTimeOff(startDate: Date, endDate: Date) {
    // Подтвердить выходной
  }
}
```

В этом примере, класс `Developer` реализует все методы интерфейса `Employee`, даже те, которые не имеют отношения к этой должности. Это нарушает принцип разделения интерфейсов, потому что интерфейс `Employee` слишком большой и не все методы, содержащиеся в нем нужны всем классам реализующим его.

Что бы переписать этот код следуя принципам ISP, мы можем создать раздельный интерфейс для каждого из зависимых методов:

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

Теперь, класс `Developer`  может реализовать только те интерфейсы, которые относятся к данной должности:

```typescript
class Developer implements Employee, JobTitle, Payroll {
  constructor(
    public name: string,
    public id: number,
    public email: string,
    public hireDate: Date,
  ) {}

  getTitle() {
    return "Разработчик";
  }

  getDescription() {
    return "Разработчик програмного обеспечения.";
  }

  calculatePay() {
    // Расчитать оплату исходя из часов
    return 0;
  }
}
```

И дальше, мы можем сделать еще один класс  `HRManager`, реализующий интерфейс `TimeOffApprove`:

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

В новом коде мы использовали принцип разделения интерфейса, разделив большой интерфейс `Employee` на более мелкие, более целенаправленные интерфейсы. Это делает наш код более удобным для сопровождения и гибким, поскольку мы можем легко добавлять новые классы, которые реализуют только те интерфейсы, которые имеют отношение к их работе, не изменяя существующий код.

[Вернуться на главную](../../README_RU.md) | [Предыдущая](../../L/RU/README.md) | [Следующая](../../D/RU/README.md)
