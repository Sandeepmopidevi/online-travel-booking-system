# Top 100 C# Interview Questions (with Simple Answers)

---

### 1. What is C#?
C# is a modern, object-oriented programming language developed by Microsoft for building various types of applications that run on the .NET Framework.

### 2. What is the .NET Framework?
The .NET Framework is a software development platform developed by Microsoft that provides tools and libraries to build and run applications on Windows.

### 3. What are the main features of C#?
- Object-oriented
- Type-safe
- Automatic garbage collection
- Rich library support
- Platform-independent (with .NET Core/.NET 5+)

### 4. What is a namespace in C#?
A namespace is a way to organize code and avoid naming conflicts. Example:
```csharp
namespace Online_Travel_and_Hospitality.Controllers
{
  // Your controllers here
}
```

### 5. What is a class in C#?
A class is a blueprint for creating objects. It defines properties and methods.

### 6. What is an object?
An object is an instance of a class.

### 7. What is inheritance?
Inheritance is when a class (child) derives from another class (parent) and gets its features.

### 8. What is encapsulation?
Encapsulation is hiding the internal details and showing only necessary features.

### 9. What is polymorphism?
Polymorphism means many forms. It allows methods to do different things based on the object that is calling them.

### 10. What is abstraction?
Abstraction means showing only essential details and hiding the complexity.

### 11. What is an interface?
An interface defines a contract that classes must follow. Example:
```csharp
public interface IHotelSearchService
{
  // Methods to implement
}
```

### 12. What is the difference between class and interface?
A class can have implementation, but an interface only has method signatures.

### 13. What is a constructor?
A constructor is a special method called when an object is created.

### 14. What is a destructor?
A destructor is a method called when an object is destroyed.

### 15. What is method overloading?
Having multiple methods with the same name but different parameters.

### 16. What is method overriding?
When a child class provides its own implementation for a method defined in the parent class.

### 17. What are access modifiers?
They control the visibility of class members (public, private, protected, internal).

### 18. What is the difference between public and private?
- public: accessible from anywhere
- private: accessible only within the class

### 19. What is a static class?
A static class cannot be instantiated and can only have static members.

### 20. What is a static method?
A static method belongs to the class and not to any specific object.

### 21. What is a value type?
Stores data directly (e.g., int, float, bool, struct).

### 22. What is a reference type?
Stores a reference to the data (e.g., class, string, array, object).

### 23. What is the difference between stack and heap?
- Stack: stores value types, method calls, local variables
- Heap: stores reference types, objects

### 24. What is boxing and unboxing?
Boxing: converting a value type to object.  
Unboxing: converting object back to value type.

### 25. What is a delegate?
A type-safe function pointer used for callbacks and events.

### 26. What is an event?
A way to provide notifications. Subscribers can listen to events via delegates.

### 27. What is the difference between an abstract class and an interface?
- Abstract class: can have implementation and abstract methods.
- Interface: only method signatures, no implementation.

### 28. What are properties in C#?
Properties are special methods called getters and setters that provide access to class fields. Example:
```csharp
public string Name { get; set; }
```

### 29. What is auto-implemented property?
A property with default getter and setter.

### 30. What is the difference between == and Equals()?
- == checks reference equality for objects, value equality for value types.
- Equals() checks value equality.

### 31. What is the difference between “ref” and “out” parameters?
- ref: variable must be initialized before passing
- out: variable can be assigned inside the method

### 32. What is a nullable type?
A value type that can be assigned null using `?`. Example: `int? age`

### 33. What is an extension method?
A static method that adds new functionality to existing types.

### 34. What is LINQ?
Language Integrated Query – a way to query collections in C#.

### 35. What is the difference between Array and List?
- Array: fixed size
- List: dynamic size

### 36. What is an enum?
A special value type defining a group of named constants.

### 37. What is a struct?
A value type that can contain data and methods.

### 38. What is a collection?
A group of objects, e.g., List, Dictionary, Array, HashSet.

### 39. What is a Dictionary?
A collection of key-value pairs.

### 40. What is a HashSet?
A collection of unique items.

### 41. What is async and await?
Keywords used for asynchronous programming to avoid blocking the main thread.

### 42. What is a Task?
Represents an asynchronous operation.

### 43. What is exception handling?
Handling errors using try-catch-finally blocks.

### 44. What is a try-catch-finally block?
A way to catch and handle exceptions.
```csharp
try { /* code */ }
catch (Exception ex) { /* handle error */ }
finally { /* always runs */ }
```

### 45. What is a custom exception?
A user-defined exception class that inherits from Exception.

### 46. What is dependency injection?
Supplying dependencies to a class via constructor or properties, instead of creating them inside the class.

### 47. What is the use of “using” statement?
- To include namespaces.
- To manage resources (e.g., dispose automatically).

