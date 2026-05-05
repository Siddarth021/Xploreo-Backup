export enum Duration {
  TWO_DAYS_ONE_NIGHT = '2 Days / 1 Night',
  THREE_DAYS_TWO_NIGHTS = '3 Days / 2 Nights',
  FOUR_DAYS_THREE_NIGHTS = '4 Days / 3 Nights',
  FIVE_DAYS_FOUR_NIGHTS = '5 Days / 4 Nights',
  SEVEN_DAYS_SIX_NIGHTS = '7 Days / 6 Nights',
  TEN_DAYS_NINE_NIGHTS = '10 Days / 9 Nights',
  TWELVE_DAYS_ELEVEN_NIGHTS = '12 Days / 11 Nights',
  FIFTEEN_DAYS_FOURTEEN_NIGHTS = '15 Days / 14 Nights',
}

export enum Availability {
  A = 'Available',
  NA = 'Not Available',
}

export enum TripCategory {
  ADVENTURE = 'Adventure',
  FAMILY = 'Family',
  INTERNATIONAL = 'International',
  WEEKEND_GETAWAY = 'Weekend Getaway',
  LUXURY = 'Luxury',
  HONEYMOON = 'Honeymoon',
  PILGRIMAGE = 'Pilgrimage',
}

export class Plan {
  planId!: string;
  title!: string;
  desc!: string;
  price!: number;
  duration!: Duration;
  destination!: string;
  location!: string[];
  category!: TripCategory;
  availability!: Availability;
}
