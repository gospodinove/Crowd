import { StackScreenProps } from '@react-navigation/stack'
import React, { memo, useLayoutEffect } from 'react'
import { PlansTabNavigatorPropsT } from '../../types/PlansTabNavigatorProps'
import DashboardScreen from '../DashboardScreen'
import NotificationsScreen from '../NotificationsScreen'
import TabbedView from '../TabbedView'

type NavigationPropsT = StackScreenProps<PlansTabNavigatorPropsT, 'plan'>

type PropsT = NavigationPropsT

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

  return (
    <TabbedView
      tabs={[
        { key: 'overview', title: 'Overview', screen: DashboardScreen },
        { key: 'schedule', title: 'Schedule', screen: NotificationsScreen },
        { key: 'payments', title: 'Payments', screen: NotificationsScreen },
        { key: 'members', title: 'Members', screen: NotificationsScreen },
        { key: 'cars', title: 'Cars', screen: NotificationsScreen }
      ]}
      backgroundColor={props.route.params.color}
    />
  )
}

export default memo(PlanScreen)
