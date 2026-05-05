import { Column, Entity, PrimaryColumn } from 'typeorm';
import { AppRole } from '../../contracts/api-contracts';

export enum Role {
  SUPERADMIN = AppRole.SUPERADMIN,
  TRAVELLER = AppRole.TRAVELLER,
  GUIDE = AppRole.GUIDE,
  TECHADMIN = AppRole.TECHADMIN,
  NONTECHADMIN = AppRole.NONTECHADMIN,
  HOTEL = AppRole.HOTEL,
  EXPERIENCE = AppRole.EXPERIENCE,
}

@Entity({ name: 'users' })
export class Auth {
  @PrimaryColumn({ name: 'id', type: 'varchar' })
  userId!: string;

  @Column({ unique: true })
  username!: string;

  @Column()
  password!: string;

  @Column({ type: 'varchar' })
  role!: Role;

  @Column()
  name!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  phone!: string;

  @Column({ default: 'active' })
  status!: 'active' | 'inactive';
}
