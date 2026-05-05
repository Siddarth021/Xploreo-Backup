"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtService = void 0;
const common_1 = require("@nestjs/common");
let JwtService = class JwtService {
    secret = process.env.JWT_SECRET || 'dev-xploreo-secret';
    sign(payload, expiresInSeconds = 60 * 60 * 24) {
        const now = Math.floor(Date.now() / 1000);
        const tokenPayload = {
            ...payload,
            iat: now,
            exp: now + expiresInSeconds,
        };
        const header = this.base64UrlEncode({ alg: 'HS256', typ: 'JWT' });
        const body = this.base64UrlEncode(tokenPayload);
        const signature = this.signPart(`${header}.${body}`);
        return `${header}.${body}.${signature}`;
    }
    verify(token) {
        const [header, body, signature] = token.split('.');
        if (!header || !body || !signature) {
            throw new common_1.UnauthorizedException('Invalid token');
        }
        const expectedSignature = this.signPart(`${header}.${body}`);
        if (signature !== expectedSignature) {
            throw new common_1.UnauthorizedException('Invalid token signature');
        }
        const payload = this.base64UrlDecode(body);
        if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) {
            throw new common_1.UnauthorizedException('Token expired');
        }
        return payload;
    }
    signPart(value) {
        const crypto = require('crypto');
        return crypto
            .createHmac('sha256', this.secret)
            .update(value)
            .digest('base64url');
    }
    base64UrlEncode(value) {
        return Buffer.from(JSON.stringify(value)).toString('base64url');
    }
    base64UrlDecode(value) {
        return JSON.parse(Buffer.from(value, 'base64url').toString('utf8'));
    }
};
exports.JwtService = JwtService;
exports.JwtService = JwtService = __decorate([
    (0, common_1.Injectable)()
], JwtService);
//# sourceMappingURL=jwt.service.js.map