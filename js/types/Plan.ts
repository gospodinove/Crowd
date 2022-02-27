import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore'
import { IconNameT } from './IconName'
import { PlanColorT } from './PlanColorName'

export type PlanDataT = {
  icon: IconNameT
  name: string
  color: PlanColorT
  startDate: FirebaseFirestoreTypes.Timestamp
  endDate: FirebaseFirestoreTypes.Timestamp
  userIds: string[]
}

export type PlanT = PlanDataT & {
  id: string
}
