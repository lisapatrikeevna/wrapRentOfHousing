export type authType = {
  statusCode: 401
  message: "Unauthorized"
  timestamp: "2023-12-30T13:06:32.873Z"
  // path: "/clqr0vevn005lv12wu4kq304v"

}
export type responseRegisterType = {
  access_token: string
  refresh_token: string
  user: UserType
  // user:{
  //   email: string
  //   username: string
  //   phone?: string | null
  //   avatar?: string | null
  //   first_name?: string
  //   id?: number
  //   last_name?: string
  // }
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
  id?: number
  email: string
  username: string
  phone?: string | null
  avatar?: string | null
  first_name?: string
  last_name?: string
  created?: string
  updated?: string
}

export interface RefreshResponse {
  access_token: string
  refresh_token?: string
}
