import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import { MaterialTopTabScreenProps } from '@react-navigation/material-top-tabs'
import { CompositeScreenProps } from '@react-navigation/native'
import { StackScreenProps } from '@react-navigation/stack'
import React, { memo } from 'react'
import { View } from 'react-native'
import { useAppTheme } from '../../../hooks/useAppTheme'
import { GroupPlanTabBarPropsT } from '../../../types/GroupPlanTabBarProps'
import { PlansTabNavigatorPropsT } from '../../../types/PlansTabNavigatorProps'
import { RootStackPropsT } from '../../../types/RootStackProps'
import { TabNavigatorPropsT } from '../../../types/TabNavigatorProps'

type NavigationPropsT = CompositeScreenProps<
  MaterialTopTabScreenProps<GroupPlanTabBarPropsT, 'schedule'>,
  CompositeScreenProps<
    StackScreenProps<PlansTabNavigatorPropsT, 'plans'>,
    CompositeScreenProps<
      BottomTabScreenProps<TabNavigatorPropsT, 'plansTab'>,
      StackScreenProps<RootStackPropsT, 'tab'>
    >
  >
>

type PropsT = NavigationPropsT

const ScheduleScreen = (props: PropsT) => {
  const theme = useAppTheme()

  return <View />
}

export default memo(ScheduleScreen)
