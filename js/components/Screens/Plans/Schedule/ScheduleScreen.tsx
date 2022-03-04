import firestore from '@react-native-firebase/firestore'
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import { MaterialTopTabScreenProps } from '@react-navigation/material-top-tabs'
import { CompositeScreenProps } from '@react-navigation/native'
import { StackScreenProps } from '@react-navigation/stack'
import React, { memo, useCallback, useMemo } from 'react'
import {
  SectionList,
  SectionListData,
  SectionListRenderItemInfo,
  StyleSheet
} from 'react-native'
import { useAppTheme } from '../../../../hooks/useAppTheme'
import { EventT } from '../../../../types/Event'
import { GroupPlanTabBarPropsT } from '../../../../types/GroupPlanTabBarProps'
import { PlansTabNavigatorPropsT } from '../../../../types/PlansTabNavigatorProps'
import { RootStackPropsT } from '../../../../types/RootStackProps'
import { TabNavigatorPropsT } from '../../../../types/TabNavigatorProps'
import LoaderOrChildren from '../../../LoaderOrChildren'
import ScheduleItem from './ScheduleItem'
import ScheduleSectionHeader from './ScheduleSectionHeader'

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

  const style = useMemo(
    () =>
      StyleSheet.create({
        container: { padding: 20, backgroundColor: theme.colors.background }
      }),
    [theme]
  )

  const renderItem = useCallback(
    (info: SectionListRenderItemInfo<EventT>) => (
      <ScheduleItem data={info.item} />
    ),
    []
  )

  const renderSectionHeader = useCallback(
    (info: { section: SectionListData<EventT> }) => (
      <ScheduleSectionHeader title={info.section.title} />
    ),
    []
  )

  return (
    <LoaderOrChildren
      isLoading={false}
      size="large"
      color="text"
      containerStyle={style.container}
    >
      <SectionList<EventT>
        sections={mockData}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
      />
    </LoaderOrChildren>
  )
}

export default memo(ScheduleScreen)
