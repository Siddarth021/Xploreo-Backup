"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTechadminDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_techadmin_dto_1 = require("./create-techadmin.dto");
class UpdateTechadminDto extends (0, mapped_types_1.PartialType)(create_techadmin_dto_1.CreateTechadminDto) {
}
exports.UpdateTechadminDto = UpdateTechadminDto;
//# sourceMappingURL=update-techadmin.dto.js.map