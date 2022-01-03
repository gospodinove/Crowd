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

    const lineHeight = getLineHeight()
    const textColor = getTextColor()
    const fontSize = getFontSize()

    return (
      <>
        {props.leftIcon ? (
          <FontAwesomeIcon
            icon={props.leftIcon}
            color={getTextColor()}
            style={useMemo(() => ({ marginRight: 5 }), [])}
          />
        ) : null}

        <Text
          style={useMemo(
            () => ({
              lineHeight,
              color: textColor,
              textAlign: 'center',
              fontSize
            }),
            [lineHeight, textColor, fontSize]
          )}
        >
          {props.text}
        </Text>

        {props.rightIcon ? (
          <FontAwesomeIcon
            icon={props.rightIcon}
            color={getTextColor()}
            style={useMemo(() => ({ marginLeft: 5 }), [])}
          />
        ) : null}
      </>
    )
  }

  return (
    <TouchableOpacity
      {...props}
      style={useMemo(
        () => [
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
        ],
        [props.style]
      )}
      activeOpacity={0.6}
    >
      {renderContent()}
    </TouchableOpacity>
  )
}

export default memo(Button)
