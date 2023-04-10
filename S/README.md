# Single Responsibility Principle (SRP) ([RU](./RU/README.md))

The Single Responsibility Principle (SRP) states that a class should have only one reason to change. This means that a class should have only one responsibility or job to do. If a class has multiple responsibilities, it becomes difficult to maintain and modify the code.

By following SRP, developers can create code that is easier to understand, test, and modify. It also promotes better organization and reduces coupling between classes, making the overall system more modular and extensible.

Let's look for a next code block:

```typescript
class User {
  constructor(private name: string, private email: string) {}

  save() {
    // Save user to the database
  }

  sendEmail(subject: string, body: string) {
    // Send email to the user
  }

  delete() {
    // Delete user from the database
  }
}
```

In this example, the `User` class has multiple responsibilities: saving the user to the database, sending emails to the user, and deleting the user from the database. This violates the Single Responsibility Principle because the class has more than one reason to change. For example, if we want to change how the user is saved to the database, we would also need to change the code for sending emails and deleting users.

To refactor this code to follow the Single Responsibility Principle, we can separate the responsibilities into separate classes. Here's an example:

```typescript
class User {
  constructor(private name: string, private email: string) {}
}

class UserRepository {
  save(user: User) {
    // Save user to the database
  }

  delete(userId: number) {
    // Delete user from the database
  }
}

class EmailSender {
  sendEmail(to: string, subject: string, body: string) {
    // Send email using SMTP
  }
}

class UserManager {
  constructor(private userRepository: UserRepository, private emailSender: EmailSender) {}

  registerUser(username: string, password: string, email: string) {
    const user = new User(username, email);
    this.userRepository.save(user);
    this.emailSender.sendEmail(email, "Welcome to our site", "Thank you for registering!");
  }

  deleteUser(userId: number) {
    this.userRepository.delete(userId);
  }
}
```

In this refactored code, the `User` class only has the responsibility of representing a user. The `UserRepository` class has the responsibility of saving and deleting users from the database, and the `EmailSender` class has the responsibility of sending emails to users. The `UserManager` class has the responsibility of managing users, and it delegates the responsibilities of saving users to the `UserRepository` class and sending emails to the `EmailSender` class. This way, each class has a single responsibility and the code is easier to maintain and extend.

[Main](../README.md) | [Next](../O/README.md)