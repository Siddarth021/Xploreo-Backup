"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auth = exports.Role = void 0;
var Role;
(function (Role) {
    Role["SUPERADMIN"] = "Super Admin";
    Role["TRAVELLER"] = "Traveller";
    Role["GUIDE"] = "Guide";
    Role["TECHADMIN"] = "Tech Admin";
    Role["NONTECHADMIN"] = "Non Tech Admin";
    Role["HOTEL"] = "Hotel";
    Role["EXPERIENCES"] = "Experiences";
})(Role || (exports.Role = Role = {}));
class Auth {
    userId;
    username;
    email;
    password;
    role;
}
exports.Auth = Auth;
//# sourceMappingURL=auth.entity.js.map