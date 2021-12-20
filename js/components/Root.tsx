import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { userSlice } from '../reducers/user'
import { TabNavigatorParamsT } from '../types/TabNavigatorParams'
import { loadUserData } from '../utils/localData'
import { getIconForTab } from '../utils/navigator'
import AuthenticationScreen from './AuthenticationScreen'
import DashboardTabNavigator from './DashboardTabNavigator'
import MoreTabNavigator from './MoreTabNavigator'
import NotificationsTabNavigator from './NotificationsTabNavigator'
import PlansTabNavigator from './PlansTabNavigator'
import SplashScreen from './SplashScreen'

const Tab = createBottomTabNavigator<TabNavigatorParamsT>()

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

  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="dashboardStack"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => (
            <FontAwesomeIcon
              icon={getIconForTab(route.name)}
              size={size}
              color={color}
            />
          ),
          tabBarActiveTintColor: 'black',
          tabBarInactiveTintColor: 'gray',
          headerShown: false
        })}
      >
        <Tab.Screen
          name="dashboardStack"
          component={DashboardTabNavigator}
          options={{ title: 'Dashboard' }}
        />
        <Tab.Screen
          name="plansStack"
          component={PlansTabNavigator}
          options={{ title: 'Plans' }}
        />
        <Tab.Screen
          name="notificationsStack"
          component={NotificationsTabNavigator}
          options={{ title: 'Notifications' }}
        />
        <Tab.Screen
          name="moreStack"
          component={MoreTabNavigator}
          options={{ title: 'More' }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  )
}

export default connector(Root)
