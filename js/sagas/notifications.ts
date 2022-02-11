import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore'
import { all, call, put, select, takeLatest } from '@redux-saga/core/effects'
import { notificationsSlice } from '../reducers/notifications'
import { RootState } from '../redux/store'
import { NotificationDataT, NotificationT } from '../types/Notification'
import api from '../utils/api'

function* onFetch() {
  try {
    const userId: string | undefined = yield select(
      (state: RootState) => state.users.currentUser?.id
    )

    if (!userId) {
      throw new Error('[onFetch] - no user id')
    }

    const querySnapshot: FirebaseFirestoreTypes.QuerySnapshot<NotificationDataT> =
      yield call(
        api({
          type: 'fetchNotifications',
          params: { userId }
        })
      )

    const notifications: NotificationT[] = querySnapshot.docs.map(doc => ({
      ...doc.data(),
      id: doc.id
    }))

    yield put(notificationsSlice.actions.set(notifications))
  } catch (err) {
    console.log(err)
  }
}

export default function* notificationsSaga() {
  yield all([takeLatest(notificationsSlice.actions.fetch, onFetch)])
}
