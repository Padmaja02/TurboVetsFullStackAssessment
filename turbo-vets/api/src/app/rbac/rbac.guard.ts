import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLE_PERMISSIONS } from './role-permission.map';
import { REQUIRE_PERMISSION_KEY } from './require-permission.decorator';
import { Permission } from './permission.enum';
import { Role } from '../entities/user.entity';

@Injectable()
export class RbacGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredPermission =
      this.reflector.get<Permission>(
        REQUIRE_PERMISSION_KEY,
        context.getHandler(),
      );

    if (!requiredPermission) return true;

    const request = context.switchToHttp().getRequest();
    const user = request.user as {
        userId: string;
        email: string;
        role: Role;
    };

    if (!user) {
      throw new ForbiddenException('User not found');
    }

    const userPermissions = ROLE_PERMISSIONS[user.role];

    if (!userPermissions.includes(requiredPermission)) {
      throw new ForbiddenException('Access denied');
    }

    return true;
  }
}
