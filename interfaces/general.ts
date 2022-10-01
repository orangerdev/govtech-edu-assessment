export interface ResponseInterface {
  data: any
  success: boolean
  message: any
}

export interface CheckboxLabelInterface {
  id: number
  name: string
  value: string
  onChange(e: any): void
}
