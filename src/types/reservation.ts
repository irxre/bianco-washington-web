
export interface Reservation {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  date: string;
  time: string;
  guests: number;
  special_requests?: string;
  status?: 'pending' | 'confirmed' | 'cancelled';
  created_at?: string;
  updated_at?: string;
}

export interface ReservationInsert {
  name: string;
  email: string;
  phone?: string;
  date: string;
  time: string;
  guests: number;
  special_requests?: string;
}
