import React, { memo, useMemo } from 'react'
import { Pressable } from 'react-native'
import { ColorNameT } from '../types/ColorName'
import { IconNameT } from '../types/IconName'
import Icon from './Icon'

type PropsT = {
  iconName: IconNameT
  size: number
  color: ColorNameT
  onPress: () => void
}

const Padding = 5

const IconButton = (props: PropsT) => {
  return (
    <Pressable
      onPress={props.onPress}
      style={useMemo(() => ({ padding: Padding }), [Padding])}
    >
      <Icon
        name={props.iconName}
        size={props.size - 2 * Padding}
        color={props.color}
      />
    </Pressable>
  )
}

export default memo(IconButton)
