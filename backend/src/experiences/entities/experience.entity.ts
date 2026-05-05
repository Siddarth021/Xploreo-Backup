import { Column, Entity, PrimaryColumn } from 'typeorm';

export enum ExperienceCategory {
  ADVENTURE = 'adventure',
  CULTURAL = 'culture',
  CULINARY = 'culinary',
  WELLNESS = 'wellness',
  WILDLIFE = 'wildlife',
  PHOTOGRAPHY = 'photography',
}

export enum ExperienceAvailability {
  AVAILABLE = 'available',
  NOT_AVAILABLE = 'unavailable',
}

@Entity({ name: 'experiences' })
export class Experience {
  @PrimaryColumn({ type: 'varchar' })
  id!: string;

  @Column()
  title!: string;

  @Column('text')
  description!: string;

  @Column()
  destination!: string;

  @Column()
  category!: ExperienceCategory;

  @Column()
  availability!: ExperienceAvailability;

  @Column('float')
  price!: number;

  @Column('int')
  durationHours!: number;

  @Column('int')
  capacity!: number;

  @Column('int')
  booked!: number;

  @Column()
  image!: string;

  @Column()
  nextSlot!: string;

  @Column('simple-json')
  slots!: Array<{
    id: string;
    date: string;
    time: string;
    booked: number;
    capacity: number;
    available: boolean;
  }>;
}
