using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Online_Travel_and_Hospitality.Interfaces;
using Online_Travel_and_Hospitality.Models.DTO;

namespace Online_Travel_and_Hospitality.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PackageController : ControllerBase
    {
        private readonly IPackageService _packageService;

        public PackageController(IPackageService packageService)
        {
            _packageService = packageService;
        }

        [HttpPost]
        [Route("CreatePackage")]
        [Authorize(Roles = "Admin, Traveller, Travel Agent")]
        public async Task<IActionResult> CreatePackage(PackageDTO package)
        {
            var created = await _packageService.CreatePackageAsync(package);
            return Ok(created);
        }

        [HttpGet]
        [Route("GetPackages")]
        [Authorize(Roles = "Admin,Traveller,Travel Agent")]
        public async Task<IActionResult> GetPackages()
        {
            var packages = await _packageService.GetPackagesAsync();
            return Ok(packages);
        }

        [HttpGet]
        [Route("GetPackage/{id}")]
        [Authorize(Roles = "Admin, Traveller, Travel Agent")]
        public async Task<IActionResult> GetPackage(int id)
        {
            var package = await _packageService.GetPackageByIdAsync(id);
            if (package == null)
                return NotFound(new { message = "Package not found" });
            return Ok(package);
        }

        [HttpPut]
        [Route("UpdatePackage/{id}")]
        [Authorize(Roles = "Admin, Travel Agent")]
        public async Task<IActionResult> UpdatePackage(int id, PackageDTO packageDTO)
        {
            var updated = await _packageService.UpdatePackageAsync(id, packageDTO);
            if (updated == null)
                return NotFound(new { message = "Package not found" });
            return Ok(updated);
        }

        [HttpDelete]
        [Route("DeletePackage/{id}")]
        [Authorize(Roles = "Admin, Travel Agent")]
        public async Task<IActionResult> DeletePackage(int id)
        {
            var result = await _packageService.DeletePackageAsync(id);
            if (!result)
                return NotFound(new { message = "Package not found" });
            return Ok(new { message = "Package deleted successfully" });
        }

        [HttpGet]
        [Route("SearchPackages")]
        [Authorize(Roles = "Admin, Traveller, Travel Agent")]
        public async Task<IActionResult> SearchPackages([FromQuery] string name)
        {
            var packages = await _packageService.SearchPackagesAsync(name);
            return Ok(packages);
        }
    }
}