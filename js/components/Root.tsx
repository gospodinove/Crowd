import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth'
import { NavigationContainer } from '@react-navigation/native'
import {
  createStackNavigator,
  StackNavigationOptions,
  TransitionPresets
} from '@react-navigation/stack'
import React, { memo, useEffect, useState } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { userSlice } from '../reducers/user'
import { RootStackParamsT } from '../types/RootStackParams'
import { loadUserData } from '../utils/localData'
import AuthenticationScreen from './Authentication/AuthenticationScreen'
import CreatePlanScreen from './CreatePlan/CreatePlanScreen'
import SplashScreen from './SplashScreen'
import TabNavigator from './TabNavigator'

const RootStack = createStackNavigator<RootStackParamsT>()

const connector = connect(null, {
  onLocalUserDataLoaded: userSlice.actions.onLocalDataLoaded
})

type ReduxPropsT = ConnectedProps<typeof connector>

const Root = (props: ReduxPropsT) => {
  const [initializing, setInitializing] = useState(true)
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null)
  const [isLocalDataLoaded, setIsLocalDataLoaded] = useState(false)

  const onAuthStateChanged = (user: FirebaseAuthTypes.User | null) => {
    setUser(user)
    if (initializing) {
      setInitializing(false)
    }
  }

  const loadLocalData = async () => {
    const user = await loadUserData()

    if (!user) {
      // TODO: retry state
      return
    }

    props.onLocalUserDataLoaded(user)

    setIsLocalDataLoaded(true)
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged)
    return subscriber // unsubscribe on unmount
  }, [])

  if (initializing) return null

  if (!user) {
    return <AuthenticationScreen />
  }

  if (!isLocalDataLoaded) {
    loadLocalData()

    return <SplashScreen />
  }

  const rootOptions: StackNavigationOptions = {
    presentation: 'modal',
    headerShown: false,
    gestureEnabled: true,
    cardOverlayEnabled: true,
    ...TransitionPresets.ModalPresentationIOS
  }

  return (
    <NavigationContainer>
      <RootStack.Navigator initialRouteName="tab" screenOptions={rootOptions}>
        <RootStack.Screen name="createPlan" component={CreatePlanScreen} />
        <RootStack.Screen name="tab" component={TabNavigator} />
      </RootStack.Navigator>
    </NavigationContainer>
  )
}

export default memo(connector(Root))
