export enum GuideRequestStatus {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  REJECTED = 'rejected',
}

export class GuideRequest {
  id!: string;
  travellerId!: string;
  tripId!: string;
  experienceId!: string;
  guideId?: string;
  status!: GuideRequestStatus;
}
