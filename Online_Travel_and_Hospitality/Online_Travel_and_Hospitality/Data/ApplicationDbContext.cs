using Microsoft.EntityFrameworkCore;
using Online_Travel_and_Hospitality.Models.Domain;

namespace Online_Travel_and_Hospitality.Data
{   
    // Class that manages Database interactions
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

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

        //Method that sets up the model and relationships between entities
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Setting the decimal precision for Payment Amount
            modelBuilder.Entity<Payment>()
                .Property(p => p.Amount)
                .HasPrecision(18, 2);

            // Defining Foreign key Relationships
            modelBuilder.Entity<SupportTicket>()
                .HasOne(c => c.User)
                .WithMany(p => p.SupportTickets)
                .HasForeignKey(c => c.UserID);

            modelBuilder.Entity<Review>()
                .HasOne(h => h.Hotel)
                .WithMany(r => r.Reviews)
                .HasForeignKey(r => r.HotelId);

            modelBuilder.Entity<Review>()
                .HasOne(u => u.User)
                .WithMany(r => r.Reviews)
                .HasForeignKey(r => r.UserID);

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

            modelBuilder.Entity<Booking>()
                .HasOne(b => b.User)
                .WithMany(u => u.Bookings)
                .HasForeignKey(b => b.UserID);

            modelBuilder.Entity<Payment>()
                .HasOne(p => p.User)
                .WithMany(u => u.Payments)
                .HasForeignKey(p => p.UserId);

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


