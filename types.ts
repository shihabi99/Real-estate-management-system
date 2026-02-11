export interface User {
  username: string;
  role: 'admin'; // The logged-in session user is always admin
}

export type UserRole = 'owner' | 'tenant';

export interface SystemUser {
  id: string;
  name: string;
  role: UserRole;
  email?: string;
  phone?: string;
  password?: string;
}

export interface Apartment {
  id: string;
  unitNumber: string;
  floor: string;
  status: 'vacant' | 'occupied';
  ownerId?: string; // Optional reference to a SystemUser with role 'owner'
}

export interface Building {
  id: string;
  name: string;
  location: string;
  apartments: Apartment[];
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
}