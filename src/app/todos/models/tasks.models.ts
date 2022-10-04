export interface GetTasksResponse {
  items: Task[]
  totalCount: number
  error: string
}
export interface Task {
  id: string
  todoListId: string
  title: string
  addedDate: string
  order: number
  description: string
  completed: boolean
  status: number
  priority: number
  startDate: string
  deadline: string
}
