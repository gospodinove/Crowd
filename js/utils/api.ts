import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import ApiCallT from '../types/ApiCall'

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
          firstName: call.params.firstName,
          lastName: call.params.lastName,
          planIds: []
        })
    case 'fetchUser':
      return () => firestore().collection('users').doc(call.params.uid).get()
    case 'fetchPlans':
      return () =>
        firestore()
          .collection('plans')
          .where('users', 'array-contains', call.params.userId)
          .get()
  }
}
