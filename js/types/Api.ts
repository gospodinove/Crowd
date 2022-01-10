import { PlanT } from './Plan'

type ApiT = {
  signInWithEmailAndPassword: { email: string; password: string }
  createUserWithEmailAndPassword: { email: string; password: string }
  addUser: {
    email: string
    firstName: string
    lastName: string
    uid: string
  }
  fetchPlans: { userId: string }
  fetchUserData: { uid: string }
  createPlan: PlanT
  logout: undefined
}
export default ApiT
