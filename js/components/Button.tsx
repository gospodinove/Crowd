import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import React, { memo, useMemo } from 'react'
import {
  ActivityIndicator,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle
} from 'react-native'
import { useAppTheme } from '../hooks/useAppTheme'
import { assertNever } from '../utils/assertNever'
import { buttonStyles } from './Button.styles'
import Text from './Text'

type PropsT = Omit<TouchableOpacityProps, 'style'> & {
  text: string
  size: 'large' | 'medium' | 'small'
  type: 'primary' | 'secondary' | 'text'
  isLoading?: boolean
  rounded?: boolean
  style?: Omit<ViewStyle, 'backgroundColor'>
  leftIcon?: IconProp
  rightIcon?: IconProp
}

const Button = (props: PropsT) => {
  const theme = useAppTheme()

  const getBackgroundColor = (): string => {
    switch (props.type) {
      case 'primary':
        return theme.colors.primary
      case 'secondary':
        return theme.colors.secondaryBackground
      case 'text':
        return 'transparent'
      default:
        assertNever(props.type)
    }
  }

  const getTextColor = (): string => {
    switch (props.type) {
      case 'primary':
        return theme.colors.white
      case 'secondary':
        return theme.colors.text
      case 'text':
        return theme.colors.text
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

  const getLoaderColor = () => {
    switch (props.type) {
      case 'primary':
        return theme.colors.white
      case 'secondary':
      case 'text':
        return theme.colors.text
      default:
        assertNever(props.type)
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
      return (
        <ActivityIndicator size={getLoaderSize()} color={getLoaderColor()} />
      )
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

        <Text
          weight="regular"
          lineHeight={getLineHeight()}
          color={getTextColor()}
          size={getFontSize()}
          style={style.text}
        >
          {props.text}
        </Text>

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
        container: {
          ...props.style,
          backgroundColor,
          paddingVertical: props.type !== 'text' ? 10 : 0,
          paddingHorizontal: props.type !== 'text' ? 10 : 0,
          borderRadius: props.rounded ? 100 : 10
        }
      }),
    [
      lineHeight,
      textColor,
      fontSize,
      backgroundColor,
      props.style,
      props.type,
      props.rounded
    ]
  )

  return (
    <TouchableOpacity {...props} style={style.container} activeOpacity={0.6}>
      {renderContent()}
    </TouchableOpacity>
  )
}

export default memo(Button)
