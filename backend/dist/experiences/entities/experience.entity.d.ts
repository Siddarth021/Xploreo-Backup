export declare enum ExperienceCategory {
    ADVENTURE = "Adventure",
    CULTURAL = "Cultural",
    CULINARY = "Culinary",
    WELLNESS = "Wellness",
    WILDLIFE = "Wildlife",
    PHOTOGRAPHY = "Photography"
}
export declare enum ExperienceAvailability {
    AVAILABLE = "Available",
    NOT_AVAILABLE = "Not Available"
}
export declare class Experience {
    experienceId: string;
    title: string;
    description: string;
    price: number;
    durationHours: number;
    providerId: string;
    locationId: string;
    category: ExperienceCategory;
    availability: ExperienceAvailability;
    maxParticipants: number;
}
