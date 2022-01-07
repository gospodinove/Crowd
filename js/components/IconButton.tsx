import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import React, { memo, useMemo } from 'react'
import { Pressable } from 'react-native'

type PropsT = {
  iconName: IconProp
  size: number
  color: string
  onPress: () => void
}

const Padding = 5

const IconButton = (props: PropsT) => {
  return (
    <Pressable
      onPress={props.onPress}
      style={useMemo(() => ({ padding: Padding }), [Padding])}
    >
      <FontAwesomeIcon
        icon={props.iconName}
        size={props.size - 2 * Padding}
        color={props.color}
      />
    </Pressable>
  )
}

export default memo(IconButton)
