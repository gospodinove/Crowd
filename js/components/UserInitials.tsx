import { capitalize } from 'lodash'
import React, { memo, useMemo } from 'react'
import { View, ViewStyle } from 'react-native'
import { UserT } from '../types/User'
import Text from './Text'

type PropsT = {
  user: UserT
  backgroundColor: string
  textColor: string
  containerStyle?: Omit<ViewStyle, 'backgroundColor'>
}

const UserInitials = (props: PropsT) => {
  return (
    <View
      style={useMemo(
        () => [
          props.containerStyle,
          {
            width: 40,
            height: 40,
            borderRadius: 25,
            backgroundColor: props.backgroundColor,
            justifyContent: 'center',
            alignItems: 'center'
          }
        ],
        [props.containerStyle, props.backgroundColor]
      )}
    >
      <Text weight="semibold" size={20} lineHeight={25} color={props.textColor}>
        {capitalize(props.user.firstName[0]) +
          capitalize(props.user.lastName[0])}
      </Text>
    </View>
  )
}

export default memo(UserInitials)
