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
      params: { firstName: string; lastName: string; uid: string }
    }
  | {
      type: 'fetchPlans'
      params: { userId: string }
    }
  | {
      type: 'fetchUser'
      params: { uid: string }
    }
  | {
      type: 'createPlan'
      params: PlanT
    }
export default ApiCallT
