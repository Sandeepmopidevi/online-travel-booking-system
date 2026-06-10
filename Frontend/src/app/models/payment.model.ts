export interface Payment {
  bookingId: number;
  userId: number;
  amount: number;
  status: string;
  paymentMethod: string;
  paymentId: number;
}

export interface PaymentDTO {
  bookingId: number;
  userId: number;
  amount: number;
  status: string;
  paymentMethod: string;
}
