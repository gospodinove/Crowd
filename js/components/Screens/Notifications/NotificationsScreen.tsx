import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import { CompositeScreenProps } from '@react-navigation/core'
import { StackScreenProps } from '@react-navigation/stack'
import React, { memo, useCallback, useEffect } from 'react'
import { FlatList, ListRenderItemInfo } from 'react-native'
import { connect, ConnectedProps } from 'react-redux'
import { useAppTheme } from '../../../hooks/useAppTheme'
import { notificationsSlice } from '../../../reducers/notifications'
import { RootState } from '../../../redux/store'
import { NotificationT } from '../../../types/Notification'
import { NotificationsTabNavigatorPropsT } from '../../../types/NotificationsTabNavigatorProps'
import { RootStackPropsT } from '../../../types/RootStackProps'
import { TabNavigatorPropsT } from '../../../types/TabNavigatorProps'
import {
  fetchNotificationsLoader,
  refreshNotificationsLoader
} from '../../../utils/loaders'
import LoaderOrChildren from '../../LoaderOrChildren'
import Text from '../../Text'

type NavigationPropsT = CompositeScreenProps<
  StackScreenProps<NotificationsTabNavigatorPropsT, 'notifications'>,
  CompositeScreenProps<
    BottomTabScreenProps<TabNavigatorPropsT, 'notificationsTab'>,
    StackScreenProps<RootStackPropsT, 'tab'>
  >
>

const connector = connect(
  (state: RootState) => ({
    notifications: state.notifications,
    isLoading: state.loaders.runningLoaders[fetchNotificationsLoader],
    isRefreshing:
      state.loaders.runningLoaders[refreshNotificationsLoader] ?? false
  }),
  { fetch: notificationsSlice.actions.fetch }
)

type ReduxPropsT = ConnectedProps<typeof connector>

type PropsT = ReduxPropsT & NavigationPropsT

const NotificationsScreen = (props: PropsT) => {
  const theme = useAppTheme()

  useEffect(() => {
    props.fetch({ loader: fetchNotificationsLoader })
  }, [])

  const onRefresh = useCallback(
    () => props.fetch({ loader: refreshNotificationsLoader }),
    []
  )

  const renderItem = useCallback(
    (info: ListRenderItemInfo<NotificationT>) => (
      <Text weight="regular" size={15} lineHeight={15}>
        {info.item.title}
      </Text>
    ),
    []
  )

  return (
    <LoaderOrChildren
      isLoading={props.isLoading}
      size="large"
      color={theme.colors.text}
    >
      <FlatList<NotificationT>
        data={props.notifications ?? []}
        renderItem={renderItem}
        onRefresh={onRefresh}
        refreshing={props.isRefreshing}
      />
    </LoaderOrChildren>
  )
}

export default memo(connector(NotificationsScreen))
