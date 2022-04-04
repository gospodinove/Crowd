import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import { CompositeScreenProps } from '@react-navigation/core'
import {
  createMaterialTopTabNavigator,
  MaterialTopTabBarProps
} from '@react-navigation/material-top-tabs'
import { StackScreenProps } from '@react-navigation/stack'
import React, { memo, useCallback, useLayoutEffect, useMemo } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { useAppTheme } from '../../../hooks/useAppTheme'
import { RootState } from '../../../redux/store'
import { GroupPlanTabBarPropsT } from '../../../types/GroupPlanTabBarProps'
import { PlansTabNavigatorPropsT } from '../../../types/PlansTabNavigatorProps'
import { RootStackPropsT } from '../../../types/RootStackProps'
import { TabNavigatorPropsT } from '../../../types/TabNavigatorProps'
import IconButton from '../../IconButton'
import TabBar from '../../TabBar'
import DashboardScreen from '../DashboardScreen'
import NotificationsScreen from '../Notifications/NotificationsScreen'
import MembersScreen from './MembersScreen'
import ScheduleScreen from './Schedule/ScheduleScreen'

type NavigationPropsT = CompositeScreenProps<
  StackScreenProps<PlansTabNavigatorPropsT, 'plan'>,
  CompositeScreenProps<
    BottomTabScreenProps<TabNavigatorPropsT, 'plansTab'>,
    StackScreenProps<RootStackPropsT, 'tab'>
  >
>

const connector = connect((state: RootState, props: NavigationPropsT) => ({
  plan: state.plans[props.route.params.planId]
}))

type ReduxPropsT = ConnectedProps<typeof connector>

type PropsT = NavigationPropsT & ReduxPropsT

const Tab = createMaterialTopTabNavigator<GroupPlanTabBarPropsT>()

const tabNames = ['Overview', 'Schedule', 'Payments', 'Members', 'Cars']

const PlanScreen = (props: PropsT) => {
  const theme = useAppTheme()

  const onNavBarButtonPress = useCallback(() => {
    switch (
      props.navigation.getState().routes.find(route => route.name === 'plan')
        ?.state?.index
    ) {
      case 1:
        props.navigation.push('modals', {
          screen: 'createPlanEvent',
          params: {
            planId: props.route.params.planId
          }
        })
        break

      case 2:
      // TODO: new expense
      case 3:
        props.navigation.push('modals', {
          screen: 'inviteMembers',
          params: {
            planId: props.route.params.planId,
            userIds: props.plan?.userIds ?? []
          }
        })
        break

      default:
        return null
    }
  }, [props.navigation, props.route.params.planId, props.plan?.userIds])

  const renderHeaderRight = useCallback(() => {
    const state = props.navigation
      .getState()
      .routes.find(route => route.name === 'plan')?.state

    if (!state) {
      return null
    }

    switch (state.index) {
      case 1:
      case 2:
      case 3:
        return (
          <IconButton
            iconName="plus"
            size={32}
            color="white"
            onPress={onNavBarButtonPress}
          />
        )
      default:
        return null
    }
  }, [props.navigation, theme, onNavBarButtonPress])

  useLayoutEffect(() => {
    props.navigation.setOptions({
      title: props.plan?.name,
      headerStyle: {
        backgroundColor: props.plan?.color,
        shadowColor: 'transparent',
        elevation: 0
      },
      headerRight: renderHeaderRight,
      headerTintColor: '#fff',
      headerBackTitleVisible: false
    })
  }, [
    props.navigation,
    props.plan?.name,
    props.plan?.color,
    theme,
    renderHeaderRight
  ])

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
      <Tab.Screen
        name="schedule"
        component={ScheduleScreen}
        initialParams={useMemo(
          () => ({ planId: props.plan?.id }),
          [props.plan?.id]
        )}
      />
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
