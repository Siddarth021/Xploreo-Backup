import { Injectable } from "@nestjs/common";
import { Location } from "./entities/location.entity";

@Injectable()
export class LocationRepository {
    private locations: Location[] = [];
    
    createLocation(data : Location){
        this.locations.push(data);
        return data;
    }

    findByLocation(name : String){
        return this.locations.find(l=>l.locationName === name);
    }

}