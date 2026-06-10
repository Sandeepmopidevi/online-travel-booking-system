# ApplicationDbContext Line-by-Line Explanation

This file explains every line of your `ApplicationDbContext` code and gives you simple, beginner-friendly interview questions and answers about Entity Framework Core and the context class.

---

## Code Walkthrough

```csharp
using Microsoft.EntityFrameworkCore;
using Online_Travel_and_Hospitality.Models.Domain;
```
- `using ...;` – These lines bring in external code libraries so you can use their classes (like `DbContext` and your domain models).

---

```csharp
namespace Online_Travel_and_Hospitality.Data
{
```
- `namespace ...` – Groups related classes together. Like a folder for your database logic.

---

```csharp
    // Class that manages Database interactions
    public class ApplicationDbContext : DbContext
    {
```
- `public class ApplicationDbContext : DbContext` – This class is your main "bridge" between your C# code and your database.  
- It inherits (`:`) from `DbContext`, which is the standard Entity Framework Core class for database work.

---

```csharp
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }
```
- This is a **constructor**.  
- It takes in some database options and passes them to the base `DbContext`.  
- It helps Entity Framework know how to connect to your database.

---

```csharp
        public DbSet<Flight> Flights { get; set; }
        public DbSet<Booking> Bookings { get; set; }
        public DbSet<Hotel> Hotels { get; set; }
        public DbSet<Review> Reviews { get; set; }
        public DbSet<SupportTicket> SupportTicket { get; set; }
        public DbSet<Payment> Payments { get; set; }
        public DbSet<Itinerary> Itineraries { get; set; }
        public DbSet<Package> Packages { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Invoice> Invoices { get; set; }
```
- Each `DbSet<T>` property represents a **table** in your database.  
- For example, `Flights` is for the `Flight` table, `Bookings` for the `Booking` table, etc.  
- You can use these properties to run queries (`db.Flights.ToList()`, etc.).

---

```csharp
        //Method that sets up the model and relationships between entities
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
```
- `OnModelCreating` is a special method for configuring your database tables, relationships, and rules.  
- `base.OnModelCreating(modelBuilder)` calls the default setup first.

---

```csharp
            // Setting the decimal precision for Payment Amount
            modelBuilder.Entity<Payment>()
                .Property(p => p.Amount)
                .HasPrecision(18, 2);
```
- This says the `Amount` field in the `Payment` table should have a decimal type with `18` digits in total and `2` decimal places (like 99999999999999.99).

---

```csharp
            // Defining Foreign key Relationships
            modelBuilder.Entity<SupportTicket>()
                .HasOne(c => c.User)
                .WithMany(p => p.SupportTickets)
                .HasForeignKey(c => c.UserID);
```
- This sets up a **foreign key**:  
  - Each `SupportTicket` is linked to one `User` (the one who created the ticket).  
  - Each `User` can have many `SupportTickets`.

---

```csharp
            modelBuilder.Entity<Review>()
                .HasOne(h => h.Hotel)
                .WithMany(r => r.Reviews)
                .HasForeignKey(r => r.HotelId);

            modelBuilder.Entity<Review>()
                .HasOne(u => u.User)
                .WithMany(r => r.Reviews)
                .HasForeignKey(r => r.UserID);
```
- Each `Review` is linked to one `Hotel` and one `User`.  
- A `Hotel` can have many `Reviews`, and a `User` can write many `Reviews`.

---

```csharp
            modelBuilder.Entity<Invoice>()
                .HasOne(i => i.Booking)
                .WithMany(b => b.Invoices)
                .HasForeignKey(i => i.BookingId)
                .OnDelete(DeleteBehavior.Restrict); // ON DELETE RESTRICT TO PREVENT CIRCULAR REFERENCE

            modelBuilder.Entity<Invoice>()
                .HasOne(i => i.User)
                .WithMany(u => u.Invoices)
                .HasForeignKey(i => i.UserID)
                .OnDelete(DeleteBehavior.Restrict);
```
- Each `Invoice` is linked to one `Booking` and one `User`.
- `OnDelete(DeleteBehavior.Restrict)` means you **cannot delete** a `Booking` or `User` if there are related invoices, to avoid database errors.

---

```csharp
            modelBuilder.Entity<Booking>()
                .HasOne(b => b.User)
                .WithMany(u => u.Bookings)
                .HasForeignKey(b => b.UserID);
```
- Each `Booking` is linked to one `User`, and each `User` can have many bookings.

---

```csharp
            modelBuilder.Entity<Payment>()
                .HasOne(p => p.User)
                .WithMany(u => u.Payments)
                .HasForeignKey(p => p.UserId);
```
- Each `Payment` is linked to one `User`, and each `User` can have many payments.

---

```csharp
            modelBuilder.Entity<Itinerary>()
                .HasOne(i => i.User)
                .WithMany(u => u.Itineraries)
                .HasForeignKey(i => i.UserID);

            modelBuilder.Entity<Itinerary>()
                .HasOne(i => i.Package)
                .WithMany(p => p.Itineraries)
                .HasForeignKey(i => i.PackageID);
        }
    }
}
```
- Each `Itinerary` is linked to one `User` and one `Package`.
- A `User` can have many itineraries, and a `Package` can belong to many itineraries.

---

# Basic Interview Questions & Answers (Entity Framework Core & DbContext)

### 1. **What is DbContext in Entity Framework Core?**  
It's a class that represents a session with the database. It lets you query and save data.

### 2. **What is a DbSet?**  
A DbSet represents a table in your database and lets you work with its rows as objects.

### 3. **How do you define relationships between tables?**  
Inside `OnModelCreating`, use the `HasOne`, `WithMany`, and `HasForeignKey` methods to set up relationships (like one-to-many).

### 4. **What does `OnDelete(DeleteBehavior.Restrict)` mean?**  
It prevents deleting a parent row if child rows exist (e.g., you can't delete a user who has invoices).

### 5. **How do you set the precision of a decimal column?**  
Use `.HasPrecision(18, 2)` in the model builder for decimal properties.

### 6. **How does Entity Framework know which table to use?**  
It uses the `DbSet` property name (e.g., `public DbSet<Flight> Flights`) and maps it to the `Flight` table.

### 7. **How do you query data using DbContext?**  
Example:  
```csharp
var allHotels = dbContext.Hotels.ToList();
```

### 8. **What is a migration in EF Core?**  
It's a way to apply your code changes to the database schema using commands like `Add-Migration` and `Update-Database`.

### 9. **How do you connect your DbContext to the real database?**  
By configuring it in `Program.cs` or `Startup.cs` with a connection string.

### 10. **Why do we need to override OnModelCreating?**  
To customize how tables and relationships are created, set up keys, constraints, etc.

---

**Tip:** Always relate your answers to your project (flights, hotels, bookings, etc.) for the interview!
