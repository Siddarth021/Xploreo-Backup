import { Column, Entity, PrimaryColumn } from 'typeorm';

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

@Entity({ name: 'trips' })
export class Trip {
  @PrimaryColumn({ type: 'varchar' })
  id!: string;

  @Column()
  travellerId!: string;

  @Column()
  guideId!: string;

  @Column()
  planId!: string;

  @Column()
  title!: string;

  @Column()
  destination!: string;

  @Column()
  location!: string;

  @Column()
  startDate!: string;

  @Column()
  endDate!: string;

  @Column()
  status!: TripStatus;

  @Column('float')
  amount!: number;

  @Column('int')
  guests!: number;

  @Column()
  durationLabel!: string;

  @Column()
  type!: TripType;

  @Column('simple-json')
  itinerary!: Array<{
    day: string;
    title: string;
    detail: string;
  }>;

  @Column({ type: 'text', nullable: true })
  currentLocation!: string;

  @Column('simple-json')
  paymentBreakdown!: {
    flights: number;
    stay: number;
    activities: number;
    guide: number;
  };

  @Column('simple-json')
  documents!: Array<{
    id: string;
    title: string;
    status: string;
  }>;
}
