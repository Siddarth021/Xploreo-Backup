export class Hotel {
  id!: string;
  partnerId!: string;
  name!: string;
  city!: string;
  location!: string;
  description!: string;
  stars!: number;
  rating!: number;
  reviewCount!: number;
  pricePerNight!: number;
  taxesAndFees!: number;
  image!: string;
  amenities!: string[];
  status!: 'active' | 'inactive';
  createdAt!: Date;
}
