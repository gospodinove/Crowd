import React, { memo, useMemo } from 'react'
import { View } from 'react-native'
import { useAppTheme } from '../hooks/useAppTheme'
import { ColorNameT } from '../types/ColorName'
import { assertNever } from '../utils/assertNever'
import Text from './Text'

type CharacterSeparatorsT = 'dash' | 'long-dash' | 'arrow-left' | 'arrow-right'

type PropsT = { color: ColorNameT; spacing: number } & (
  | {
      type: 'circle'
      size: number
    }
  | {
      type: 'line'
      width: number
    }
  | {
      type: CharacterSeparatorsT
      size: number
    }
)

const renderCircle = (size: number, color: string) => (
  <View
    style={useMemo(
      () => ({
        width: size,
        height: size,
        backgroundColor: color,
        borderRadius: size
      }),
      [size, color]
    )}
  />
)

const renderLine = (width: number, color: string) => (
  <View
    style={useMemo(
      () => ({ height: '100%', width, backgroundColor: color }),
      [width, color]
    )}
  />
)

const getCharater = (characterType: CharacterSeparatorsT) => {
  switch (characterType) {
    case 'dash':
      return '-'
    case 'long-dash':
      return '\u2014'
    case 'arrow-left':
      return '\u2190'
    case 'arrow-right':
      return '\u2192'
    default:
      assertNever(characterType)
  }
}

const renderCharacter = (
  characterType: CharacterSeparatorsT,
  size: number,
  color: ColorNameT
) => (
  <Text size={size} color={color} lineHeight={20} weight="regular">
    {getCharater(characterType)}
  </Text>
)

const VerticalSeparator = (props: PropsT) => {
  const theme = useAppTheme()

  const renderSeparator = () => {
    switch (props.type) {
      case 'circle':
        return renderCircle(props.size, theme.colors[props.color])
      case 'line':
        return renderLine(props.width, theme.colors[props.color])
      case 'dash':
      case 'long-dash':
      case 'arrow-left':
      case 'arrow-right':
        return renderCharacter(props.type, props.size, props.color)
      default:
        assertNever(props)
    }
  }

  return (
    <View
      style={useMemo(
        () => ({ marginHorizontal: props.spacing }),
        [props.spacing]
      )}
    >
      {renderSeparator()}
    </View>
  )
}

export default memo(VerticalSeparator)
