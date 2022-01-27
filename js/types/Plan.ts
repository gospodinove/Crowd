import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore'
import { IconNameT } from './IconName'

export type PlanDataT = {
  icon: IconNameT
  name: string
  color: string
  startDate: FirebaseFirestoreTypes.Timestamp
  endDate: FirebaseFirestoreTypes.Timestamp
  userIds: string[]
}

export type PlanT = PlanDataT & {
  id: string
}
