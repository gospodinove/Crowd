import AsyncStorage from '@react-native-async-storage/async-storage'
import { UserT } from '../types/User'

export const loadUserData = async (): Promise<UserT | undefined> => {
  try {
    const rawData = await AsyncStorage.getItem('userData')

    if (!rawData) {
      throw new Error('[loadUserData] - No user data stored')
    }

    const userData = JSON.parse(rawData)

    return {
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      id: userData.id,
      planIds: userData.planIds
    }
  } catch (err) {
    console.log(err)
  }
}

export const storeUserData = async (user: UserT) => {
  try {
    await AsyncStorage.setItem('userData', JSON.stringify(user))
  } catch (err) {
    console.log(err)
  }
}
