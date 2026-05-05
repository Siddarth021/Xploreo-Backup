import { StatsService } from './stats.service';
export declare class StatsController {
    private readonly statsService;
    constructor(statsService: StatsService);
    getDashboardStats(): {
        totalUsers: number;
        totalBookings: number;
        totalRevenue: number;
        activePartners: number;
    };
}
