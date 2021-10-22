import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { Button, TextInput, View } from 'react-native'
import { Provider } from 'react-redux'
import AuthenticationNavigator from './js/components/AuthenticationNavigator'
import UserNavigator from './js/components/UserNavigator'
import store from './js/redux/store'
import { TabNavigatorParamsT } from './js/types/TabNavigatorParams'

const Tab = createBottomTabNavigator<TabNavigatorParamsT>()

const App = () => {
  const [initializing, setInitializing] = useState(true)
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onAuthStateChanged = (user: FirebaseAuthTypes.User | null) => {
    setUser(user)
    if (initializing) setInitializing(false)
  }

  const onLoginPress = () => {
    auth().signInWithEmailAndPassword(email, password)
  }

  const onSignUpPress = () => {
    auth().createUserWithEmailAndPassword(email, password)
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged)
    return subscriber // unsubscribe on unmount
  }, [])

  if (initializing) return null

  if (!user) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: 'yellow',
          paddingTop: 50,
          paddingHorizontal: 20
        }}>
        <TextInput value={email} placeholder="Email" onChangeText={setEmail} />
        <TextInput
          value={password}
          placeholder="Password"
          onChangeText={setPassword}
        />
        <Button title="Login" onPress={onLoginPress} />
        <Button title="Sign Up" onPress={onSignUpPress} />
      </View>
    )
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="userStack"
          screenOptions={{ headerShown: false }}>
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
