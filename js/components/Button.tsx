import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import React, { memo, useMemo } from 'react'
import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle
} from 'react-native'
import { assertNever } from '../utils/assertNever'
import { buttonStyles } from './Button.styles'

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
      default:
        assertNever(props.type)
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
      default:
        assertNever(props.type)
    }
  }

  const getLoaderSize = () => {
    switch (props.size) {
      case 'small':
      case 'medium':
        return 'small'
      case 'large':
        return 'large'
      default:
        assertNever(props.size)
    }
  }

  const getFontSize = () => {
    switch (props.size) {
      case 'large':
        return 22
      case 'medium':
        return 15
      case 'small':
        return 11
      default:
        assertNever(props.size)
    }
  }

  const getLineHeight = () => {
    switch (props.size) {
      case 'large':
        return 40
      case 'medium':
        return 20
      case 'small':
        return 15
      default:
        assertNever(props.size)
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
            style={style.leftIcon}
          />
        ) : null}

        <Text style={style.text}>{props.text}</Text>

        {props.rightIcon ? (
          <FontAwesomeIcon
            icon={props.rightIcon}
            color={getTextColor()}
            style={style.rightIcon}
          />
        ) : null}
      </>
    )
  }

  const lineHeight = getLineHeight()
  const textColor = getTextColor()
  const fontSize = getFontSize()
  const backgroundColor = getBackgroundColor()

  const style = useMemo(
    () =>
      buttonStyles({
        text: {
          lineHeight,
          color: textColor,
          fontSize
        },
        container: {
          ...props.style,
          backgroundColor,
          paddingVertical: props.type !== 'text' ? 10 : 0,
          paddingHorizontal: props.type !== 'text' ? 10 : 0,
          borderRadius: props.type === 'rounded' ? 100 : 10
        }
      }),
    [lineHeight, textColor, fontSize, backgroundColor, props.style, props.type]
  )

  return (
    <TouchableOpacity {...props} style={style.container} activeOpacity={0.6}>
      {renderContent()}
    </TouchableOpacity>
  )
}

export default memo(Button)
