import { PlanDataT } from './Plan'

type ApiCallT =
  | {
      type: 'signInWithEmailAndPassword'
      params: { email: string; password: string }
    }
  | {
      type: 'createUserWithEmailAndPassword'
      params: { email: string; password: string }
    }
  | {
      type: 'addUser'
      params: {
        email: string
        firstName: string
        lastName: string
        uid: string
      }
    }
  | {
      type: 'fetchPlans'
      params: { userId: string }
    }
  | {
      type: 'fetchUsers'
      params: { userIds: string[] }
    }
  | {
      type: 'createPlan'
      params: PlanDataT
    }
  | { type: 'logout'; params: undefined }
  | { type: 'searchUsers'; params: { email: string } }
  | { type: 'setPlanMembers'; params: { planId: string; userIds: string[] } }
  | {
      type: 'createNotificationBatch'
      params: {
        userIds: string[]
        title: string
        message: string
        image: { type: string; value: string }
        isRead: false
      }
    }
export default ApiCallT
