import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore'
import { call } from '@redux-saga/core/effects'
import { UserDataT } from '../types/User'
import api from './api'

export default function* fetchUsers(userIds: string[]) {
  try {
    const documentSnapshot: FirebaseFirestoreTypes.QuerySnapshot<UserDataT[]> =
      yield call(
        api({
          type: 'fetchUsers',
          params: { userIds }
        })
      )

    return documentSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }))
  } catch (err) {
    console.log(err)
  }
}
