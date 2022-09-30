import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { NavigateComponent } from './navigate/navigate.component'
import { RouterModule } from '@angular/router'

@NgModule({
  declarations: [NavigateComponent],
  imports: [CommonModule, RouterModule],
  exports: [NavigateComponent],
})
export class SharedModule {}
