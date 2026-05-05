export enum AppRole {
  SUPERADMIN = 'superadmin',
  TRAVELLER = 'traveller',
  GUIDE = 'guide',
  TECHADMIN = 'techadmin',
  NONTECHADMIN = 'nontechadmin',
  HOTEL = 'hotel',
  EXPERIENCE = 'experience',
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  timestamp: string;
}

export interface AppUser {
  id: string;
  username: string;
  role: AppRole;
  name: string;
  email: string;
  phone: string;
  status: 'active' | 'inactive';
}

export interface AuthLoginRequest {
  username: string;
  password: string;
}

export interface AuthLoginResponse {
  token: string;
  user: AppUser;
  headers: {
    'x-user-id': string;
    'x-user-role': AppRole;
  };
}

export interface HotelRecord {
  id: string;
  name: string;
  city: string;
  location: string;
  description: string;
  stars: number;
  rating: number;
  reviewCount: number;
  pricePerNight: number;
  taxesAndFees: number;
  image: string;
  amenities: string[];
  status: 'active' | 'inactive';
}

export interface ExperienceSlot {
  id: string;
  date: string;
  time: string;
  booked: number;
  capacity: number;
  available: boolean;
}

export interface ExperienceRecord {
  id: string;
  title: string;
  description: string;
  destination: string;
  category: string;
  availability: 'available' | 'unavailable';
  price: number;
  durationHours: number;
  capacity: number;
  booked: number;
  image: string;
  nextSlot: string;
  slots: ExperienceSlot[];
}

export interface PlanRecord {
  id: string;
  title: string;
  description: string;
  originCity: string;
  destination: string;
  durationNights: number;
  pricePerPerson: number;
  hotelStars: number;
  includesFlight: boolean;
  image: string;
  tags: string[];
  itinerary: Array<{
    day: string;
    title: string;
    detail: string;
  }>;
}

export interface TripRecord {
  id: string;
  travellerId: string;
  guideId: string;
  planId: string;
  title: string;
  destination: string;
  location: string;
  startDate: string;
  endDate: string;
  status: 'upcoming' | 'completed' | 'cancelled' | 'ongoing';
  amount: number;
  guests: number;
  durationLabel: string;
  type: 'package' | 'hotel' | 'experience' | 'flight';
  itinerary: Array<{
    day: string;
    title: string;
    detail: string;
  }>;
  currentLocation: string | null;
  paymentBreakdown: {
    flights: number;
    stay: number;
    activities: number;
    guide: number;
  };
  documents: Array<{
    id: string;
    title: string;
    status: string;
  }>;
}
