"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Plan = exports.TripCategory = exports.Availability = exports.Duration = void 0;
var Duration;
(function (Duration) {
    Duration["TWO_DAYS_ONE_NIGHT"] = "2 Days / 1 Night";
    Duration["THREE_DAYS_TWO_NIGHTS"] = "3 Days / 2 Nights";
    Duration["FOUR_DAYS_THREE_NIGHTS"] = "4 Days / 3 Nights";
    Duration["FIVE_DAYS_FOUR_NIGHTS"] = "5 Days / 4 Nights";
    Duration["SEVEN_DAYS_SIX_NIGHTS"] = "7 Days / 6 Nights";
    Duration["TEN_DAYS_NINE_NIGHTS"] = "10 Days / 9 Nights";
    Duration["TWELVE_DAYS_ELEVEN_NIGHTS"] = "12 Days / 11 Nights";
    Duration["FIFTEEN_DAYS_FOURTEEN_NIGHTS"] = "15 Days / 14 Nights";
})(Duration || (exports.Duration = Duration = {}));
var Availability;
(function (Availability) {
    Availability["A"] = "Available";
    Availability["NA"] = "Not Available";
})(Availability || (exports.Availability = Availability = {}));
var TripCategory;
(function (TripCategory) {
    TripCategory["ADVENTURE"] = "Adventure";
    TripCategory["FAMILY"] = "Family";
    TripCategory["INTERNATIONAL"] = "International";
    TripCategory["WEEKEND_GETAWAY"] = "Weekend Getaway";
    TripCategory["LUXURY"] = "Luxury";
    TripCategory["HONEYMOON"] = "Honeymoon";
    TripCategory["PILGRIMAGE"] = "Pilgrimage";
})(TripCategory || (exports.TripCategory = TripCategory = {}));
class Plan {
    planId;
    title;
    desc;
    price;
    duration;
    destination;
    location;
    category;
    availability;
}
exports.Plan = Plan;
//# sourceMappingURL=plan.entity.js.map