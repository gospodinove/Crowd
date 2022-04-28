import firestore from '@react-native-firebase/firestore'

const db = firestore()

export const generatePlansQuery = (userId: string) =>
  db.collection('plans').where('userIds', 'array-contains', userId)

export const generatePlanQuery = (planId: string) =>
  db.collection('plans').doc(planId)
