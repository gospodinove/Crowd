import React from 'react'
import { View } from 'react-native'
import { assertNever } from '../utils/assertNever'

type PropsT = { color: string; spacing: number } & (
  | {
      type: 'circle'
      size: number
    }
  | {
      type: 'line'
      width: number
    }
)

const renderCircle = (size: number, color: string) => (
  <View
    style={{
      width: size,
      height: size,
      backgroundColor: color,
      borderRadius: size
    }}
  />
)

const renderLine = (width: number, color: string) => (
  <View style={{ height: '100%', width, backgroundColor: color }} />
)

const VerticalSeparator = (props: PropsT) => {
  const renderSeparator = () => {
    switch (props.type) {
      case 'circle':
        return renderCircle(props.size, props.color)
      case 'line':
        return renderLine(props.width, props.color)
      default:
        assertNever(props)
    }
  }

  return (
    <View style={{ marginHorizontal: props.spacing }}>{renderSeparator()}</View>
  )
}

export default VerticalSeparator
