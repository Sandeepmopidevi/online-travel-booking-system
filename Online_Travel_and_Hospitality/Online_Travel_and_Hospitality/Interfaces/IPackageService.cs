using Online_Travel_and_Hospitality.Models.Domain;
using Online_Travel_and_Hospitality.Models.DTO;

namespace Online_Travel_and_Hospitality.Interfaces
{
    public interface IPackageService
    {
        Task<Package> CreatePackageAsync(PackageDTO packageDTO);
        Task<IEnumerable<Package>> GetPackagesAsync();
        Task<Package?> GetPackageByIdAsync(int id);
        Task<Package?> UpdatePackageAsync(int id, PackageDTO packageDTO);
        Task<bool> DeletePackageAsync(int id);
        Task<IEnumerable<Package>> SearchPackagesAsync(string name);
    }
}