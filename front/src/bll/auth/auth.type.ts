export type authType = {
  statusCode: 401
  message: "Unauthorized"
  timestamp: "2023-12-30T13:06:32.873Z"
  // path: "/clqr0vevn005lv12wu4kq304v"

}
export type LoginArgs = {
  email: string
  password: string
}
export type SignUpArgs = {
  email: string
  html?: string
  name?: string
  password: string
  sendConfirmationEmail?: boolean
  subject?: string
}
export type UserType = {
  avatar?: string | null
  created: string
  email: string
  phone?: string | null
  id: string
  name: string
  lastname?: string | null
  updated: string
}
