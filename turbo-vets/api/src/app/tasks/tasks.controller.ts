import {
  Controller,
  Post,
  Get,
  Delete,
  Param,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RbacGuard } from '../rbac/rbac.guard';
import { RequirePermission } from '../rbac/require-permission.decorator';
import { Permission } from '../rbac/permission.enum';
import { Put } from '@nestjs/common';

@Controller('tasks')
@UseGuards(JwtAuthGuard, RbacGuard)
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Post()
  @RequirePermission(Permission.TASK_CREATE)
  create(@Body() body: any, @Request() req: any) {
    return this.tasksService.create({
      ...body,
      createdBy: { id: req.user.userId },
      organization: { id: req.user.organizationId },
    }, req.user);
  }


  @Get()
  @RequirePermission(Permission.TASK_VIEW)
  findAll(@Request() req: any) {
    return this.tasksService.findAll(req.user);
  }

  @Delete(':id')
  @RequirePermission(Permission.TASK_DELETE)
  remove(@Param('id') id: string,
        @Request() req: any,) {
    return this.tasksService.remove(id, req.user);
  }

  @Put(':id')
  @RequirePermission(Permission.TASK_EDIT)
  update(
    @Param('id') id: string,
    @Body() body: any,
    @Request() req: any,
  ) {
    return this.tasksService.update(id, body, req.user);
  }

}
