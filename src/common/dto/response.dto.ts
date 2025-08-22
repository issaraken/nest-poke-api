export class SuccessResponse<T> {
  status: number
  message: string
  data: T
  timestamp: string
  path: string
}
