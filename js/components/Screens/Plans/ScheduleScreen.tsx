import firestore from '@react-native-firebase/firestore'
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
import { EventT } from '../../../types/Event'
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

const date = firestore.Timestamp.fromDate(new Date())

const data: EventT = {
  id: 'hahahah',
  name: 'Beach',
  description: 'Camping Gradina',
  start: date,
  end: date
}

const mockData: SectionListData<EventT>[] = [
  { title: 'Today', data: [data, data] },
  { title: 'Tomorrow', data: [data, data] }
]

const ScheduleScreen = (props: PropsT) => {
  const theme = useAppTheme()

  const renderItem = useCallback(
    (info: SectionListRenderItemInfo<EventT>) => (
      <Text weight="regular" lineHeight={20} size={20}>
        {info.item.name}
      </Text>
    ),
    []
  )

  const renderSectionHeader = useCallback(
    (info: { section: SectionListData<EventT> }) => (
      <Text weight="semibold" lineHeight={30} size={30}>
        {info.section.title}
      </Text>
    ),
    []
  )

  return (
    <SectionList<EventT>
      sections={mockData}
      renderItem={renderItem}
      renderSectionHeader={renderSectionHeader}
    />
  )
}

export default memo(ScheduleScreen)
