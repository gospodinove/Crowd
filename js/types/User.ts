export type UserDataT = {
  firstName: string
  lastName: string
  planIds: string[]
}

export type UserT = UserDataT & {
  email: string
}
