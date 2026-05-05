export class Plan {
  id!: string;
  title!: string;
  description!: string;
  originCity!: string;
  destination!: string;
  durationNights!: number;
  pricePerPerson!: number;
  hotelStars!: number;
  includesFlight!: boolean;
  image!: string;
  tags!: string[];
  itinerary!: Array<{
    day: string;
    title: string;
    detail: string;
  }>;
}
