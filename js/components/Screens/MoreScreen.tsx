import { StackScreenProps } from '@react-navigation/stack'
import React, { memo, useLayoutEffect, useMemo } from 'react'
import { View } from 'react-native'
import { connect, ConnectedProps } from 'react-redux'
import { useAppTheme } from '../../hooks/useAppTheme'
import { userSlice } from '../../reducers/user'
import { MoreTabNavigatorPropsT } from '../../types/MoreTabNavigatorProps'
import IconButton from '../IconButton'

type NavigationPropsT = StackScreenProps<MoreTabNavigatorPropsT, 'more'>

const connector = connect(null, { logout: userSlice.actions.logout })

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
          color={theme.colors.icon}
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
