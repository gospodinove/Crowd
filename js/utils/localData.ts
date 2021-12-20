import AsyncStorage from '@react-native-async-storage/async-storage'
import PropTypes from 'prop-types'

const localDataShema = {
  email: PropTypes.string.isRequired
}

export const loadUserData = async (): Promise<string | undefined> => {
  try {
    const rawData = await AsyncStorage.getItem('userData')
    return rawData ?? undefined
  } catch (err) {
    console.log(err)
  }
}

export const storeUserData = async (email: string) => {
  try {
    // await AsyncStorage.setItem('userData', JSON.stringify(email))
    await AsyncStorage.setItem('userData', email)
  } catch (err) {
    console.log(err)
  }
}
