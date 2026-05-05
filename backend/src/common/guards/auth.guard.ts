import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';
import { Role } from '../../auth/entities/auth.entity';

type HeaderRole = Role | 'user';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) return true;

    const request = context.switchToHttp().getRequest();
    const rawUserId =
      request.headers['x-user-id'] ??
      request.headers['user-id'] ??
      request.headers['userid'];
    const rawRole =
      request.headers['x-user-role'] ??
      request.headers['role'] ??
      request.headers['user-role'];

    const userId = Array.isArray(rawUserId) ? rawUserId[0] : rawUserId;
    const role = normalizeRole(Array.isArray(rawRole) ? rawRole[0] : rawRole);

    request.user = {
      userId: String(userId || 'guest-user'),
      role,
    };

    return true;
  }
}

function normalizeRole(value: unknown): HeaderRole {
  const role = String(value || '').trim().toLowerCase();

  if (role === Role.SUPERADMIN) return Role.SUPERADMIN;
  if (role === Role.TRAVELLER || role === 'traveler') return Role.TRAVELLER;
  if (role === Role.GUIDE) return Role.GUIDE;
  if (role === Role.TECHADMIN) return Role.TECHADMIN;
  if (role === Role.NONTECHADMIN) return Role.NONTECHADMIN;
  if (role === Role.HOTEL) return Role.HOTEL;
  if (role === Role.EXPERIENCE) return Role.EXPERIENCE;

  return 'user';
}
