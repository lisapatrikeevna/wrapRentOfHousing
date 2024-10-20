export type authType = {
  statusCode: 401
  message: "Unauthorized"
  timestamp: "2023-12-30T13:06:32.873Z"
  // path: "/clqr0vevn005lv12wu4kq304v"

}
export type responseRegisterType = {
  data: {
    access_token:string
    refresh_token:string
    username: string
    email: string
    first_name: string
    id: number
    last_name: string
    phone: string | null
  }
}
export type LoginArgs = {
  // email: string
  password: string
  username: string
}
export type SignUpArgs = {
  firstName: string
  lastName: string
  username: string
  password: string
  email: string
  avatar?: any
  phone?: string | null
}
export type UserType = {
  avatar?: string | null
  created?: string
  email: string
  phone?: string | null
  id: string
  username: string
  last_name?: string | null
  first_name?: string | null
  updated?: string
}
export interface RefreshResponse {
  access_token: string
  refresh_token?: string
}
