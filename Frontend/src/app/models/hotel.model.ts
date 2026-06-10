export interface Hotel {
  hotelID: number;
  name: string;
  location: string;
  image?: string;  
  roomsAvailable: number;
  rating: number;
  pricePerNight: number;
}