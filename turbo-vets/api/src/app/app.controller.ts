import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { RbacGuard } from './rbac/rbac.guard';
import { RequirePermission } from './rbac/require-permission.decorator';
import { Permission } from './rbac/permission.enum';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseGuards(JwtAuthGuard)
  @Get('protected')
  getProtected() {
    return { message: 'You have access to protected route' };
  }

  @UseGuards(JwtAuthGuard, RbacGuard)
  @RequirePermission(Permission.TASK_DELETE)
  @Get('admin-only')
  testRole() {
    return { message: 'You have permission to delete tasks' };
  }
}
