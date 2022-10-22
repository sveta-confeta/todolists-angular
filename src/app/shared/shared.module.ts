import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { NavigateComponent } from './navigate/navigate.component'
import { RouterModule } from '@angular/router'
import { NotifyComponent } from './components/notify/notify.component'

@NgModule({
  declarations: [NavigateComponent, NotifyComponent],
  imports: [CommonModule, RouterModule],
  exports: [NavigateComponent, NotifyComponent],
})
export class SharedModule {}
