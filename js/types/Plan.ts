import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore'

export type PlanDataT = {
  icon: IconProp
  name: string
  color: string
  startDate: FirebaseFirestoreTypes.Timestamp
  endDate: FirebaseFirestoreTypes.Timestamp
  userIds: string[]
}

export type PlanT = PlanDataT & {
  id: string
}
