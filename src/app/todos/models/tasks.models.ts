export interface GetTasksResponse {
  items: Task[]
  totalCount: number
  error: string
}
export interface Task extends UpdateTaskModel {
  //обьединяем два интерфейса чтоб не дублировать код
  id: string
  todoListId: string
  addedDate: string
  order: number
}
export interface DomainTask {
  [key: string]: Task[]
}
export interface UpdateTaskModel {
  //а эту часть интерфейса можно использовать отдельно
  title: string
  description: string
  completed: boolean
  status: number
  priority: number
  startDate: string
  deadline: string
}
