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
      /**
       * This creates a query to select records by prefix-matching.
       * Using a start and end values for the property, where the end key is
       * equal to the start + a very high code point in the Unicode range.
       * Because it is after most regular characters in Unicode,
       * the query matches all values that have this prefix.
       */

      return () =>
        firestore()
          .collection('users')
          .orderBy('email')
          .startAt(call.params.email)
          .endAt(call.params.email + '\u{10ffff}')
          .get()
    case 'setPlanMembers':
      return () =>
        firestore()
          .collection('plans')
          .doc(call.params.planId)
          .update({ userIds: call.params.userIds })
    default:
      assertNever(call)
  }
}