### 48. What is a partial class?
A class whose definition can be split into multiple files.

### 49. What is a sealed class?
A class that cannot be inherited.

### 50. What is a virtual method?
A method that can be overridden in derived classes.

### 51. What is an override method?
A method that replaces a virtual method in a derived class.

### 52. What is a base keyword?
Refers to the parent class.

### 53. What is “this” keyword?
Refers to the current instance of the class.

### 54. What is a constructor overloading?
Having multiple constructors with different parameters.

### 55. What is a parameterized constructor?
A constructor that takes parameters.

### 56. What is a default constructor?
A constructor with no parameters.

### 57. What is the difference between const and readonly?
- const: value known at compile time, cannot change
- readonly: value can be set in constructor

### 58. What is garbage collection?
Automatic memory management in C#. Unused objects are deleted automatically.

### 59. What is finalize method?
A method called by the garbage collector before object is destroyed.

### 60. What is a generic?
Code that works with any data type. Example: `List<T>`

### 61. What is a generic method?
A method that works with any data type.

### 62. What is a generic class?
A class that works with any data type.

### 63. What is a constraint in generics?
A rule that restricts the types that can be used as arguments for type parameters.

### 64. What is reflection?
Inspecting metadata about assemblies, types, and members at runtime.

### 65. What is attribute in C#?
A way to add metadata to code.

### 66. What is serialization?
Converting an object to a format for storage or transmission.

### 67. What is deserialization?
Converting data back to an object.

### 68. What is a thread?
A lightweight process for running code in parallel.

### 69. What is multi-threading?
Running multiple threads simultaneously.

### 70. What is locking?
A way to prevent multiple threads from accessing the same resource at the same time.

### 71. What is deadlock?
When two or more threads are waiting for each other, and neither can proceed.

### 72. What is async/await used for?
To write non-blocking code for I/O or network operations.

### 73. What is MVC?
Model-View-Controller, a design pattern for separating concerns in web applications.

### 74. What is Web API?
A framework for building HTTP services that can be consumed by web or mobile apps.

### 75. How to create a simple Web API controller?
```csharp
[ApiController]
[Route("api/[controller]")]
public class HotelsController : ControllerBase
{
  [HttpGet]
  public IEnumerable<Hotel> GetHotels() { ... }
}
```

### 76. What is middleware?
A component in the request pipeline that processes HTTP requests and responses.

### 77. What is CORS?
Cross-Origin Resource Sharing – allows or blocks web requests from different domains.

### 78. What is JWT?
JSON Web Token – used for securely transmitting information between parties.

### 79. What is the use of [Authorize] attribute?
It restricts access to controllers/actions to authenticated users only.

### 80. What is Dependency Injection in ASP.NET Core?
Supplying class dependencies via constructor injection, managed by the framework.

### 81. What is a service in ASP.NET Core?
A class that contains business logic, registered in the DI container.

### 82. What is a repository?
A layer that handles data access logic.

### 83. What is AutoMapper?
A library for mapping one object to another, e.g., DTO to entity.

### 84. What is DTO?
Data Transfer Object – used to transfer data between layers or over the network.

### 85. What is the difference between synchronous and asynchronous methods?
Synchronous blocks the main thread, asynchronous does not.

### 86. What is an action result?
A return type in controllers that represents the result of an action.

### 87. What is ModelState?
It holds the state of model binding and validation in MVC/Web API.

### 88. What is middleware ordering?
The order in which middleware is added matters, as each one can pass or short-circuit the request.

### 89. How do you connect to a database in C#?
Usually using Entity Framework or ADO.NET.

### 90. What is Entity Framework?
An ORM that allows you to work with databases using C# objects.

### 91. What is a DbContext?
The main class for interacting with the database using Entity Framework.

### 92. What is migration in EF Core?
A way to update the database schema as your model changes.

### 93. What is the difference between FirstOrDefault and SingleOrDefault?
- FirstOrDefault: returns the first matching element or null
- SingleOrDefault: expects only one matching element, throws error if more than one

### 94. What is eager vs lazy loading?
- Eager: loads related data immediately
- Lazy: loads related data when accessed

### 95. What is a ViewModel?
A model designed for use in a view, often combining data from multiple sources.

### 96. What is the use of async/await in Web API?
To handle I/O-bound work without blocking the main thread, improving scalability.

### 97. What is logging?
Recording information about application activity for troubleshooting.

### 98. What is unit testing?
Testing individual units of code to ensure correctness.

### 99. What is mocking?
Creating fake objects for testing purposes.

### 100. What is SOLID?
A set of 5 design principles for writing cleaner, more maintainable code:
- Single Responsibility
- Open/Closed
- Liskov Substitution
- Interface Segregation
- Dependency Inversion

---
