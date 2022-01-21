import { StackScreenProps } from '@react-navigation/stack'
import React, { memo, useContext, useLayoutEffect } from 'react'
import { View } from 'react-native'
import { connect, ConnectedProps } from 'react-redux'
import { userSlice } from '../reducers/user'
import { MoreTabNavigatorPropsT } from '../types/MoreTabNavigatorProps'
import IconButton from './IconButton'
import { ThemeContext } from './ThemeProvider'

type NavigationPropsT = StackScreenProps<MoreTabNavigatorPropsT, 'more'>

const connector = connect(null, { logout: userSlice.actions.logout })

type ReduxPropsT = ConnectedProps<typeof connector>

type PropsT = NavigationPropsT & ReduxPropsT

const MoreScreen = (props: PropsT) => {
  const theme = useContext(ThemeContext)

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

  return <View></View>
}

export default memo(connector(MoreScreen))
