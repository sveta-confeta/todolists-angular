import { Component, EventEmitter, Input, Output } from '@angular/core'
import { Task } from '../../../../../models/tasks.models'

@Component({
  selector: 'tl-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
})
export class TaskComponent {
  @Input() task!: Task
  @Output() removeTaskEvent = new EventEmitter<{ todoId: string; taskId: string }>()
  removeTaskHandler() {
    this.removeTaskEvent.emit({ todoId: this.task.todoListId, taskId: this.task.id })
  }
}
