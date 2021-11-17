import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { Provider } from 'react-redux'
import AuthenticationScreen from './js/components/AuthenticationScreen'
import DashboardTabNavigator from './js/components/DashboardTabNavigator'
import MoreTabNavigator from './js/components/MoreTabNavigator'
import NotificationsTabNavigator from './js/components/NotificationsTabNavigator'
import PlansTabNavigator from './js/components/PlansTabNavigator'
import store from './js/redux/store'
import { TabNavigatorParamsT } from './js/types/TabNavigatorParams'
import { getIconForTab } from './js/utils/navigator'

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
    return (
      <Provider store={store}>
        <AuthenticationScreen />
      </Provider>
    )
  }

  return (
    <Provider store={store}>
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
    </Provider>
  )
}

export default App
