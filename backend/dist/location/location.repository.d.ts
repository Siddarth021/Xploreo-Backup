import { Location } from './entities/location.entity';
export declare class LocationRepository {
    private locations;
    create(data: Omit<Location, 'locationId'>): Location;
    findAll(): Location[];
    findById(id: string): Location | undefined;
    findByCity(cityId: string): Location[];
    update(id: string, data: Partial<Location>): Location | undefined;
    delete(id: string): boolean;
}
