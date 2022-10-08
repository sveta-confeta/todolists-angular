import { Injectable } from '@angular/core'
import { environment } from '../../../environments/environment'
import { BehaviorSubject, map } from 'rxjs'
import { DomainTask, GetTasksResponse, Task } from '../models/tasks.models'
import { HttpClient } from '@angular/common/http'
import { CommonResponse } from '../../core/models/core.models'

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  tasks$ = new BehaviorSubject<DomainTask>({}) //изначально пустой обьект.
  //если мы создали BehaviorSubject значит нужно все методам на него подписаться
  constructor(private http: HttpClient) {}

  getTasks(todoId: string) {
    return this.http
      .get<GetTasksResponse>(`${environment.baseUrl}/todo-lists/${todoId}/tasks`)
      .pipe(map(t => t.items))
      .subscribe((tasks: Task[]) => this.tasks$.next(tasks))
  }

  // addTasks(data: { todoId: string; title: string }) {
  //   this.http
  //     .post(`${environment.baseUrl}/todo-lists/${data.todoId}/tasks`, { title: data.title })
  //     .subscribe((tasks:DomainTask) => this.tasks$.next(tasks))
  // }
  removeTask(data: { todoId: string; taskId: string }) {
    this.http
      .delete<CommonResponse>(
        `${environment.baseUrl}/todo-lists/${data.todoId}/tasks/${data.taskId}`
      )
      .pipe(
        map(res => {
          const stateTasks = this.tasks$.getValue()
          const tasksForTodo = stateTasks[data.todoId]
          const filteredTask = tasksForTodo.filter(t => t.id !== data.taskId)
          stateTasks[data.todoId] = filteredTask
          return filteredTask
        })
      )
      .subscribe((tasks: DomainTask) => this.tasks$.next(tasks))
  }
}
