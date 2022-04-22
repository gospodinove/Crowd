import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth'
import { NavigationContainer } from '@react-navigation/native'
import {
  CardStyleInterpolators,
  createStackNavigator,
  HeaderStyleInterpolators,
  StackNavigationOptions
} from '@react-navigation/stack'
import React, { memo, useEffect, useState } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { userSlice } from '../reducers/user'
import { RootState } from '../redux/store'
import { RootStackPropsT } from '../types/RootStackProps'
import AuthenticationScreen from './Screens/Authentication/AuthenticationScreen'
import { ModalsNavigator } from './Screens/Modals/ModalsNavigator'
import SplashScreen from './SplashScreen'
import TabNavigator from './TabNavigator'
import ThemeProvider from './ThemeProvider'

const RootStack = createStackNavigator<RootStackPropsT>()

const connector = connect(
  (state: RootState) => ({
    isUserDataLoaded: state.user.current !== undefined
  }),
  {
    loadUserData: userSlice.actions.loadData
  }
)

type ReduxPropsT = ConnectedProps<typeof connector>

const Root = (props: ReduxPropsT) => {
  const [initializing, setInitializing] = useState(true)
  const [userCredentials, setUserCredentials] =
    useState<FirebaseAuthTypes.User | null>(null)

  const onAuthStateChanged = (credentials: FirebaseAuthTypes.User | null) => {
    setUserCredentials(credentials)
    if (initializing) {
      setInitializing(false)
    }
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged)
    return subscriber // unsubscribe on unmount
  }, [])

  if (initializing) {
    return <SplashScreen />
  }

  if (!userCredentials) {
    return (
      <ThemeProvider>
        <AuthenticationScreen />
      </ThemeProvider>
    )
  }

  if (!props.isUserDataLoaded) {
    props.loadUserData(userCredentials.uid)

    return <SplashScreen />
  }

  const rootOptions: StackNavigationOptions = {
    cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
    headerStyleInterpolator: HeaderStyleInterpolators.forFade,
    headerShown: false
  }

  return (
    <ThemeProvider>
      <NavigationContainer>
        <RootStack.Navigator initialRouteName="tab" screenOptions={rootOptions}>
          <RootStack.Screen name="modals" component={ModalsNavigator} />
          <RootStack.Screen name="tab" component={TabNavigator} />
        </RootStack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  )
}

export default memo(connector(Root))
