export enum TripStatus {
  UPCOMING = 'upcoming',
  ONGOING = 'ongoing',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

export enum TripType {
  PACKAGE = 'package',
  HOTEL = 'hotel',
  EXPERIENCE = 'experience',
  FLIGHT = 'flight',
}

export class Trip {
  id!: string;
  travellerId!: string;
  guideId!: string;
  planId!: string;
  title!: string;
  destination!: string;
  location!: string;
  startDate!: string;
  endDate!: string;
  status!: TripStatus;
  amount!: number;
  guests!: number;
  durationLabel!: string;
  type!: TripType;
  itinerary!: Array<{
    day: string;
    title: string;
    detail: string;
  }>;
  currentLocation!: string | null;
  paymentBreakdown!: {
    flights: number;
    stay: number;
    activities: number;
    guide: number;
  };
  documents!: Array<{
    id: string;
    title: string;
    status: string;
  }>;
}
