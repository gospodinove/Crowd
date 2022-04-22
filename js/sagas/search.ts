import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore'
import { all, call, put, takeLatest } from '@redux-saga/core/effects'
import { loadersSlice } from '../reducers/loaders'
import { searchSlice } from '../reducers/search'
import { UserDataT, UserT } from '../types/User'
import api from '../utils/api'
import { assertNever } from '../utils/assertNever'
import { inviteMembersSearchLoader } from '../utils/loaders'

function* searchMembers(query: string) {
  yield put(loadersSlice.actions.startLoader(inviteMembersSearchLoader))

  try {
    if (query.length === 0) {
      yield put(searchSlice.actions.setMemberResults([]))
      return
    }

    const rawResults: FirebaseFirestoreTypes.QuerySnapshot<UserDataT> =
      yield call(api({ type: 'searchUsers', params: { email: query } }))

    const result: UserT[] = rawResults.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))

    yield put(searchSlice.actions.setMemberResults(result))
  } catch (err) {
    console.log(err)
  } finally {
    yield put(loadersSlice.actions.stopLoader(inviteMembersSearchLoader))
  }
}

function* onSearch(action: ReturnType<typeof searchSlice.actions.search>) {
  switch (action.payload.domain) {
    case 'members':
      yield searchMembers(action.payload.query)
      break
    default:
      assertNever(action.payload.domain)
  }
}

export default function* searchSaga() {
  yield all([takeLatest(searchSlice.actions.search, onSearch)])
}
