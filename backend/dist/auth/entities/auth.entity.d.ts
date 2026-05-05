export declare enum Role {
    SUPERADMIN = "Super Admin",
    TRAVELLER = "Traveller",
    GUIDE = "Guide",
    TECHADMIN = "Tech Admin",
    NONTECHADMIN = "Non Tech Admin",
    HOTEL = "Hotel",
    EXPERIENCES = "Experiences"
}
export declare class Auth {
    userId: string;
    username: string;
    email?: string;
    password: string;
    role: Role;
}
