import { Component, OnInit } from '@angular/core'
import { TodosService } from '../../services/todos.service'
import { Observable } from 'rxjs'
import { DomainTodo } from '../../models/todos.models'
import { AuthService } from '../../../core/services/auth.service'

@Component({
  selector: 'tl-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css'],
})
export class TodosComponent implements OnInit {
  todoTitle = ''
  todos$?: Observable<DomainTodo[]>

  constructor(private todosService: TodosService, private authService: AuthService) {}

  ngOnInit(): void {
    this.todos$ = this.todosService.todos$
    this.todosService.getTodos()
  }

  addTodoHandler() {
    this.todosService.addTodo(this.todoTitle)
    this.todoTitle = ''
  }

  removeTodo(todoID: string) {
    this.todosService.removeTodo(todoID)
  }
  logoutHandler() {
    this.authService.logout()
  }

  editTodo(data: { todoId: string; title: string }) {
    this.todosService.updateTodoTitle(data)
  }
}
