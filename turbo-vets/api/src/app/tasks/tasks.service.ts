import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from '../entities/task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  async create(taskData: Partial<Task>, user: any) {
    const task = this.taskRepository.create(taskData);
    const savedTask = await this.taskRepository.save(task);

    console.log({
      userId: user.userId,
      role: user.role,
      action: 'TASK_CREATE',
      taskId: savedTask.id,
      timestamp: new Date(),
    });

    return savedTask;
  }

  async findAll(user: any) {
    if (user.role === 'OWNER') {
      return this.taskRepository.find();
    }

    return this.taskRepository.find({
      where: {
        organization: { id: user.organizationId },
      },
    });
  }

  async remove(id: string, user: any) {
    await this.taskRepository.delete(id);

    console.log({
      userId: user.userId,
      role: user.role,
      action: 'TASK_DELETE',
      taskId: id,
      timestamp: new Date(),
    });

    return { message: 'Task deleted' };
  }

  async update(id: string, updateData: Partial<Task>, user: any) {
    const task = await this.taskRepository.findOne({
      where: { id },
      relations: ['organization'],
    });

    if (!task) {
      throw new Error('Task not found');
    }

    // Owner can edit any task
    if (user.role !== 'OWNER') {
      // Admin must belong to same org
      if (task.organization.id !== user.organizationId) {
        throw new Error('Forbidden: Not in same organization');
      }
    }

    Object.assign(task, updateData);

    const updatedTask = await this.taskRepository.save(task);

    console.log({
      userId: user.userId,
      role: user.role,
      action: 'TASK_UPDATE',
      taskId: updatedTask.id,
      timestamp: new Date(),
    });

    return updatedTask;

  }

}
