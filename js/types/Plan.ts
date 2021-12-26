import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore'

export type PlanT = {
  icon: string
  name: string
  description: string
  peopleCount: number
  startDate: FirebaseFirestoreTypes.Timestamp
  endDate: FirebaseFirestoreTypes.Timestamp
}
