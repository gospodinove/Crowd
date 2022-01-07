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
import { RootState } from '../redux/store'
import { RootStackParamsT } from '../types/RootStackParams'
import AuthenticationScreen from './Authentication/AuthenticationScreen'
import CreatePlanScreen from './CreatePlan/CreatePlanScreen'
import SplashScreen from './SplashScreen'
import TabNavigator from './TabNavigator'

const RootStack = createStackNavigator<RootStackParamsT>()

const connector = connect(
  (state: RootState) => ({ isUserDataLoaded: state.user.id !== undefined }),
  {
    loadUserData: userSlice.actions.loadUserData
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
    return <AuthenticationScreen />
  }

  if (!props.isUserDataLoaded) {
    props.loadUserData(userCredentials.uid)

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
