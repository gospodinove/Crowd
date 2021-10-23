import React from 'react'
import {
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle
} from 'react-native'

type PropsT = Omit<TouchableOpacityProps, 'style'> & {
  text: string
  size: 'large' | 'medium' | 'small'
  type: 'primary' | 'secondary' | 'text' | 'custom'
  style?: Omit<ViewStyle, 'backgroundColor'>
}

const Button = (props: PropsT) => {
  const getBackgroundColor = (): string => {
    switch (props.type) {
      case 'primary':
        return '#000'
      case 'secondary':
        return 'grey'
      case 'text':
        return 'transparent'
      case 'custom':
        return 'grey'
    }
  }

  const getTextColor = (): string => {
    switch (props.type) {
      case 'primary':
        return '#fff'
      case 'secondary':
        return '#000'
      case 'text':
        return 'grey'
      case 'custom':
        return '#000'
    }
  }

  return (
    <TouchableOpacity
      {...props}
      style={[
        props.style,
        {
          backgroundColor: getBackgroundColor(),
          padding: props.type !== 'text' ? 10 : 0,
          borderRadius: 10
        }
      ]}
      activeOpacity={0.6}
    >
      <Text style={{ color: getTextColor(), textAlign: 'center' }}>
        {props.text}
      </Text>
    </TouchableOpacity>
  )
}

export default Button
