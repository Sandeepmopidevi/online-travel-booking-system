# Program.cs Line-by-Line Explanation – Online Travel and Hospitality Booking System

## 1. **Using Directives**
```csharp
using Online_Travel_and_Hospitality.Data;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Text;
using Online_Travel_and_Hospitality.Services;
using Online_Travel_and_Hospitality.Interfaces;
using Online_Travel_and_Hospitality.Repository.Implementations;
using System.Text.Json.Serialization;
using AutoMapper;
using Online_Travel_and_Hospitality;
````

* These `using` statements import required namespaces, including EF Core, Identity, Swagger, JWT, AutoMapper, etc.

---

## 2. **Builder Initialization**

```csharp
var builder = WebApplication.CreateBuilder(args);
```

* Initializes the application builder for configuring services and middleware.

---

## 3. **Controllers & JSON Config**

```csharp
builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
    });
```

* Registers controllers.
* Prevents infinite JSON loops from circular references (e.g., EF Core relationships).

---

## 4. **Swagger for API Documentation**

```csharp
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options => {
    ...
});
```

* Enables Swagger generation and configures JWT support inside Swagger UI.

---

## 5. **Database Context Configuration**

```csharp
builder.Services.AddDbContext<ApplicationDbContext>(...);
builder.Services.AddDbContext<AuthDbContext>(...);
```

* Configures EF Core with SQL Server.
* Separates main app DB and authentication DB.

---

## 6. **Dependency Injection for Services**

### Scoped Services (New instance per HTTP request)

```csharp
builder.Services.AddScoped<ITokenRepository, TokenRepository>();
builder.Services.AddScoped<IPhoneSyncing, PhoneSyncing>();
builder.Services.AddScoped<IInvoiceService, InvoiceService>();
builder.Services.AddScoped<IAuthService, AuthService>();
...
```

### Hosted Background Service

```csharp
builder.Services.AddHostedService<PhoneSyncingBackgroundService>();
```

* Runs continuously in background (like syncing calls).

### Transient Service (New instance every time)

```csharp
builder.Services.AddTransient<EmailService>();
```

### AutoMapper Registration

```csharp
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
```

* Scans and registers mapping profiles across the project.

---

## 7. **ASP.NET Core Identity Setup**

```csharp
builder.Services.AddIdentityCore<IdentityUser>()
    .AddRoles<IdentityRole>()
    .AddEntityFrameworkStores<AuthDbContext>()
    .AddDefaultTokenProviders();
```

* Registers Identity for user authentication and role management.

### Custom Password Policies

```csharp
builder.Services.Configure<IdentityOptions>(options =>
{
    ...
});
```

---

## 8. **CORS Policy for Angular Frontend**

```csharp
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngularOrigins", policy =>
    {
        policy.WithOrigins("http://localhost:4200", ...)
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();
    });
});
```

* Enables cross-origin communication with Angular frontend.

---

## 9. **JWT Authentication Setup**

```csharp
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options => {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ...
        };
    });
```

* Sets up JWT authentication using `Issuer`, `Audience`, and `SigningKey`.

---

## 10. **Application Build and Middleware Configuration**

```csharp
var app = builder.Build();
```

### Swagger Middleware (Development Only)

```csharp
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
```

### HTTPS Redirection

```csharp
app.UseHttpsRedirection();
```

### CORS

```csharp
app.UseCors("AllowAngularOrigins");
```

### Authentication & Authorization

```csharp
app.UseAuthentication();
app.UseAuthorization();
```

### Controller Routing

```csharp
app.MapControllers();
```

### Run Application

```csharp
app.Run();
```

---

## Service Lifetimes: Singleton vs Scoped vs Transient

| Lifetime  | Description                             | Example Use Case            | Drawbacks                                              |
| --------- | --------------------------------------- | --------------------------- | ------------------------------------------------------ |
| Singleton | One instance for the entire application | Caching, configuration      | Not good for stateful/data-sensitive services          |
| Scoped    | One instance per HTTP request           | Database operations         | Not suitable for background tasks                      |
| Transient | New instance every time requested       | Lightweight stateless tasks | May cause performance issues if heavy objects are used |

---

## 🔍 Interview Questions & Answers

### 1. **What is the difference between `AddScoped`, `AddSingleton`, and `AddTransient`?**

* `AddScoped`: One instance per HTTP request.
* `AddSingleton`: One instance for the whole application lifetime.
* `AddTransient`: New instance each time requested.

---

### 2. **Why do we use `ReferenceHandler.IgnoreCycles` in JSON serialization?**

* To avoid `JsonException` due to object reference loops in navigation properties.

---

### 3. **What is the purpose of `UseSwagger` and `UseSwaggerUI()`?**

* `UseSwagger`: Generates the OpenAPI spec.
* `UseSwaggerUI()`: Provides a web interface for testing APIs.

---

### 4. **What are the advantages of using JWT for authentication?**

* Stateless and scalable.
* Works well across microservices.
* No need to store session data on the server.

---

### 5. **What is the use of `AddIdentityCore` and how is it different from `AddIdentity`?**

* `AddIdentityCore`: Lightweight and more customizable.
* `AddIdentity`: Comes with default UI and cookie-based auth setup.

---

### 6. **Why do we use AutoMapper?**

* To simplify mapping between DTOs and Entity models, reducing boilerplate code.

---

### 7. **What is the use of `AddHostedService` in .NET Core?**

* Registers background services that run continuously (e.g., syncing, logging).

---

### 8. **What does `app.MapControllers()` do?**

* Maps controller actions to their respective routes based on attributes.

---

### 9. **What is the difference between `UseAuthentication()` and `UseAuthorization()`?**

* `UseAuthentication()`: Validates the user’s identity (JWT token).
* `UseAuthorization()`: Verifies whether the user has access to the resource.

---

### 10. **How does CORS help in development?**

* Prevents browser security errors when Angular (frontend) calls ASP.NET Core APIs hosted on a different port/domain.

---