export interface Package {
  packageID?: number;
  name: string;
  includedHotels: string;
  includedFlights: string;
  activities: string;
  price: number;
  itineraries: any[]; 
}