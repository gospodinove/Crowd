import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import { CompositeScreenProps } from '@react-navigation/core'
import { StackScreenProps } from '@react-navigation/stack'
import React, { memo, useCallback } from 'react'
import { FlatList, ListRenderItemInfo } from 'react-native'
import { useAppTheme } from '../../../hooks/useAppTheme'
import { NotificationsTabNavigatorPropsT } from '../../../types/NotificationsTabNavigatorProps'
import { RootStackPropsT } from '../../../types/RootStackProps'
import { TabNavigatorPropsT } from '../../../types/TabNavigatorProps'
import LoaderOrChildren from '../../LoaderOrChildren'
import Text from '../../Text'

type NavigationPropsT = CompositeScreenProps<
  StackScreenProps<NotificationsTabNavigatorPropsT, 'notifications'>,
  CompositeScreenProps<
    BottomTabScreenProps<TabNavigatorPropsT, 'notificationsTab'>,
    StackScreenProps<RootStackPropsT, 'tab'>
  >
>

type PropsT = NavigationPropsT

const NotificationsScreen = (props: PropsT) => {
  const theme = useAppTheme()

  const renderItem = useCallback(
    (info: ListRenderItemInfo<string>) => (
      <Text weight="regular" size={15} lineHeight={15}>
        {info.item}
      </Text>
    ),
    []
  )

  return (
    <LoaderOrChildren isLoading={false} size="large" color={theme.colors.text}>
      <FlatList
        data={['n', 'o', 't', 'i', 'f', 'i', 'c', 'a', 't', 'i', 'o', 'n', 's']}
        renderItem={renderItem}
      />
    </LoaderOrChildren>
  )
}

export default memo(NotificationsScreen)
