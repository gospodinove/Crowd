import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore'

export type EventDataT = {
  name: string
  description: string
  start: FirebaseFirestoreTypes.Timestamp
  end: FirebaseFirestoreTypes.Timestamp
}

export type EventT = EventDataT & { id: string }
