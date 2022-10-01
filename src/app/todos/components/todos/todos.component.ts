import { Component, OnInit } from '@angular/core';
import {TodoService} from "../../services/todo.service";
import {Observable} from "rxjs";
import {Todo} from "../../models/todos.models";

@Component({
  selector: 'tl-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {
todos$?:Observable<Todo[]>
  constructor(private todosService: TodoService) { }

  ngOnInit(): void {
  this.todos$=this.todosService.todos$
    this.todosService.getTodos()
  }

}
