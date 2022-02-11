type NotificationImageType = 'plan'

export type NotificationDataT = {
  userId: string
  isRead: boolean
  title: string
  message: string
  image: {
    type: NotificationImageType
    value: string
  }
}

export type NotificationT = NotificationDataT & { id: string }
