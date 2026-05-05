import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'hotels' })
export class Hotel {
  @PrimaryColumn({ type: 'varchar' })
  id!: string;

  @Column()
  name!: string;

  @Column()
  city!: string;

  @Column()
  location!: string;

  @Column('text')
  description!: string;

  @Column('int')
  stars!: number;

  @Column('float')
  rating!: number;

  @Column('int')
  reviewCount!: number;

  @Column('float')
  pricePerNight!: number;

  @Column('float', { default: 0 })
  taxesAndFees!: number;

  @Column()
  image!: string;

  @Column('simple-json')
  amenities!: string[];

  @Column({ default: 'active' })
  status!: 'active' | 'inactive';
}
