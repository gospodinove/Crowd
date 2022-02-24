import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import { CompositeScreenProps } from '@react-navigation/core'
import {
  createMaterialTopTabNavigator,
  MaterialTopTabBarProps
} from '@react-navigation/material-top-tabs'
import { StackScreenProps } from '@react-navigation/stack'
import React, { memo, useCallback, useLayoutEffect, useMemo } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { RootState } from '../../../redux/store'
import { GroupPlanTabBarPropsT } from '../../../types/GroupPlanTabBarProps'
import { PlansTabNavigatorPropsT } from '../../../types/PlansTabNavigatorProps'
import { RootStackPropsT } from '../../../types/RootStackProps'
import { TabNavigatorPropsT } from '../../../types/TabNavigatorProps'
import TabBar from '../../TabBar'
import DashboardScreen from '../DashboardScreen'
import NotificationsScreen from '../Notifications/NotificationsScreen'
import MembersScreen from './MembersScreen'
import ScheduleScreen from './ScheduleScreen'

type NavigationPropsT = CompositeScreenProps<
  StackScreenProps<PlansTabNavigatorPropsT, 'plan'>,
  CompositeScreenProps<
    BottomTabScreenProps<TabNavigatorPropsT, 'plansTab'>,
    StackScreenProps<RootStackPropsT, 'tab'>
  >
>

const connector = connect((state: RootState, props: NavigationPropsT) => ({
  plan: state.plans.data[props.route.params.planId]
}))

type ReduxPropsT = ConnectedProps<typeof connector>

type PropsT = NavigationPropsT & ReduxPropsT

const Tab = createMaterialTopTabNavigator<GroupPlanTabBarPropsT>()

const tabNames = ['Overview', 'Schedule', 'Payments', 'Members', 'Cars']

const PlanScreen = (props: PropsT) => {
  useLayoutEffect(() => {
    props.navigation.setOptions({
      title: props.plan?.name,
      headerStyle: {
        backgroundColor: props.plan?.color,
        shadowColor: 'transparent',
        elevation: 0
      },
      headerTintColor: '#fff',
      headerBackTitleVisible: false
    })
  }, [props.navigation, props.plan?.name, props.plan?.color])

  const renderTabBar = useCallback(
    (tabBarProps: MaterialTopTabBarProps) => (
      <TabBar
        {...tabBarProps}
        backgroundColor={props.plan?.color}
        titles={tabNames}
      />
    ),
    [props.plan?.color, tabNames]
  )

  return (
    <Tab.Navigator tabBar={renderTabBar}>
      <Tab.Screen name="overview" component={DashboardScreen} />
      <Tab.Screen name="schedule" component={ScheduleScreen} />
      <Tab.Screen name="payments" component={DashboardScreen} />
      <Tab.Screen
        name="members"
        component={MembersScreen}
        initialParams={useMemo(
          () => ({ planId: props.plan?.id }),
          [props.plan?.id]
        )}
      />
      <Tab.Screen name="cars" component={NotificationsScreen} />
    </Tab.Navigator>
  )
}

export default memo(connector(PlanScreen))
