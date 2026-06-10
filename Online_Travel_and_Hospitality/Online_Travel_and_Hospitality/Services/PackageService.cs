using Microsoft.EntityFrameworkCore;
using Online_Travel_and_Hospitality.Data;
using Online_Travel_and_Hospitality.Interfaces;
using Online_Travel_and_Hospitality.Models.Domain;
using Online_Travel_and_Hospitality.Models.DTO;

namespace Online_Travel_and_Hospitality.Services
{
    public class PackageService : IPackageService
    {
        private readonly ApplicationDbContext _context;

        public PackageService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Package> CreatePackageAsync(PackageDTO packageDTO)
        {
            var package = new Package
            {
                Name = packageDTO.Name,
                IncludedHotels = packageDTO.IncludedHotels,
                IncludedFlights = packageDTO.IncludedFlights,
                Activities = packageDTO.Activities,
                Price = packageDTO.Price
            };
            _context.Packages.Add(package);
            await _context.SaveChangesAsync();
            return package;
        }

        public async Task<IEnumerable<Package>> GetPackagesAsync()
        {
            return await _context.Packages.ToListAsync();
        }

        public async Task<Package?> GetPackageByIdAsync(int id)
        {
            return await _context.Packages.FindAsync(id);
        }

        public async Task<Package?> UpdatePackageAsync(int id, PackageDTO packageDTO)
        {
            var package = await _context.Packages.FindAsync(id);
            if (package == null)
                return null;

            package.Name = packageDTO.Name;
            package.IncludedHotels = packageDTO.IncludedHotels;
            package.IncludedFlights = packageDTO.IncludedFlights;
            package.Activities = packageDTO.Activities;
            package.Price = packageDTO.Price;

            _context.Entry(package).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return package;
        }

        public async Task<bool> DeletePackageAsync(int id)
        {
            var package = await _context.Packages.FindAsync(id);
            if (package == null)
                return false;

            _context.Packages.Remove(package);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<IEnumerable<Package>> SearchPackagesAsync(string name)
        {
            var query = _context.Packages.AsQueryable();
            if (!string.IsNullOrWhiteSpace(name))
            {
                query = query.Where(p => p.Name.Contains(name));
            }
            return await query.ToListAsync();
        }
    }
}