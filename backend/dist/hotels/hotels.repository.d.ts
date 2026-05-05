import { Hotel } from './entities/hotel.entity';
export declare class HotelsRepository {
    private hotels;
    create(data: Omit<Hotel, 'hotelId'>): Hotel;
    findByOwnerUserId(ownerUserId: string): Hotel[];
    findAll(): Hotel[];
    findById(hotelId: string): Hotel | undefined;
    findByLocation(locationId: string): Hotel[];
    update(hotelId: string, data: Partial<Hotel>): Hotel | undefined;
    delete(hotelId: string): boolean;
}
