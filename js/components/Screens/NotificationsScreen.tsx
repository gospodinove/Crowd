import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import { CompositeScreenProps } from '@react-navigation/core'
import { StackScreenProps } from '@react-navigation/stack'
import React, { memo, useMemo } from 'react'
import { View } from 'react-native'
import { useAppTheme } from '../../hooks/useAppTheme'
import { NotificationsTabNavigatorPropsT } from '../../types/NotificationsTabNavigatorProps'
import { RootStackPropsT } from '../../types/RootStackProps'
import { TabNavigatorPropsT } from '../../types/TabNavigatorProps'

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

  return (
    <View
      style={useMemo(
        () => ({ backgroundColor: theme.colors.background, flex: 1 }),
        [theme]
      )}
    ></View>
  )
}

export default memo(NotificationsScreen)
