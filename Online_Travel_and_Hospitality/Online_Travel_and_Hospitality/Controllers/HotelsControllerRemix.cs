using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AutoMapper;
using Online_Travel_and_Hospitality.Data;
using Online_Travel_and_Hospitality.Models.Domain;
using Online_Travel_and_Hospitality.Models.DTO;

namespace Online_Travel_and_Hospitality.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HotelsControllerRemix : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public HotelsControllerRemix(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpPost]
        [Route("CreateHotels")]
        [Authorize(Roles = "Admin, Hotel Manager")]
        public async Task<ActionResult<HotelDTO>> CreateHotels(HotelDTO hotelDTO)
        {
            var hotel = _mapper.Map<Hotel>(hotelDTO);
            _context.Hotels.Add(hotel);
            await _context.SaveChangesAsync();
            var createdHotelDTO = _mapper.Map<HotelDTO>(hotel);
            return Ok(createdHotelDTO);
        }

        [HttpGet]
        [Route("GetHotels")]
        [Authorize(Roles = "Admin, Traveller, Hotel Manager")]
        public async Task<ActionResult<IEnumerable<HotelDTO>>> GetHotels()
        {
            var hotels = await _context.Hotels.Include(h => h.Reviews).ToListAsync();
            var hotelDTOs = hotels.Select(hotel => {
                var dto = _mapper.Map<HotelDTO>(hotel);
                return dto;
            }).ToList();

            return Ok(hotelDTOs);
        }

        [HttpGet]
        [Route("GetHotel/{id}")]
        [Authorize(Roles = "Admin, Hotel Manager")]
        public async Task<ActionResult<HotelDTO>> GetHotel(int id)
        {
            var hotel = await _context.Hotels.Include(h => h.Reviews).FirstOrDefaultAsync(h => h.HotelID == id);
            if (hotel == null)
            {
                return NotFound(new { message = "Hotel not found" });
            }

            var dto = _mapper.Map<HotelDTO>(hotel);

            return Ok(dto);
        }

        [HttpPut]
        [Route("UpdateHotel/{id}")]
        [Authorize(Roles = "Admin, Hotel Manager")]
        public async Task<IActionResult> UpdateHotel(int id, HotelDTO hotelDTO)
        {
            var hotel = await _context.Hotels.FindAsync(id);
            if (hotel == null)
            {
                return NotFound();
            }

            _mapper.Map(hotelDTO, hotel);
            _context.Entry(hotel).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            var updatedHotelDTO = _mapper.Map<HotelDTO>(hotel);
            return Ok(updatedHotelDTO);
        }

        [HttpDelete]
        [Route("DeleteHotel/{id}")]
        [Authorize(Roles = "Admin, Hotel Manager")]
        public async Task<IActionResult> DeleteHotel(int id)
        {
            var hotel = await _context.Hotels.FindAsync(id);
            if (hotel == null)
            {
                return NotFound(new { message = "Hotel not found" });
            }

            _context.Hotels.Remove(hotel);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Hotel deleted successfully" });
        }

        [HttpGet]
        [Route("SearchHotels")]
        [Authorize(Roles = "Admin, Traveller, Hotel Manager, Travel Agent")]
        public async Task<ActionResult<IEnumerable<HotelDTO>>> SearchHotels([FromQuery] string name, [FromQuery] string location)
        {
            var query = _context.Hotels.Include(h => h.Reviews).AsQueryable();
            if (!string.IsNullOrEmpty(name))
                query = query.Where(h => h.Name.Contains(name));
            if (!string.IsNullOrEmpty(location))
                query = query.Where(h => h.Location.Contains(location));

            var hotels = await query.ToListAsync();
            var hotelDTOs = hotels.Select(hotel => {
                var dto = _mapper.Map<HotelDTO>(hotel);
                return dto;
            }).ToList();

            return Ok(hotelDTOs);
        }
    }
}