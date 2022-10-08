import { Component, Input, OnInit } from '@angular/core'
import { Observable } from 'rxjs'
import { Task } from '../../../../models/tasks.models'
import { TasksService } from '../../../../services/tasks.service'

@Component({
  selector: 'tl-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements OnInit {
  @Input() todoId!: string
  tasks$?: Observable<Task[]>
  constructor(private tasksServices: TasksService) {}

  ngOnInit(): void {
    this.tasksServices.getTasks(this.todoId)
    // this.tasks$ = this.tasksServices.getTasks(this.todoId)
  }
  removeTask(data: { todoId: string; taskId: string }) {
    this.tasksServices.removeTask(data)
  }
}
