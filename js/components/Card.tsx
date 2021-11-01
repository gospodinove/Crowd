import React from 'react'
import { View, ViewProps } from 'react-native'

type PropsT = ViewProps & {
  children: Element | null
}

const Card = (props: PropsT) => {
  return (
    <View
      style={{
        backgroundColor: '#fff',
        borderColor: '#000',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 20,
        paddingVertical: 10
      }}
    >
      {props.children}
    </View>
  )
}

export default Card
