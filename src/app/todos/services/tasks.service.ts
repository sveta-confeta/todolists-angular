import { Injectable } from '@angular/core'
import { environment } from '../../../environments/environment'
import { BehaviorSubject, map } from 'rxjs'
import { DomainTask, GetTasksResponse, Task, UpdateTaskModel } from '../models/tasks.models'
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
      .subscribe((tasks: Task[]) => {
        const stateTasks = this.tasks$.getValue() //получаем доступ к нашим таскам-пока это пустой обьект
        //потом нужно обратиться к этому обьекту и сказать, что в качестве ключика у тебя будет stateTasks[todoId]
        //а в качестве значения таски которые пришли:
        stateTasks[todoId] = tasks
        //после того как мы запишем в него значения ,мы обновляем наш stateTasks:
        this.tasks$.next(stateTasks)
      })
  }

  addTasks(data: { todoId: string; title: string }) {
    this.http
      .post<CommonResponse<{ item: Task }>>(
        `${environment.baseUrl}/todo-lists/${data.todoId}/tasks`,
        { title: data.title }
      )
      .pipe(
        map(res => {
          debugger
          const stateTasks = this.tasks$.getValue() //получаем стейт тасок
          //нужно получить новую таску:
          const newTask = res.data.item
          // получить новую таски:
          const newTasks = [newTask, ...stateTasks[data.todoId]]
          stateTasks[data.todoId] = newTasks
          return stateTasks
        })
      )
      .subscribe((tasks: DomainTask) => this.tasks$.next(tasks))
  }
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
          return stateTasks
        })
      )
      .subscribe((tasks: DomainTask) => this.tasks$.next(tasks))
  }

  updateTask(data: { todoId: string; taskId: string; model: UpdateTaskModel }) {
    this.http
      .put<CommonResponse>(
        `${environment.baseUrl}/todo-lists/${data.todoId}/tasks/${data.taskId}`,
        data.model
      )
      .pipe(
        map(res => {
          const stateTasks = this.tasks$.getValue()
          const tasksForTodo = stateTasks[data.todoId]
          const newTasks = tasksForTodo.map(t => {
            if (t.id === data.taskId) {
              return { ...t, ...data.model }
            } else {
              return t
            }
          })
          stateTasks[data.todoId] = newTasks
          return stateTasks
        })
      )
      .subscribe((tasks: DomainTask) => this.tasks$.next(tasks))
  }
}
