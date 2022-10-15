import { Component, Input, OnInit } from '@angular/core'
import { combineLatest, map, Observable } from 'rxjs'
import { Task, UpdateTaskModel } from '../../../../models/tasks.models'
import { TasksService } from '../../../../services/tasks.service'
import { TodosService } from '../../../../services/todos.service'
import { TaskStatusEnum } from '../../../../../core/enums/taskStatus.enum'

@Component({
  selector: 'tl-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements OnInit {
  @Input() todoId!: string
  tasks$?: Observable<Task[]>
  taskTitle = ''
  constructor(private tasksServices: TasksService, private todoServices: TodosService) {}

  ngOnInit(): void {
    // было до фильтрации, мы просто отрисовывали таски для конкретного тодолиста:
    // this.tasks$ = this.tasksServices.tasks$.pipe(
    //   map(tasks => {
    //     //cюда приходят все таски для конкретного тодолиста
    //     const tasksForTodo = tasks[this.todoId] //tаски для конкретного тодолиста
    //     return tasksForTodo
    //   })
    // )
    // this.tasksServices.getTasks(this.todoId)
    this.tasks$ = combineLatest([this.tasksServices.tasks$, this.todoServices.todos$]).pipe(
      map(res => {
        const tasks = res[0]
        let tasksForTodo = tasks[this.todoId]
        const todos = res[1]
        let activeTodo = todos.find(tl => tl.id === this.todoId)
        if (activeTodo?.filter === 'completed') {
          tasksForTodo = tasksForTodo.filter(t => t.status === TaskStatusEnum.completed)
        }
        if (activeTodo?.filter === 'active') {
          tasksForTodo = tasksForTodo.filter(t => t.status === TaskStatusEnum.active)
        }
        return tasksForTodo
      })
    )
    this.tasksServices.getTasks(this.todoId)
  }

  addTaskHandler() {
    // todo change naming
    this.tasksServices.addTasks({ title: this.taskTitle, todoId: this.todoId })
    this.taskTitle = ''
  }
  removeTask(data: { todoId: string; taskId: string }) {
    this.tasksServices.removeTask(data)
  }
  changeTask(data: { todoId: string; taskId: string; model: UpdateTaskModel }) {
    this.tasksServices.updateTask(data)
  }
}
