export enum TripStatus {
  PLANNED = 'Planned',
  ACTIVE = 'Active',
  COMPLETED = 'Completed',
  CANCELLED = 'Cancelled',
}

export class Trip {
  tripId!: string;
  travellerId!: string;
  planId!: string;
  guideId!: string;
  sourceCity!: string;
  destCity!: string;
  servicePartners!: string[];
  locations!: string[];
  startDate!: string;
  endDate!: string;
  status!: TripStatus;
  totalCost!: number;
}
