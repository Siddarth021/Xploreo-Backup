"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateGuideDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_guide_dto_1 = require("./create-guide.dto");
class UpdateGuideDto extends (0, mapped_types_1.PartialType)(create_guide_dto_1.CreateGuideDto) {
}
exports.UpdateGuideDto = UpdateGuideDto;
//# sourceMappingURL=update-guide.dto.js.map