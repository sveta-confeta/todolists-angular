import { Component, Input, OnInit } from '@angular/core'
import { Task } from '../../../../../models/tasks.models'

@Component({
  selector: 'tl-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
})
export class TaskComponent implements OnInit {
  @Input() task!: Task
  constructor() {}

  ngOnInit(): void {}
}
