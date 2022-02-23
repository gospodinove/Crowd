import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import { CompositeScreenProps } from '@react-navigation/core'
import { StackScreenProps } from '@react-navigation/stack'
import React, { memo, ReactElement, useCallback, useEffect } from 'react'
import { FlatList, ListRenderItemInfo, StyleSheet, View } from 'react-native'
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
import NotificationItem from './NotificationItem'

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

  const style = styles({ backgroundColor: theme.colors.background })

  useEffect(() => {
    props.fetch({ loader: fetchNotificationsLoader })
  }, [])

  const onRefresh = useCallback(
    () => props.fetch({ loader: refreshNotificationsLoader }),
    []
  )

  const renderItem = useCallback(
    (info: ListRenderItemInfo<NotificationT>) => (
      <NotificationItem data={info.item} />
    ),
    []
  )

  const maybeRenderEmptyView = useCallback((): ReactElement | null => {
    if (props.notifications.length) {
      return null
    }

    return (
      <View style={style.emptyViewContainer}>
        <Text
          weight="regular"
          lineHeight={30}
          color={theme.colors.text}
          size={20}
        >
          No notifications
        </Text>
      </View>
    )
  }, [props.notifications.length])

  return (
    <LoaderOrChildren
      isLoading={props.isLoading}
      size="large"
      color={theme.colors.text}
      containerStyle={style.loaderContainerStyle}
    >
      <>
        <FlatList<NotificationT>
          data={props.notifications}
          renderItem={renderItem}
          onRefresh={onRefresh}
          refreshing={props.isRefreshing}
          contentContainerStyle={style.listContentContainerStyle}
        />

        {maybeRenderEmptyView()}
      </>
    </LoaderOrChildren>
  )
}

const styles = (params: { backgroundColor: string }) =>
  StyleSheet.create({
    loaderContainerStyle: { backgroundColor: params.backgroundColor },
    listContentContainerStyle: { padding: 20 },
    emptyViewContainer: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: params.backgroundColor
    }
  })

export default memo(connector(NotificationsScreen))
