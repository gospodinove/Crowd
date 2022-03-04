import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore'
import { EventT } from './Event'
import { IconNameT } from './IconName'
import { PlanColorT } from './PlanColorName'

export type PlanDataT = {
  icon: IconNameT
  name: string
  color: PlanColorT
  startDate: FirebaseFirestoreTypes.Timestamp
  endDate: FirebaseFirestoreTypes.Timestamp
  userIds: string[]
  events: EventT[]
}

export type PlanT = PlanDataT & {
  id: string
}
