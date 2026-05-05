import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'plans' })
export class Plan {
  @PrimaryColumn({ type: 'varchar' })
  id!: string;

  @Column()
  title!: string;

  @Column('text')
  description!: string;

  @Column()
  originCity!: string;

  @Column()
  destination!: string;

  @Column('int')
  durationNights!: number;

  @Column('float')
  pricePerPerson!: number;

  @Column('int')
  hotelStars!: number;

  @Column({ default: true })
  includesFlight!: boolean;

  @Column()
  image!: string;

  @Column('simple-json')
  tags!: string[];

  @Column('simple-json')
  itinerary!: Array<{
    day: string;
    title: string;
    detail: string;
  }>;
}
