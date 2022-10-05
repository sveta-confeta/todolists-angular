import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { TodosRoutingModule } from './todos-routing.module'
import { TodosComponent } from './components/todos/todos.component'
import { FormsModule } from '@angular/forms'
import { TodoComponent } from './components/todos/todo/todo.component'
import { TasksComponent } from './components/todos/todo/tasks/tasks.component'
import { TasksService } from './services/tasks.service'
import { TodosService } from './services/todos.service';
import { TaskComponent } from './components/todos/todo/tasks/task/task.component'

@NgModule({
  declarations: [TodosComponent, TodoComponent, TasksComponent, TaskComponent],
  imports: [CommonModule, TodosRoutingModule, FormsModule],
  providers: [TasksService, TodosService],
})
export class TodosModule {}
