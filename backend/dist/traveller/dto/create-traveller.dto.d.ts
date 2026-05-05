import { Interest } from '../entities/traveller.entity';
export declare class CreateTravellerDto {
    fname: string;
    lname: string;
    email: string;
    phno: number;
    plang?: string[];
    bio?: string;
    interests?: Interest[];
}
