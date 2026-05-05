"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Trip = exports.TripStatus = void 0;
var TripStatus;
(function (TripStatus) {
    TripStatus["PLANNED"] = "Planned";
    TripStatus["ACTIVE"] = "Active";
    TripStatus["COMPLETED"] = "Completed";
    TripStatus["CANCELLED"] = "Cancelled";
})(TripStatus || (exports.TripStatus = TripStatus = {}));
class Trip {
    tripId;
    travellerId;
    planId;
    guideId;
    sourceCityId;
    destCityId;
    servicePartners;
    locations;
    startDate;
    endDate;
    status;
    totalCost;
}
exports.Trip = Trip;
//# sourceMappingURL=trip.entity.js.map