import { Injectable } from '@angular/core'
import { environment } from '../../../environments/environment'
import { map, Observable } from 'rxjs'
import { GetTasksResponse, Task } from '../models/tasks.models'
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  constructor(private http: HttpClient) {}

  getTasks(todoId: string): Observable<Task[]> {
    return this.http
      .get<GetTasksResponse>(`${environment.baseUrl}/todo-lists/${todoId}/tasks`)
      .pipe(map(res => res.items))
  }
}
