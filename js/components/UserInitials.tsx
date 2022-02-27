import { capitalize } from 'lodash'
import React, { memo, useMemo } from 'react'
import { View, ViewStyle } from 'react-native'
import { useAppTheme } from '../hooks/useAppTheme'
import { ColorNameT } from '../types/ColorName'
import { UserT } from '../types/User'
import Text from './Text'

type PropsT = {
  user: UserT
  backgroundColor: ColorNameT
  textColor: ColorNameT
  containerStyle?: Omit<ViewStyle, 'backgroundColor'>
}

const UserInitials = (props: PropsT) => {
  const theme = useAppTheme()

  return (
    <View
      style={useMemo(
        () => [
          props.containerStyle,
          {
            width: 40,
            height: 40,
            borderRadius: 25,
            backgroundColor: theme.colors[props.backgroundColor],
            justifyContent: 'center',
            alignItems: 'center'
          }
        ],
        [props.containerStyle, props.backgroundColor, theme]
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
