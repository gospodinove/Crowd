import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React, { memo, useMemo } from 'react'
import { useAppTheme } from '../hooks/useAppTheme'
import { TabNavigatorPropsT } from '../types/TabNavigatorProps'
import { getIconForTab } from '../utils/navigator'
import Icon from './Icon'
import DashboardTabNavigator from './Screens/DashboardTabNavigator'
import MoreTabNavigator from './Screens/MoreTabNavigator'
import NotificationsTabNavigator from './Screens/Notifications/NotificationsTabNavigator'
import PlansTabNavigator from './Screens/Plans/PlansTabNavigator'

const Tab = createBottomTabNavigator<TabNavigatorPropsT>()

const TabNavigator = () => {
  const theme = useAppTheme()

  return (
    <Tab.Navigator
      initialRouteName="dashboardTab"
      screenOptions={useMemo(
        () =>
          ({ route }) => ({
            tabBarIcon: ({ color, size }) => (
              <Icon
                name={getIconForTab(route.name)}
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
        name="dashboardTab"
        component={DashboardTabNavigator}
        options={useMemo(() => ({ title: 'Dashboard' }), [])}
      />
      <Tab.Screen
        name="plansTab"
        component={PlansTabNavigator}
        options={useMemo(() => ({ title: 'Plans' }), [])}
      />
      <Tab.Screen
        name="notificationsTab"
        component={NotificationsTabNavigator}
        options={useMemo(() => ({ title: 'Notifications' }), [])}
      />
      <Tab.Screen
        name="moreTab"
        component={MoreTabNavigator}
        options={useMemo(() => ({ title: 'More' }), [])}
      />
    </Tab.Navigator>
  )
}

export default memo(TabNavigator)
