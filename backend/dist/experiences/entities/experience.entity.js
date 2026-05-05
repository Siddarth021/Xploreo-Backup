"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Experience = exports.ExperienceAvailability = exports.ExperienceCategory = void 0;
var ExperienceCategory;
(function (ExperienceCategory) {
    ExperienceCategory["ADVENTURE"] = "Adventure";
    ExperienceCategory["CULTURAL"] = "Cultural";
    ExperienceCategory["CULINARY"] = "Culinary";
    ExperienceCategory["WELLNESS"] = "Wellness";
    ExperienceCategory["WILDLIFE"] = "Wildlife";
    ExperienceCategory["PHOTOGRAPHY"] = "Photography";
})(ExperienceCategory || (exports.ExperienceCategory = ExperienceCategory = {}));
var ExperienceAvailability;
(function (ExperienceAvailability) {
    ExperienceAvailability["AVAILABLE"] = "Available";
    ExperienceAvailability["NOT_AVAILABLE"] = "Not Available";
})(ExperienceAvailability || (exports.ExperienceAvailability = ExperienceAvailability = {}));
class Experience {
    experienceId;
    title;
    description;
    price;
    durationHours;
    providerId;
    locationId;
    category;
    availability;
    maxParticipants;
}
exports.Experience = Experience;
//# sourceMappingURL=experience.entity.js.map