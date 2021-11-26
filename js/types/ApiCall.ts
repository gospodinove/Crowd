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
      params: undefined
    }
  | {
      type: 'fetchUser'
      params: { uid: string }
    }
export default ApiCallT
