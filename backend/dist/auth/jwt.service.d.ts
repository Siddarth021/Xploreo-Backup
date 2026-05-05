import { Role } from './entities/auth.entity';
export interface JwtPayload {
    sub: string;
    username: string;
    role: Role;
    iat?: number;
    exp?: number;
}
export declare class JwtService {
    private readonly secret;
    sign(payload: Omit<JwtPayload, 'iat' | 'exp'>, expiresInSeconds?: number): string;
    verify(token: string): JwtPayload;
    private signPart;
    private base64UrlEncode;
    private base64UrlDecode;
}
