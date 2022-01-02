import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React from 'react'
import { TabNavigatorParamsT } from '../types/TabNavigatorParams'
import { getIconForTab } from '../utils/navigator'
import DashboardTabNavigator from './DashboardTabNavigator'
import MoreTabNavigator from './MoreTabNavigator'
import NotificationsTabNavigator from './NotificationsTabNavigator'
import PlansTabNavigator from './PlansTabNavigator'

const Tab = createBottomTabNavigator<TabNavigatorParamsT>()

const TabNavigator = () => (
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
)

export default TabNavigator
