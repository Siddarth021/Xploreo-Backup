import { Column, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm';

@Entity('app_state')
export class AppState {
  @PrimaryColumn()
  key: string;

  @Column({ type: 'simple-json', nullable: true })
  value: unknown;

  @UpdateDateColumn()
  updatedAt: Date;
}
