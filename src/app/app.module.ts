import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { CoreModule } from './core/core.module'
import { SharedModule } from './shared/shared.module'
import { HttpClientModule } from '@angular/common/http'
import { TasksService } from './todos/services/tasks.service'
import { TodosService } from './todos/services/todos.service'
import { FormsModule } from '@angular/forms'

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    SharedModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [TasksService, TodosService],
  bootstrap: [AppComponent],
})
export class AppModule {}
