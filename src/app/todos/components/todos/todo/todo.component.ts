import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { DomainTodo, FilterType, Todo } from '../../../models/todos.models'
import { TodosService } from '../../../services/todos.service'

@Component({
  selector: 'tl-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent {
  isTitleEdit = false
  newTitle = ''

  @Input() todo!: DomainTodo //сдесь сидит стейт одного гудулиста
  @Output() removeTodoEvent = new EventEmitter<string>()
  @Output() editTodoEvent = new EventEmitter<{ todoId: string; title: string }>()
  constructor(private todosService: TodosService) {}
  removeTodoHandler() {
    this.removeTodoEvent.emit(this.todo.id)
  }

  toggleEditMode() {
    this.newTitle = this.todo.title
    this.isTitleEdit = true
  }

  editTitleHandler() {
    this.isTitleEdit = false
    this.editTodoEvent.emit({ todoId: this.todo.id, title: this.newTitle })
  }
  changeFilter(filter: FilterType) {
    this.todosService.changeFilter({ filter, todoId: this.todo.id })
  }
}
