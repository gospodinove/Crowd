import { PlanT } from './Plan'

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
      type: 'fetchUserData'
      params: { uid: string }
    }
  | {
      type: 'createPlan'
      params: PlanT
    }
export default ApiCallT
