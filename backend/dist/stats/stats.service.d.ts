import { AuthService } from '../auth/auth.service';
import { TripsService } from '../trips/trips.service';
import { GuideService } from '../guide/guide.service';
export declare class StatsService {
    private readonly authService;
    private readonly tripsService;
    private readonly guideService;
    constructor(authService: AuthService, tripsService: TripsService, guideService: GuideService);
    getAdminDashboardStats(): {
        totalUsers: number;
        totalBookings: number;
        totalRevenue: number;
        activePartners: number;
    };
}
