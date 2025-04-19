export interface User {
    id: string;
    name: string;
    email: string;
    role: 'Admin' | 'Traveler' | 'Hotel Manager' | 'Travel Agent';
  }