import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import { MaterialTopTabScreenProps } from '@react-navigation/material-top-tabs'
import { CompositeScreenProps } from '@react-navigation/native'
import { StackScreenProps } from '@react-navigation/stack'
import React, { memo, useCallback } from 'react'
import {
  SectionList,
  SectionListData,
  SectionListRenderItemInfo
} from 'react-native'
import { useAppTheme } from '../../../hooks/useAppTheme'
import { GroupPlanTabBarPropsT } from '../../../types/GroupPlanTabBarProps'
import { PlansTabNavigatorPropsT } from '../../../types/PlansTabNavigatorProps'
import { RootStackPropsT } from '../../../types/RootStackProps'
import { TabNavigatorPropsT } from '../../../types/TabNavigatorProps'
import Text from '../../Text'

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

const mockData: SectionListData<string>[] = [
  { title: 'test', data: ['test', 'test'] },
  { title: 'test 2', data: ['test', 'test'] }
]

const ScheduleScreen = (props: PropsT) => {
  const theme = useAppTheme()

  const renderItem = useCallback(
    (info: SectionListRenderItemInfo<string>) => (
      <Text weight="regular" lineHeight={20} size={20}>
        {info.item}
      </Text>
    ),
    []
  )

  const renderSectionHeader = useCallback(
    (info: { section: SectionListData<string> }) => (
      <Text weight="semibold" lineHeight={30} size={30}>
        {info.section.title}
      </Text>
    ),
    []
  )

  return (
    <SectionList<string>
      sections={mockData}
      renderItem={renderItem}
      renderSectionHeader={renderSectionHeader}
    />
  )
}

export default memo(ScheduleScreen)
