import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import ApiCallT from '../types/ApiCall'
import { assertNever } from './assertNever'

export default function api(call: ApiCallT) {
  switch (call.type) {
    case 'signInWithEmailAndPassword':
      return () =>
        auth().signInWithEmailAndPassword(
          call.params.email,
          call.params.password
        )
    case 'createUserWithEmailAndPassword':
      return () =>
        auth().createUserWithEmailAndPassword(
          call.params.email,
          call.params.password
        )
    case 'addUser':
      return () =>
        firestore().collection('users').doc(call.params.uid).set({
          email: call.params.email,
          firstName: call.params.firstName,
          lastName: call.params.lastName
        })
    case 'fetchUserData':
      return () => firestore().collection('users').doc(call.params.uid).get()
    case 'fetchPlans':
      return () =>
        firestore()
          .collection('plans')
          .where('userIds', 'array-contains', call.params.userId)
          .get()
    case 'createPlan':
      return () => firestore().collection('plans').add(call.params)
    case 'logout':
      return () => auth().signOut()
    case 'searchUsers':
      return () =>
        firestore()
          .collection('users')
          // '>=' acts as a prefix check
          .where('email', '>=', call.params.email)
          .get()
    default:
      assertNever(call)
  }
}
