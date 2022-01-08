import { StackScreenProps } from '@react-navigation/stack'
import React, { memo, useLayoutEffect } from 'react'
import { View } from 'react-native'
import { connect, ConnectedProps } from 'react-redux'
import { userSlice } from '../reducers/user'
import { MoreTabNavigatorPropsT } from '../types/MoreTabNavigatorProps'
import IconButton from './IconButton'

type NavigationPropsT = StackScreenProps<MoreTabNavigatorPropsT, 'more'>

const connector = connect(null, { logout: userSlice.actions.logout })

type ReduxPropsT = ConnectedProps<typeof connector>

type PropsT = NavigationPropsT & ReduxPropsT

const MoreScreen = (props: PropsT) => {
  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <IconButton
          iconName="sign-out-alt"
          size={32}
          color="black"
          onPress={() => props.logout()}
        />
      )
    })
  }, [props.navigation, props.logout])

  return <View></View>
}

export default memo(connector(MoreScreen))
