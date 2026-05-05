export enum Role {
  SUPERADMIN = 'Super Admin',
  TRAVELLER = 'Traveller',
  GUIDE = 'Guide',
  TECHADMIN = 'Tech Admin',
  NONTECHADMIN = 'Non Tech Admin',
  HOTEL = 'Hotel',
  EXPERIENCES = 'Experiences',
}

export class Auth {
  userId!: string;
  username!: string;
  password!: string;
  role!: Role;
}
