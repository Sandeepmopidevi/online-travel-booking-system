export interface User {
  userId: number;
  name: string;
  email: string;
  password: string;
  role: string;
  contactNumber: string;
}

export interface UserDTO {
  name: string;
  email: string;
  password: string;
  role: string;
  contactNumber: string;
}
export interface UpdateUserNameContactDto {
  name: string;
  contactNumber: string;
}