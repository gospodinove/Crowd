import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React, { memo, useMemo } from 'react'
import { useAppTheme } from '../hooks/useAppTheme'
import { TabNavigatorParamsT } from '../types/TabNavigatorParams'
import { getIconForTab } from '../utils/navigator'
import DashboardTabNavigator from './DashboardTabNavigator'
import MoreTabNavigator from './MoreTabNavigator'
import NotificationsTabNavigator from './NotificationsTabNavigator'
import PlansTabNavigator from './Plans/PlansTabNavigator'

const Tab = createBottomTabNavigator<TabNavigatorParamsT>()

const TabNavigator = () => {
  const theme = useAppTheme()

  return (
    <Tab.Navigator
      initialRouteName="dashboardStack"
      screenOptions={useMemo(
        () =>
          ({ route }) => ({
            tabBarIcon: ({ color, size }) => (
              <FontAwesomeIcon
                icon={getIconForTab(route.name)}
                size={size}
                color={color}
              />
            ),
            tabBarActiveTintColor: theme.colors.primary,
            tabBarInactiveTintColor: theme.colors.icon,
            headerShown: false,
            tabBarStyle: {
              backgroundColor: theme.colors.background,
              borderTopWidth: 0.2,
              borderTopColor: theme.colors.border
            }
          }),
        [theme]
      )}
    >
      <Tab.Screen
        name="dashboardStack"
        component={DashboardTabNavigator}
        options={useMemo(() => ({ title: 'Dashboard' }), [])}
      />
      <Tab.Screen
        name="plansStack"
        component={PlansTabNavigator}
        options={useMemo(() => ({ title: 'Plans' }), [])}
      />
      <Tab.Screen
        name="notificationsStack"
        component={NotificationsTabNavigator}
        options={useMemo(() => ({ title: 'Notifications' }), [])}
      />
      <Tab.Screen
        name="moreStack"
        component={MoreTabNavigator}
        options={useMemo(() => ({ title: 'More' }), [])}
      />
    </Tab.Navigator>
  )
}

export default memo(TabNavigator)
