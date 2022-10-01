import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { TodosRoutingModule } from './todos-routing.module'
import { TodosComponent } from './components/todos/todos.component';
import { TodoComponent } from './todo/todo/todo.component'

@NgModule({
  declarations: [TodosComponent, TodoComponent],
  imports: [CommonModule, TodosRoutingModule],
})
export class TodosModule {}
