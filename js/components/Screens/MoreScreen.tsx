import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import { CompositeScreenProps } from '@react-navigation/core'
import { StackScreenProps } from '@react-navigation/stack'
import React, { memo, useLayoutEffect, useMemo } from 'react'
import { View } from 'react-native'
import { connect, ConnectedProps } from 'react-redux'
import { useAppTheme } from '../../hooks/useAppTheme'
import { usersSlice } from '../../reducers/users'
import { MoreTabNavigatorPropsT } from '../../types/MoreTabNavigatorProps'
import { RootStackPropsT } from '../../types/RootStackProps'
import { TabNavigatorPropsT } from '../../types/TabNavigatorProps'
import IconButton from '../IconButton'

type NavigationPropsT = CompositeScreenProps<
  StackScreenProps<MoreTabNavigatorPropsT, 'more'>,
  CompositeScreenProps<
    BottomTabScreenProps<TabNavigatorPropsT, 'moreTab'>,
    StackScreenProps<RootStackPropsT, 'tab'>
  >
>

const connector = connect(null, { logout: usersSlice.actions.logout })

type ReduxPropsT = ConnectedProps<typeof connector>

type PropsT = NavigationPropsT & ReduxPropsT

const MoreScreen = (props: PropsT) => {
  const theme = useAppTheme()

  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <IconButton
          iconName="sign-out-alt"
          size={32}
          color="icon"
          onPress={() => props.logout()}
        />
      )
    })
  }, [props.navigation, props.logout, theme])

  return (
    <View
      style={useMemo(
        () => ({ backgroundColor: theme.colors.background, flex: 1 }),
        [theme]
      )}
    ></View>
  )
}

export default memo(connector(MoreScreen))
