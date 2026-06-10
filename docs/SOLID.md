# SOLID Principles in Hotel Module – `.NET Web API`

### 📁 Files Referenced:

* `HotelController.cs`
* `HotelService.cs` (Implementation of `IHotelService`)
* `IHotelService.cs`
* `Hotel.cs` (Domain model)

---

## 🧱 **1. Single Responsibility Principle (SRP)**

> A class should have only one reason to change.

### ✅ Good Examples:

* `HotelController.cs` handles only HTTP API logic.
* `HotelService.cs` handles only business logic and database interaction.
* `Hotel.cs` purely represents the hotel entity.

### 💡 Improvements:

* You could extract **DTO-to-Entity conversion logic** in `HotelService` into a separate **Mapper** class (e.g., `HotelMapper`) to maintain pure responsibility.

```csharp
// Before (inside HotelService.cs)
var hotel = new Hotel {
    Name = hotelDTO.Name,
    Location = hotelDTO.Location,
    ...
};

// Suggested (move to HotelMapper.cs)
public static class HotelMapper {
    public static Hotel ToEntity(HotelDTO dto) => new Hotel {
        Name = dto.Name,
        Location = dto.Location,
        ...
    };
}
```

---

## 🧱 **2. Open/Closed Principle (OCP)**

> Software entities should be open for extension, but closed for modification.

### ✅ Good Practice:

* `IHotelService` interface allows adding new service implementations without changing controller code.
* Adding new logic like filters (e.g., rating-based search) can be achieved via extension without modifying existing methods.

### 💡 Improvements:

* Introduce **SearchFilter object** to extend hotel filtering logic cleanly.

```csharp
public class HotelSearchFilter {
    public string? Name { get; set; }
    public string? Location { get; set; }
    public double? MinRating { get; set; }
    // Future filters can be added without modifying method signature
}
```

---

## 🧱 **3. Liskov Substitution Principle (LSP)**

> Subtypes must be substitutable for their base types.

### ✅ Fully Followed:

* `HotelService` correctly implements `IHotelService`.
* `HotelController` depends only on the interface, not the implementation, so any subclass of `IHotelService` can be swapped.

---

## 🧱 **4. Interface Segregation Principle (ISP)**

> Clients should not be forced to depend on interfaces they do not use.

### ✅ Currently Okay:

* `IHotelService` is focused and relevant to hotel operations only.

### 💡 Potential Enhancement:

If this interface grows too large in the future, you can split:

```csharp
public interface IHotelReader {
    Task<IEnumerable<object>> GetAllHotelsAsync();
    Task<object?> GetHotelByIdAsync(int id);
}

public interface IHotelWriter {
    Task<Hotel> CreateHotelAsync(HotelDTO hotelDTO);
    Task<Hotel?> UpdateHotelAsync(int id, HotelDTO hotelDTO);
    Task<bool> DeleteHotelAsync(int id);
}
```

---

## 🧱 **Dependency Inversion Principle (DIP)**

> High-level modules should not depend on low-level modules. Both should depend on abstractions.

### ✅ Followed:

* `HotelController` depends on `IHotelService` interface, not `HotelService` directly.
* `HotelService` is injected through constructor — good use of **Dependency Injection**.

```csharp
public HotelController(IHotelService hotelService) {
    _hotelService = hotelService;
}
```

---

## ✅ Summary Table

| Principle | Status      | Notes                                                  |
| --------- | ----------- | ------------------------------------------------------ |
| SRP       | ✅ Good      | Separate Controller/Service/Model layers               |
| OCP       | ✅ Good      | Can enhance with DTO mappers and search filter classes |
| LSP       | ✅ Fully     | Interface-based design makes this easy                 |
| ISP       | ✅ Okay      | Watch out for growing interfaces                       |
| DIP       | ✅ Excellent | Follows DI with abstraction                            |

---
