import { NgModule } from '@angular/core'
import {PreloadAllModules, RouterModule, Routes} from '@angular/router'

const routes: Routes = [{
  path: '',
  loadChildren:()=> import('./todos/todos.module').then(m=>m.TodosModule)

}, {
  path: 'login',
  loadChildren:()=> import('./auth/auth.module').then(m=>m.AuthModule)

},


]

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    preloadingStrategy:PreloadAllModules
  })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
