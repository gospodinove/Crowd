export type UserDataT = {
  firstName: string
  lastName: string
}

export type UserT = UserDataT & {
  email: string
  id: string
}
