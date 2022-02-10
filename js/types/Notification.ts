type NotificationImageType = 'plan'

export type NotificationData = {
  userId: string
  isRead: boolean
  title: string
  message: string
  image: {
    type: NotificationImageType
    value: string
  }
}

export type Notification = NotificationData & { id: string }
