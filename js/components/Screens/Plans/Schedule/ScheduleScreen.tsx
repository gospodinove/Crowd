import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import { MaterialTopTabScreenProps } from '@react-navigation/material-top-tabs'
import { CompositeScreenProps } from '@react-navigation/native'
import { StackScreenProps } from '@react-navigation/stack'
import React, { memo, useCallback, useEffect, useMemo } from 'react'
import {
  SectionList,
  SectionListData,
  SectionListRenderItemInfo,
  StyleSheet
} from 'react-native'
import { connect, ConnectedProps } from 'react-redux'
import { useAppTheme } from '../../../../hooks/useAppTheme'
import { plansSlice } from '../../../../reducers/plans'
import { RootState } from '../../../../redux/store'
import { EventT } from '../../../../types/Event'
import { GroupPlanTabBarPropsT } from '../../../../types/GroupPlanTabBarProps'
import { PlansTabNavigatorPropsT } from '../../../../types/PlansTabNavigatorProps'
import { RootStackPropsT } from '../../../../types/RootStackProps'
import { TabNavigatorPropsT } from '../../../../types/TabNavigatorProps'
import { groupEventsByDate } from '../../../../utils/date'
import {
  fetchPlanEventsLoader,
  refreshPlanEventsLoader
} from '../../../../utils/loaders'
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

const connector = connect(
  (state: RootState, props: NavigationPropsT) => ({
    events: state.plans.eventsForPlanId[props.route.params?.planId],
    isFetching: state.loaders.runningLoaders[fetchPlanEventsLoader] ?? false,
    isRefreshing: state.loaders.runningLoaders[refreshPlanEventsLoader] ?? false
  }),
  {
    fetch: plansSlice.actions.fetchEventsForPlanId
  }
)

type ReduxPropsT = ConnectedProps<typeof connector>

type PropsT = NavigationPropsT & ReduxPropsT

const ScheduleScreen = (props: PropsT) => {
  const theme = useAppTheme()

  const style = useMemo(
    () =>
      StyleSheet.create({
        container: { backgroundColor: theme.colors.background },
        scrollContainer: { padding: 20 }
      }),
    [theme]
  )

  useEffect(() => {
    if (!props.events) {
      props.fetch({ planId: props.route.params.planId })
    }
  }, [])

  const sections: SectionListData<EventT>[] = useMemo(() => {
    if (!props.events) {
      return []
    }

    return groupEventsByDate(props.events)
  }, [props.events])

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

  const onRefresh = useCallback(
    () =>
      props.fetch({
        planId: props.route.params.planId,
        loader: refreshPlanEventsLoader
      }),
    [props.fetch, props.route.params.planId]
  )

  return (
    <LoaderOrChildren
      isLoading={props.isFetching}
      size="large"
      color="text"
      containerStyle={style.container}
    >
      <SectionList<EventT>
        sections={sections}
        contentContainerStyle={style.scrollContainer}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        onRefresh={onRefresh}
        refreshing={props.isRefreshing}
      />
    </LoaderOrChildren>
  )
}

export default memo(connector(ScheduleScreen))
