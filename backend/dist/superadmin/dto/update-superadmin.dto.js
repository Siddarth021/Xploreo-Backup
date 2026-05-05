"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateSuperadminDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_superadmin_dto_1 = require("./create-superadmin.dto");
class UpdateSuperadminDto extends (0, mapped_types_1.PartialType)(create_superadmin_dto_1.CreateSuperadminDto) {
}
exports.UpdateSuperadminDto = UpdateSuperadminDto;
//# sourceMappingURL=update-superadmin.dto.js.map