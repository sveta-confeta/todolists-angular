import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Todo} from "../../models/todos.models";

@Component({
  selector: 'tl-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent {
  isTitleEdit=false
  newTitle =''
  @Input() todo!: Todo //сдесь сидит стейт одного гудулиста
  @Output() removeTodoEvent = new EventEmitter<string>()
  @Output() editTodoEvent = new EventEmitter<{todoId:string,title:string}>()

  removeTodoHandler() {
    this.removeTodoEvent.emit(this.todo.id)
  }

  toggleEditMode(){
    this.newTitle=this.todo.title
    this.isTitleEdit=true
  }

  editTitleHandler(){
    this.isTitleEdit=false
    this.editTodoEvent.emit({todoId:this.todo.id,title:this.newTitle})
  }

}
