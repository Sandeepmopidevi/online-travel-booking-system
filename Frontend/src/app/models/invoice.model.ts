export interface Invoice {
  invoiceID?: number;
  totalAmount: number;
  timestamp: string;
  userID: number;
  bookingId: number;
}