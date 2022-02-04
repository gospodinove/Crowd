import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import ApiCallT from '../types/ApiCall'
import { assertNever } from './assertNever'

const db = firestore()

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
        db.collection('users').doc(call.params.uid).set({
          email: call.params.email,
          firstName: call.params.firstName,
          lastName: call.params.lastName
        })
    case 'fetchUsers':
      return () =>
        db
          .collection('users')
          .where(firestore.FieldPath.documentId(), 'in', call.params.userIds)
          .get()
    case 'fetchPlans':
      return () =>
        db
          .collection('plans')
          .where('userIds', 'array-contains', call.params.userId)
          .get()
    case 'createPlan':
      return () => db.collection('plans').add(call.params)
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
        db
          .collection('users')
          .orderBy('email')
          .startAt(call.params.email)
          .endAt(call.params.email + '\u{10ffff}')
          .get()
    case 'setPlanMembers':
      return () =>
        db
          .collection('plans')
          .doc(call.params.planId)
          .update({ userIds: call.params.userIds })
    case 'createNotificationBatch':
      const batch = db.batch()

      call.params.userIds.forEach(id => {
        const documentRef = db.collection('notifications').doc()

        batch.set(documentRef, {
          userId: id,
          title: call.params.title,
          message: call.params.message,
          isRead: call.params.isRead,
          image: call.params.image
        })
      })

      return () => batch.commit()
    default:
      assertNever(call)
  }
}
