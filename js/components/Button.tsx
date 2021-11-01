import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import React from 'react'
import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle
} from 'react-native'

type PropsT = Omit<TouchableOpacityProps, 'style'> & {
  text: string
  size: 'large' | 'medium' | 'small'
  type: 'primary' | 'secondary' | 'text' | 'rounded' | 'custom'
  isLoading?: boolean
  style?: Omit<ViewStyle, 'backgroundColor'>
  leftIcon?: IconProp
  rightIcon?: IconProp
}

const Button = (props: PropsT) => {
  const getBackgroundColor = (): string => {
    switch (props.type) {
      case 'primary':
      case 'rounded':
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
      case 'rounded':
        return '#fff'
      case 'secondary':
        return '#000'
      case 'text':
        return 'grey'
      case 'custom':
        return '#000'
    }
  }

  const getLoaderSize = () => {
    switch (props.size) {
      case 'small':
      case 'medium':
        return 'small'
      case 'large':
        return 'large'
    }
  }

  const renderContent = (): JSX.Element => {
    if (props.isLoading) {
      return <ActivityIndicator size={getLoaderSize()} />
    }

    return (
      <>
        {props.leftIcon ? (
          <FontAwesomeIcon
            icon={props.leftIcon}
            color={getTextColor()}
            style={{ marginRight: 5 }}
          />
        ) : null}

        <Text
          style={{ lineHeight: 20, color: getTextColor(), textAlign: 'center' }}
        >
          {props.text}
        </Text>

        {props.rightIcon ? (
          <FontAwesomeIcon
            icon={props.rightIcon}
            color={getTextColor()}
            style={{ marginLeft: 5 }}
          />
        ) : null}
      </>
    )
  }

  return (
    <TouchableOpacity
      {...props}
      style={[
        props.style,
        {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: getBackgroundColor(),
          paddingVertical: props.type !== 'text' ? 10 : 0,
          paddingHorizontal: props.type !== 'text' ? 10 : 0,
          borderRadius: props.type === 'rounded' ? 100 : 10
        }
      ]}
      activeOpacity={0.6}
    >
      {renderContent()}
    </TouchableOpacity>
  )
}

export default Button
