export interface Review {
    reviewId: number;
    rating: number;
    comment: string;
    timestamp: string;
    userID?: number;
    hotelId?: number;
    packageId?: number;
    flightId?: number;
    [key: string]: any;
    type?: string; 
  }