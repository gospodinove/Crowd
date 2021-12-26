import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore'

export type PlanT = {
  icon: IconProp
  name: string
  description: string
  color: string
  peopleCount: number
  startDate: FirebaseFirestoreTypes.Timestamp
  endDate: FirebaseFirestoreTypes.Timestamp
}
