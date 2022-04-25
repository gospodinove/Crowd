export type UserDataT = {
  email: string
  firstName: string
  lastName: string
  planIds: string[]
}

export type UserT = UserDataT & {
  id: string
}
