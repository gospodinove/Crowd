import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { Provider } from 'react-redux'
import AuthenticationNavigator from './js/components/AuthenticationNavigator'
import AuthenticationScreen from './js/components/AuthenticationScreen'
import UserNavigator from './js/components/UserNavigator'
import store from './js/redux/store'
import { TabNavigatorParamsT } from './js/types/TabNavigatorParams'

const Tab = createBottomTabNavigator<TabNavigatorParamsT>()

const App = () => {
  const [initializing, setInitializing] = useState(true)
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null)

  const onAuthStateChanged = (user: FirebaseAuthTypes.User | null) => {
    setUser(user)
    if (initializing) setInitializing(false)
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged)
    return subscriber // unsubscribe on unmount
  }, [])

  if (initializing) return null

  if (!user) {
    return <AuthenticationScreen />
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="userStack"
          screenOptions={{ headerShown: false }}
        >
          <Tab.Screen
            name="userStack"
            component={UserNavigator}
            options={{ title: 'User' }}
          />
          <Tab.Screen
            name="sampleStack"
            component={AuthenticationNavigator}
            options={{ title: 'Sample' }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  )
}

export default App
