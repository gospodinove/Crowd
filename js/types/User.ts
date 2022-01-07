export type UserDataT = {
  email: string
  firstName: string
  lastName: string
}

export type UserT = UserDataT & {
  id: string
}
