using AutoMapper;
using Online_Travel_and_Hospitality.Models.Domain;
using Online_Travel_and_Hospitality.Models.DTO;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<Hotel, HotelDTO>().ReverseMap();
        CreateMap<Review, HotelReviewDTO>().ReverseMap();
    }
}