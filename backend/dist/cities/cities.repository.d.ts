import { City } from './entities/city.entity';
export declare class CitiesRepository {
    private cities;
    create(data: Omit<City, 'cityId'>): City;
    findAll(): City[];
    findByName(name: string): City | undefined;
    findById(cityId: string): City | undefined;
    update(cityId: string, data: Partial<City>): City | undefined;
    delete(cityId: string): boolean;
}
