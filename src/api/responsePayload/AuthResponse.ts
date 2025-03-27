export interface AuthResponse {
  refresh: string;
  access: string;
}

export interface UserResponse {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  is_superuser: boolean;
  is_staff: boolean;
  language_preference: number;
}