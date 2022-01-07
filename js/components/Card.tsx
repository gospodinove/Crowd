import React, { memo } from 'react'
import { View, ViewProps } from 'react-native'
import { cardStyles } from './Card.styles'

type PropsT = ViewProps & {
  children: JSX.Element[] | null
}

const Card = (props: PropsT) => {
  return <View style={cardStyles.container}>{props.children}</View>
}

export default memo(Card)
