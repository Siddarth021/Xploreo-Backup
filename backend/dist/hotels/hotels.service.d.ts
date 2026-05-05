import { HotelsRepository } from './hotels.repository';
import { CreateHotelDto } from './dto/create-hotel.dto';
import { UpdateHotelDto } from './dto/update-hotel.dto';
export declare class HotelsService {
    private readonly hotelsRepository;
    constructor(hotelsRepository: HotelsRepository);
    create(dto: CreateHotelDto): import("./entities/hotel.entity").Hotel;
    findAll(): import("./entities/hotel.entity").Hotel[];
    findOne(id: string): import("./entities/hotel.entity").Hotel;
    findByLocation(locationId: string): import("./entities/hotel.entity").Hotel[];
    update(id: string, dto: UpdateHotelDto): import("./entities/hotel.entity").Hotel;
    remove(id: string): {
        message: string;
    };
}
