import { Component, EventEmitter, Input, Output } from '@angular/core'
import { Task, UpdateTaskModel } from '../../../../../models/tasks.models'
import { TaskStatusEnum } from '../../../../../../core/enums/taskStatus.enum'

@Component({
  selector: 'tl-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
})
export class TaskComponent {
  newTitle = ''
  editMode = false
  @Input() task!: Task
  @Output() removeTaskEvent = new EventEmitter<{ todoId: string; taskId: string }>()
  @Output() changeTaskEvent = new EventEmitter<{
    todoId: string
    taskId: string
    model: UpdateTaskModel
  }>()
  taskStatusEnum = TaskStatusEnum

  removeTaskHandler() {
    this.removeTaskEvent.emit({ todoId: this.task.todoListId, taskId: this.task.id })
  }

  changeTaskStatusHandler(event: MouseEvent) {
    const newStatus = (event.currentTarget as HTMLInputElement).checked

    const model: UpdateTaskModel = {
      status: newStatus ? TaskStatusEnum.completed : TaskStatusEnum.active,
      title: this.task.title,
      completed: this.task.completed,
      startDate: this.task.startDate,
      priority: this.task.priority,
      description: this.task.description,
      deadline: this.task.deadline,
    }
    this.changeTaskEvent.emit({ todoId: this.task.todoListId, taskId: this.task.id, model })
  }
  activateEditMode() {
    this.editMode = true
    this.newTitle = this.task.title
  }

  editTitleHandler() {
    const model: UpdateTaskModel = {
      status: this.task.status,
      title: this.newTitle,
      completed: this.task.completed,
      startDate: this.task.startDate,
      priority: this.task.priority,
      description: this.task.description,
      deadline: this.task.deadline,
    }
    this.changeTaskEvent.emit({ todoId: this.task.todoListId, taskId: this.task.id, model })
    this.newTitle = ''
    this.editMode = false
  }
}
