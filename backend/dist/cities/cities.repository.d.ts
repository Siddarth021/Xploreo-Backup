import { City } from './entities/city.entity';
export declare class CitiesRepository {
    private cities;
    create(data: Omit<City, 'id'>): City;
    findAll(): City[];
    findByName(name: string): City | undefined;
    findById(id: string): City | undefined;
    update(id: string, data: Partial<City>): City | undefined;
    delete(id: string): boolean;
}
