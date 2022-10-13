import { Component, Input, OnInit } from '@angular/core'
import { map, Observable } from 'rxjs'
import { Task, UpdateTaskModel } from '../../../../models/tasks.models'
import { TasksService } from '../../../../services/tasks.service'

@Component({
  selector: 'tl-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements OnInit {
  @Input() todoId!: string
  tasks$?: Observable<Task[]>
  taskTitle = ''
  constructor(private tasksServices: TasksService) {}

  ngOnInit(): void {
    this.tasks$ = this.tasksServices.tasks$.pipe(
      map(tasks => {
        debugger
        //cюда приходят все таски для конкретного тодолиста
        const tasksForTodo = tasks[this.todoId] //tаски для конкретного тодолиста
        return tasksForTodo
      })
    )
    this.tasksServices.getTasks(this.todoId)
  }

  addTaskHandler() {
    debugger
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
