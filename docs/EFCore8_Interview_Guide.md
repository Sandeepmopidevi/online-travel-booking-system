# EF Core 8.0 Interview Guide – Simple Explanations and Project-Based Examples

A beginner-friendly summary with hands-on examples for each EF Core 8.0 topic.

---

## 1. Introduction and Basic Concepts

### Introduction to EF Core 8.0
**EF Core 8.0** is Microsoft's modern, lightweight, and cross-platform Object-Relational Mapper (ORM) for .NET. It helps you interact with databases using C# objects.

**New Features in EF Core 8.0**  
- Improved performance  
- Better support for unmapped types  
- Enhanced LINQ translation  
- New mapping options

---

### Getting Started with EF Core

#### Setting up the Development Environment
- Install [.NET 8 SDK](https://dotnet.microsoft.com/download)
- Add EF Core NuGet packages:
    ```shell
    dotnet add package Microsoft.EntityFrameworkCore.SqlServer
    dotnet add package Microsoft.EntityFrameworkCore.Tools
    ```

#### Creating a New EF Core Project
1. Create a Console App:
    ```shell
    dotnet new console -n EfCoreDemo
    cd EfCoreDemo
    ```
2. Add EF Core packages as shown above.

#### Configuring DbContext and Models
- **DbContext**: Manages your database connections and tables.
- **Model**: C# class that maps to a table.

**Example:**
```csharp
public class Blog
{
    public int BlogId { get; set; }
    public string Name { get; set; }
}

public class BloggingContext : DbContext
{
    public DbSet<Blog> Blogs { get; set; }
    protected override void OnConfiguring(DbContextOptionsBuilder options)
        => options.UseSqlServer("Your_Connection_String_Here");
}
```

---

### Basic CRUD Operations

#### Creating Data
```csharp
using (var db = new BloggingContext())
{
    db.Blogs.Add(new Blog { Name = "My First Blog" });
    db.SaveChanges();
}
```

#### Reading Data
```csharp
using (var db = new BloggingContext())
{
    var blogs = db.Blogs.ToList();
}
```

#### Updating Data
```csharp
using (var db = new BloggingContext())
{
    var blog = db.Blogs.First();
    blog.Name = "Updated Blog";
    db.SaveChanges();
}
```

#### Deleting Data
```csharp
using (var db = new BloggingContext())
{
    var blog = db.Blogs.First();
    db.Blogs.Remove(blog);
    db.SaveChanges();
}
```

#### Tracking and Saving Changes
EF Core tracks changes to your objects. `SaveChanges()` commits them to the database.

---

### Querying Data with LINQ

#### Basic LINQ Queries
```csharp
var blogs = db.Blogs.Where(b => b.Name.Contains("EF")).ToList();
```

#### Filtering, Sorting, and Paging
```csharp
var blogs = db.Blogs
    .Where(b => b.Name.StartsWith("A"))
    .OrderBy(b => b.Name)
    .Skip(5)
    .Take(10)
    .ToList();
```

#### Projections and Anonymous Types
```csharp
var blogNames = db.Blogs.Select(b => new { b.BlogId, b.Name }).ToList();
```

---

## 2. Advanced Querying and Performance

### Advanced LINQ Queries

#### Joins and Groupings
```csharp
var postsWithBlogs = db.Posts
    .Join(db.Blogs, p => p.BlogId, b => b.BlogId, (p, b) => new { p.Title, b.Name })
    .ToList();

var grouped = db.Posts.GroupBy(p => p.BlogId)
    .Select(g => new { BlogId = g.Key, Count = g.Count() })
    .ToList();
```

#### Complex Queries and Subqueries
```csharp
var topBlog = db.Blogs
    .Where(b => b.Posts.Count > 10)
    .OrderByDescending(b => b.Posts.Count)
    .FirstOrDefault();
```

#### Using Raw SQL Queries
```csharp
var blogs = db.Blogs.FromSqlRaw("SELECT * FROM Blogs WHERE Name LIKE 'EF%'").ToList();
```

---

### Performance Optimization

#### Query Performance Tuning
- Use `AsNoTracking()` for read-only queries to improve performance.
    ```csharp
    var blogs = db.Blogs.AsNoTracking().ToList();
    ```

#### Caching Strategies
- Caching query results in-memory or using a distributed cache can improve performance for frequent queries.

#### Using Pre-Compiled Queries
- Pre-compiling queries saves the translation step for frequently executed queries.
    ```csharp
    var compiledQuery = EF.CompileQuery((BloggingContext ctx, string name) =>
        ctx.Blogs.Where(b => b.Name == name));
    var result = compiledQuery(db, "My Blog");
    ```

---

### Asynchronous Programming

#### Async and Await in EF Core
EF Core supports async methods for database operations.

#### Asynchronous CRUD Operations
```csharp
var blogs = await db.Blogs.ToListAsync();
await db.Blogs.AddAsync(new Blog { Name = "Async Blog" });
await db.SaveChangesAsync();
```

#### Handling Concurrency
- Use a concurrency token (e.g., `RowVersion` byte array) and handle `DbUpdateConcurrencyException` in code.

---

## 3. Model Building, Migrations, and Advanced Features

### Model Building

#### Fluent API vs. Data Annotations
- **Data Annotations:** Use attributes in code.
    ```csharp
    public class Blog
    {
        [Key]
        public int BlogId { get; set; }
        [Required]
        public string Name { get; set; }
    }
    ```
- **Fluent API:** Use `OnModelCreating` method for configuration.
    ```csharp
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Blog>().Property(b => b.Name).IsRequired();
    }
    ```

#### Configuring Relationships
**One-to-Many Example:**
```csharp
public class Blog
{
    public int BlogId { get; set; }
    public List<Post> Posts { get; set; }
}
public class Post
{
    public int PostId { get; set; }
    public int BlogId { get; set; }
    public Blog Blog { get; set; }
}
```

#### Value Converters and Custom Conventions
- Value converters transform values between C# and the database.
    ```csharp
    modelBuilder.Entity<Blog>()
        .Property(b => b.IsActive)
        .HasConversion<int>();
    ```

---

### Migrations and Database Management

#### Creating and Applying Migrations
- Create migration:  
    ```shell
    dotnet ef migrations add InitialCreate
    ```
- Apply migration:
    ```shell
    dotnet ef database update
    ```

#### Managing Database Schema Changes
- Add/modify properties, then add/apply new migration.

#### Seeding the Database
```csharp
modelBuilder.Entity<Blog>().HasData(new Blog { BlogId = 1, Name = "Seeded Blog" });
```

---

### Advanced Features

#### Using Azure Cosmos DB with EF Core
- Add package: `Microsoft.EntityFrameworkCore.Cosmos`
- Configure in `DbContext`:
    ```csharp
    options.UseCosmos("Cosmos_Connection_String", "DatabaseName");
    ```

#### Implementing AOT (Ahead-of-Time) Compilation
- Use .NET 8 AOT features for faster startup and lower memory usage (setup via project settings).

#### Working with SQL Server HierarchyId
- Map and use SQL Server's HierarchyId type for hierarchical data (requires `Microsoft.SqlServer.Types` package).

---

# Summary Tables

## Basic Concepts

| Topic            | One-line Definition                                        |
|------------------|-----------------------------------------------------------|
| EF Core 8.0      | Modern .NET ORM for working with databases via C# objects |
| DbContext        | Main class for interacting with the database               |
| Model            | C# class mapped to a database table                       |
| CRUD             | Create, Read, Update, Delete operations                   |
| LINQ             | Query language for .NET collections and EF Core           |

## Advanced Querying & Performance

| Topic             | One-line Definition                                      |
|-------------------|---------------------------------------------------------|
| Advanced LINQ     | Complex queries with joins, groups, subqueries          |
| Raw SQL           | Execute direct SQL statements in EF Core                 |
| Performance Tuning| Optimize queries with tracking, caching, pre-compiling   |
| Async Operations  | Use async/await for non-blocking database calls          |
| Concurrency       | Handle multi-user data updates safely                    |

## Model Building & Migrations

| Topic               | One-line Definition                                 |
|---------------------|----------------------------------------------------|
| Fluent API          | Configure models via code in OnModelCreating       |
| Data Annotations    | Use C# attributes for model configuration          |
| Relationships       | Define one-to-one, one-to-many, many-to-many links |
| Migrations          | Track and apply database schema changes             |
| Seeding             | Add initial data automatically                     |

## Advanced Features

| Topic               | One-line Definition                                 |
|---------------------|----------------------------------------------------|
| Azure Cosmos DB     | EF Core provider for NoSQL Azure Cosmos DB         |
| AOT Compilation     | Compile ahead-of-time for speed and efficiency     |
| HierarchyId         | SQL Server type for hierarchical data              |

---