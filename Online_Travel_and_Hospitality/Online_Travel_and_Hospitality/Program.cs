using Online_Travel_and_Hospitality.Data;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Text;
using Online_Travel_and_Hospitality.Services;
using Online_Travel_and_Hospitality.Interfaces;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

// Add controllers and configure JSON options to ignore cycles
builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
    });

// Add Swagger/OpenAPI support
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    // Configure Swagger to use JWT Bearer authentication
    options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Name = "Authorization",
        Type = SecuritySchemeType.Http,
        Scheme = "Bearer",
        BearerFormat = "JWT",
        In = ParameterLocation.Header,
        Description = "Enter your token in the text input below.\n\nExample: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'"
    });

    options.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            Array.Empty<string>()
        }
    });
});


// Database Configuration

// Main application database context
builder.Services.AddDbContext<ApplicationDbContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("ConnectionString"));
});

// Auth database context
builder.Services.AddDbContext<AuthDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("ConnectionString2")));

// Dependency Injection for Services

// Token Repository
builder.Services.AddScoped<ITokenRepository, TokenRepository>();

// Phone syncing service and background service
builder.Services.AddScoped<IPhoneSyncing, PhoneSyncing>();
builder.Services.AddHostedService<PhoneSyncingBackgroundService>();

// Invoice Service
builder.Services.AddScoped<IInvoiceService, InvoiceService>();

// Email Service (transient)
builder.Services.AddTransient<EmailService>();

// AutoMapper registration (scans all assemblies)
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

// Authentication and Authorization Services
builder.Services.AddScoped<IAuthService, AuthService>();

// Booking Services
builder.Services.AddScoped<IBookingService, BookingService>();

// Flight & Flight Review Services
builder.Services.AddScoped<IFlightService, FlightService>();
builder.Services.AddScoped<IFlightReviewService, FlightReviewService>();

// Hotel & Hotel Review Services
builder.Services.AddScoped<IHotelService, HotelService>();
builder.Services.AddScoped<IHotelReviewService, HotelReviewService>();

// Itinerary Services
builder.Services.AddScoped<IItineraryService, ItineraryService>();

// Package & Package Review Services
builder.Services.AddScoped<IPackageService, PackageService>();
builder.Services.AddScoped<IPackageReviewService, PackageReviewService>();

// Payment Services
builder.Services.AddScoped<IPaymentService, PaymentService>();

// Support Ticket Services
builder.Services.AddScoped<ISupportTicketService, SupportTicketService>();

// User Services
builder.Services.AddScoped<IUserService, UserService>();


// Identity Configuration
// Configure ASP.NET Core Identity with custom password requirements
builder.Services.AddIdentityCore<IdentityUser>()
    .AddRoles<IdentityRole>()
    .AddEntityFrameworkStores<AuthDbContext>()
    .AddDefaultTokenProviders();

builder.Services.Configure<IdentityOptions>(options =>
{
    options.Password.RequireDigit = false;
    options.Password.RequireLowercase = false;
    options.Password.RequireNonAlphanumeric = false;
    options.Password.RequireUppercase = false;
    options.Password.RequiredLength = 6;
    options.Password.RequiredUniqueChars = 1;
});


// CORS Policy Configuration
// Allow Angular frontend from specific localhost origins
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngularOrigins", policy =>
    {
        policy.WithOrigins(
                "http://localhost:4200",
                "http://localhost:4201",
                "http://localhost:4202",
                "http://localhost:4203",
                "http://localhost:4204"
            )
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials();
    });
});

// JWT Authentication Configuration

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidAudience = builder.Configuration["Jwt:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
        };
    });

//  Pipeline Configuration
var app = builder.Build();

// Middleware Components starts

// 1. Swagger (only in development)
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();      // Middleware: Swagger document generator
    app.UseSwaggerUI();    // Middleware: Swagger UI
}

// 2. HTTPS Redirection
app.UseHttpsRedirection(); // Middleware: Redirect HTTP to HTTPS

// 3. CORS Policy
app.UseCors("AllowAngularOrigins"); // Middleware: CORS

// 4. Authentication
app.UseAuthentication(); // Middleware: Authenticate users

// 5. Authorization
app.UseAuthorization(); // Middleware: Authorize users

// 6. Routing to controllers
app.MapControllers(); // Middleware: Endpoint Routing

// Middleware Ends

// Pipeline execution starts here
app.Run();