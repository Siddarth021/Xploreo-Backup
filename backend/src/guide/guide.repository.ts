import { Injectable } from "@nestjs/common";
import { Guide } from "./entities/guide.entity";

@Injectable()
export class GuideRepository{
    private guide : Guide[] = [];

    createGuide(data : Guide){
        this.guide.push(data);
        return data;
    }

    updateGuide()
}