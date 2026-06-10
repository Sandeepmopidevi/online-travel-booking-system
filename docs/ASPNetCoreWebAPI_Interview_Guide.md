# ASP.NET Core 8.0 Web API Interview Guide – Beginner-Friendly Project Examples

This guide explains ASP.NET Core Web API topics with simple, practical project-based examples for easy understanding.

---

## 1. Introduction and Basic Concepts

### Introduction to ASP.NET Core Web API
- **ASP.NET Core 8.0**: Modern, fast, cross-platform framework for building web APIs.
- **Benefits**: Fast, scalable, cross-platform, easy integration with modern tools.
- **RESTful Principles**: Uses standard HTTP methods (GET, POST, PUT, DELETE), stateless, resource-based URLs.

---

### Setting Up the Development Environment

#### Install .NET SDK and Visual Studio
- Download [.NET 8 SDK](https://dotnet.microsoft.com/download)
- Install [Visual Studio](https://visualstudio.microsoft.com/) or use VS Code

#### Create a new ASP.NET Core Web API project
```shell
dotnet new webapi -n MyWebApi
cd MyWebApi
```

#### Project Structure
- **Controllers/**: Where API logic lives (e.g., `WeatherForecastController.cs`)
- **Program.cs**: Starts the app
- **appsettings.json**: Configuration file

---

### Creating Your First Web API

#### Create a Controller and Actions
```csharp
[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase
{
    [HttpGet]
    public IActionResult GetAll() => Ok(new[] { "Apple", "Banana" });

    [HttpGet("{id}")]
    public IActionResult GetById(int id) => Ok($"Product {id}");

    [HttpPost]
    public IActionResult Create(string product) => Ok($"Created {product}");

    [HttpPut("{id}")]
    public IActionResult Update(int id, string product) => Ok($"Updated {id} to {product}");

    [HttpDelete("{id}")]
    public IActionResult Delete(int id) => Ok($"Deleted {id}");
}
```

- **Attributes** like `[HttpGet]`, `[HttpPost]` define routes and methods.

---

### Basic CRUD Operations with EF Core

#### Configure DbContext and Models
```csharp
public class Product
{
    public int Id { get; set; }
    public string Name { get; set; }
}
public class MyDbContext : DbContext
{
    public DbSet<Product> Products { get; set; }
    public MyDbContext(DbContextOptions<MyDbContext> options) : base(options) { }
}
```
Add to `Program.cs`:
```csharp
builder.Services.AddDbContext<MyDbContext>(options =>
    options.UseInMemoryDatabase("MyDb")); // In-memory for simplicity
```

#### CRUD Example in Controller
```csharp
[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase
{
    private readonly MyDbContext _db;
    public ProductsController(MyDbContext db) { _db = db; }

    [HttpGet]
    public IActionResult Get() => Ok(_db.Products.ToList());

    [HttpPost]
    public IActionResult Create(Product p) { _db.Products.Add(p); _db.SaveChanges(); return Ok(p); }

    [HttpPut("{id}")]
    public IActionResult Update(int id, Product p) { var prod = _db.Products.Find(id); if (prod == null) return NotFound(); prod.Name = p.Name; _db.SaveChanges(); return Ok(prod); }

    [HttpDelete("{id}")]
    public IActionResult Delete(int id) { var prod = _db.Products.Find(id); if (prod == null) return NotFound(); _db.Products.Remove(prod); _db.SaveChanges(); return Ok(); }
}
```

---

## 2. Advanced Routing and Model Binding

### Advanced Routing

#### Attribute Routing & Constraints
```csharp
[Route("api/products")]
public class ProductsController : ControllerBase
{
    [HttpGet("{id:int:min(1)}")]
    public IActionResult GetById(int id) => Ok($"Product {id}");
}
```
- `{id:int:min(1)}`: Only allows positive integers

#### Custom Route Conventions
- Custom conventions can be added in `Program.cs` for more advanced scenarios.

---

### Model Binding and Validation

#### Binding Complex Types
```csharp
public class ProductDto { public string Name { get; set; } }
[HttpPost]
public IActionResult Create(ProductDto dto) { ... }
```

#### Data Annotations for Validation
```csharp
public class ProductDto
{
    [Required]
    [StringLength(50)]
    public string Name { get; set; }
}
```
- Automatic validation errors returned

#### Custom Model Binders
- For custom parsing scenarios, implement `IModelBinder`.

---

### Error Handling and Logging

#### Global Exception Handling
- Add a custom middleware:
```csharp
app.UseExceptionHandler("/error"); // in Program.cs

app.Map("/error", (HttpContext http) =>
{
    return Results.Problem("An error occurred.");
});
```

#### Logging with Serilog or NLog
- Add NuGet package and configure in `Program.cs`:
```csharp
Log.Logger = new LoggerConfiguration().WriteTo.Console().CreateLogger();
builder.Host.UseSerilog();
```

---

## 3. Security and Authentication

### Authentication

#### JWT Authentication (Simple Example)
- Add `Microsoft.AspNetCore.Authentication.JwtBearer`
- Configure in `Program.cs`:
```csharp
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options => { options.TokenValidationParameters = ...; });
```
- Add `[Authorize]` on controllers/actions

#### ASP.NET Core Identity
- Add user registration, login, and role management features

#### OAuth2 and OpenID Connect
- Integrate with Google, Microsoft, etc. for login

---

### Authorization

#### Role-based
```csharp
[Authorize(Roles = "Admin")]
public IActionResult OnlyAdmin() { ... }
```

#### Policy-based
```csharp
builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("Over18", policy => policy.RequireClaim("Age", "18"));
});
[Authorize(Policy = "Over18")]
public IActionResult Over18Only() { ... }
```

#### Securing Endpoints & CORS
```csharp
app.UseCors(policy =>
    policy.WithOrigins("https://myfrontend.com").AllowAnyHeader().AllowAnyMethod());
```

#### Data Protection & Encryption
- Use `IDataProtector` for encrypting sensitive data

---

## 4. Advanced Features and Performance

### Versioning

#### API Versioning Strategies
- Use URL: `/api/v1/products`
- Use query string: `/api/products?api-version=1.0`
- Use headers: `api-version: 1.0`

#### Multiple Versions Example
- Add `Microsoft.AspNetCore.Mvc.Versioning`
- Configure in `Program.cs`:
```csharp
builder.Services.AddApiVersioning();
```

---

### Documentation with OpenAPI/Swagger

#### Setting up Swagger
- Already included in new webapi projects
- Enable in `Program.cs`:
```csharp
app.UseSwagger();
app.UseSwaggerUI();
```

#### Customizing Swagger UI
- Add descriptions, examples, and XML comments to enhance docs

---

### Performance Optimization

#### Caching
- **In-memory caching**:
    ```csharp
    builder.Services.AddMemoryCache();
    ```
- **Distributed caching**: Use Redis or SQL Server

#### Response Compression
- Add `Microsoft.AspNetCore.ResponseCompression`
- Enable in `Program.cs`:
```csharp
builder.Services.AddResponseCompression();
app.UseResponseCompression();
```

#### Profiling/Monitoring
- Use packages like MiniProfiler or Application Insights

---

## 5. Testing, Debugging, and Best Practices

### Unit Testing

#### Testing Controllers
- Use `xUnit` or `NUnit`
- Mock dependencies with Moq

```csharp
var mockDb = new Mock<MyDbContext>();
var controller = new ProductsController(mockDb.Object);
// Call controller methods and assert results
```

---

### Integration Testing

#### In-Memory Database
- Use `UseInMemoryDatabase` in test setup

#### TestServer Example
```csharp
var appFactory = new WebApplicationFactory<Program>();
var client = appFactory.CreateClient();
// Make HTTP calls to your API and assert responses
```

---

### Best Practices and Real-world Examples

- Use DTOs for API data
- Validate input and handle errors gracefully
- Use dependency injection everywhere
- Keep controllers thin, logic in services

---

# Summary Tables

## Basic Concepts

| Topic                | One-line Definition                                       |
|----------------------|----------------------------------------------------------|
| ASP.NET Core Web API | Framework for building RESTful APIs in .NET              |
| RESTful              | Uses HTTP verbs and resources for communication          |
| Controller           | Class handling API requests                              |
| Action               | Method in controller for a specific endpoint             |
| CRUD                 | Create, Read, Update, Delete operations                  |

## Advanced Routing & Model Binding

| Topic                | One-line Definition                                       |
|----------------------|----------------------------------------------------------|
| Attribute Routing    | Define routes using attributes on controllers/actions     |
| Route Constraints    | Limit route values (e.g., int only)                      |
| Model Binding        | Automatic mapping of request data to C# objects          |
| Validation           | Ensure request data is correct using attributes          |
| Custom Model Binder  | Custom logic for binding request data                    |

## Security

| Topic                | One-line Definition                                       |
|----------------------|----------------------------------------------------------|
| JWT Authentication   | Token-based user authentication                          |
| ASP.NET Core Identity| Built-in user/role management                            |
| OAuth2/OpenID Connect| External provider authentication                         |
| Authorization        | Restrict access based on user roles/policies             |
| CORS                 | Allow cross-origin requests                              |

## Advanced Features & Performance

| Topic                | One-line Definition                                       |
|----------------------|----------------------------------------------------------|
| API Versioning       | Support multiple API versions                             |
| Swagger/OpenAPI      | Auto-generate API documentation                           |
| Caching              | Temporarily store data for faster responses               |
| Compression          | Reduce response size and speed up delivery                |
| Profiling/Monitoring | Measure and improve API performance                       |

## Testing & Best Practices

| Topic                | One-line Definition                                       |
|----------------------|----------------------------------------------------------|
| Unit Testing         | Test individual methods or controllers                    |
| Integration Testing  | Test the whole API end-to-end                             |
| Moq                  | Mock dependencies for testing                             |
| TestServer           | Host the API in memory for tests                          |
| Best Practices       | Follow standards for clean, maintainable APIs             |

---