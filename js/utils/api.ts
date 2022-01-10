import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import ApiT from '../types/Api'
import { assertNever } from './assertNever'

// 1. new type that translates the ApiT to a Record of some sort
// 2. helper function that translates the params of current api() to the new Record
// 3. private function that has the logic of the current api()

// makes a mapped type {key1: value1, key2: value2}
// into {type: key1, params: value1} | {type: key2, params: value2}
type RecordToUnion<Type> = {
  [Key in keyof Type]: { type: Key; params: Type[Key] }
}[keyof Type]

// eventually move to something like this
// const api = <K extends keyof ApiT>(name: K, params: ApiT[K]) => {
export default function api(call: RecordToUnion<ApiT>) {
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
    default:
      assertNever(call)
  }
}
