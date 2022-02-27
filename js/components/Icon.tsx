import React, { memo } from 'react'
import { ViewStyle } from 'react-native'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5'
import { useAppTheme } from '../hooks/useAppTheme'
import { ColorNameT } from '../types/ColorName'
import { IconNameT } from '../types/IconName'
import { isColorName } from '../utils/theme'

type PropsT = {
  name: IconNameT
  size: number
  // string is used only due to TabBarNavigator
  color: ColorNameT | string
  style?: ViewStyle
}

const Icon = (props: PropsT) => {
  const theme = useAppTheme()

  switch (props.name) {
    default:
      return (
        <FontAwesomeIcon
          name={props.name}
          size={props.size}
          color={
            isColorName(props.color) ? theme.colors[props.color] : props.color
          }
          style={props.style}
        />
      )
  }
}

export default memo(Icon)
