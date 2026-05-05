"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Traveller = exports.Interest = void 0;
var Interest;
(function (Interest) {
    Interest["ADVENTURE"] = "Adventure";
    Interest["CULTURE"] = "Culture";
    Interest["FOOD"] = "Food";
    Interest["NATURE"] = "Nature";
    Interest["HISTORY"] = "History";
})(Interest || (exports.Interest = Interest = {}));
class Traveller {
    userId;
    fname;
    lname;
    email;
    phno;
    plang;
    bio;
    interests;
}
exports.Traveller = Traveller;
//# sourceMappingURL=traveller.entity.js.map