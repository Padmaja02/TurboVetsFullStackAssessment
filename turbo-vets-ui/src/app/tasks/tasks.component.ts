import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../services/task.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tasks.component.html',
})
export class TasksComponent implements OnInit {
  tasks: any[] = [];
  title = '';
  description = '';
  category = '';
  message = '';
  editingTaskId: string | null = null;
  editingTask: any = null;

  constructor(private taskService: TaskService,
            private authService: AuthService) {}

  ngOnInit() {
    console.log('Tasks component initialized');
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getTasks().subscribe((data: any) => {
      this.tasks = Array.isArray(data) ? [...data] : [];
      console.log('Rendered tasks count:', this.tasks.length);
    });
  }

  createTask() {
    this.taskService.createTask({
      title: this.title,
      description: this.description,
      category: this.category,
    }).subscribe({
      next: () => {
        this.message = 'Task created successfully';
        this.title = '';
        this.description = '';
        this.category = '';
        this.loadTasks();
      },
      error: () => {
        this.message = 'Failed to create task';
      }
    });
  }

  deleteTask(id: string) {
    this.taskService.deleteTask(id).subscribe({
      next: () => {
        this.message = 'Task deleted successfully';
        this.loadTasks();
      },
      error: () => {
        this.message = 'Delete failed';
      }
    });
  }

  get userRole(): string | null {
    const token = localStorage.getItem('token');
    if (!token) return null;

    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.role;
  }

  logout() {
    this.authService.logout();
  }

  startEdit(id: string) {
    this.editingTaskId = id;
  }

  editTask(task: any) {
    this.editingTask = { ...task };
  }

  saveUpdate() {
    this.taskService.updateTask(this.editingTask.id, this.editingTask)
      .subscribe(() => {
        this.editingTask = null;
        this.loadTasks();
      });
  }

  get canEdit(): boolean {
    return this.userRole === 'OWNER' || this.userRole === 'ADMIN';
  }

  get canDelete(): boolean {
    return this.userRole === 'OWNER';
  }

}
