import React, { memo } from 'react'
import { ColorValue, ViewStyle } from 'react-native'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5'
import { IconNameT } from '../types/IconName'

type PropsT = {
  name: IconNameT
  size: number
  color: ColorValue
  style?: ViewStyle
}

const Icon = (props: PropsT) => {
  switch (props.name) {
    default:
      return (
        <FontAwesomeIcon
          name={props.name}
          size={props.size}
          color={props.color}
          style={props.style}
        />
      )
  }
}

export default memo(Icon)
