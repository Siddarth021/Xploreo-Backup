import { Injectable } from "@nestjs/common";
import { City } from "./entities/city.entity";

@Injectable()
export class CitiesRepository{
    private cities : City[] = [];

    createCity(data:City){
        this.cities.push(data);
        return this.cities;
    }

    findCityByName(Name : String){
        return this.cities.find(c=>c.name===Name);
    }

    findCityById(Id : String){
        return this.cities.find(c=>c.id === Id);
    }
}