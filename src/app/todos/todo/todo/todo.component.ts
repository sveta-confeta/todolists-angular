import {Component, Input, OnInit} from '@angular/core';
import {Todo} from "../../models/todos.models";

@Component({
  selector: 'tl-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  @Input()todo!:Todo
  constructor() {
  }

  ngOnInit(): void {
  }

}
