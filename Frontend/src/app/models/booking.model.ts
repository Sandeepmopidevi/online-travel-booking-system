export interface Booking {
  bookingID: number;
  userID: number;
  hotelId?: number;
  packageId?: number;
  flightId?: number;
  hotelName?: string;
  packageName?: string;
  flightName?: string;
  checkInDate?: string;
  checkOutDate?: string;
  status: string;
  type: string; // 'Hotel', 'Package', or 'Flight'
  paymentId: number;
  totalAmount: number;
  totalPrice?: number;
}

export interface BookingDTO {
  userID: number;
  hotelId?: number;
  packageId?: number;
  flightId?: number;
  checkInDate?: string;
  checkOutDate?: string;
  totalAmount?: number;
  status: string;
  paymentId: number;
  type: string;
}