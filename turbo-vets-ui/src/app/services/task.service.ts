/* eslint-disable @angular-eslint/prefer-inject */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  getTasks() {
    return this.http.get<any[]>(`${this.apiUrl}/tasks`);
  }

  createTask(task: any) {
    return this.http.post(`${this.apiUrl}/tasks`, task);
  }

  deleteTask(id: string) {
    return this.http.delete(`${this.apiUrl}/tasks/${id}`);
  }

  updateTask(id: string, task: any) {
    return this.http.put(`${this.apiUrl}/tasks/${id}`, task);
  }
}
