import { Role } from '../entities/user.entity';
import { Permission } from './permission.enum';

export const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
  OWNER: [
    Permission.TASK_CREATE,
    Permission.TASK_VIEW,
    Permission.TASK_EDIT,
    Permission.TASK_DELETE,
    Permission.VIEW_AUDIT,
  ],
  ADMIN: [
    Permission.TASK_CREATE,
    Permission.TASK_VIEW,
    Permission.TASK_EDIT,
  ],
  VIEWER: [
    Permission.TASK_VIEW,
  ],
};
