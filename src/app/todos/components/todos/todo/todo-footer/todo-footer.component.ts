import { Component, Input, OnInit } from '@angular/core'

@Component({
  selector: 'tl-todo-footer',
  templateUrl: './todo-footer.component.html',
  styleUrls: ['./todo-footer.component.css'],
})
export class TodoFooterComponent {
  @Input() createDate!: string
}
