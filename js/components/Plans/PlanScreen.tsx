import {
  createMaterialTopTabNavigator,
  MaterialTopTabBarProps
} from '@react-navigation/material-top-tabs'
import { StackScreenProps } from '@react-navigation/stack'
import React, { memo, useCallback, useLayoutEffect } from 'react'
import { GroupPlanTabBarPropsT } from '../../types/GroupPlanTabBarProps'
import { PlansTabNavigatorPropsT } from '../../types/PlansTabNavigatorProps'
import DashboardScreen from '../DashboardScreen'
import NotificationsScreen from '../NotificationsScreen'
import TabBar from '../TabBar'
import MembersScreen from './MembersScreen'

type NavigationPropsT = StackScreenProps<PlansTabNavigatorPropsT, 'plan'>

type PropsT = NavigationPropsT

const Tab = createMaterialTopTabNavigator<GroupPlanTabBarPropsT>()

const tabNames = ['Overview', 'Schedule', 'Payments', 'Members', 'Cars']

const PlanScreen = (props: PropsT) => {
  useLayoutEffect(() => {
    props.navigation.setOptions({
      title: props.route.params.name,
      headerStyle: {
        backgroundColor: props.route.params.color,
        shadowColor: 'transparent',
        elevation: 0
      },
      headerTintColor: '#fff',
      headerBackTitleVisible: false
    })
  }, [props.navigation, props.route.params.name, props.route.params.color])

  const renderTabBar = useCallback(
    (tabBarProps: MaterialTopTabBarProps) => (
      <TabBar
        {...tabBarProps}
        backgroundColor={props.route.params.color}
        titles={tabNames}
      />
    ),
    [props.route.params.color, tabNames]
  )

  return (
    <Tab.Navigator tabBar={renderTabBar}>
      <Tab.Screen name="overview" component={DashboardScreen} />
      <Tab.Screen name="schedule" component={NotificationsScreen} />
      <Tab.Screen name="payments" component={DashboardScreen} />
      <Tab.Screen name="members" component={MembersScreen} />
      <Tab.Screen name="cars" component={NotificationsScreen} />
    </Tab.Navigator>
  )
}

export default memo(PlanScreen)
