import React from 'react'
import { ActivityIndicator, View, ViewStyle } from 'react-native'

type PropsT = {
  isLoading: boolean
  size: 'large' | 'small'
  children: JSX.Element
  containerStyle?: ViewStyle
}

const LoaderOrChildren = (props: PropsT) => {
  return (
    <View style={[{ flex: 1, justifyContent: 'center' }, props.containerStyle]}>
      {props.isLoading ? (
        <ActivityIndicator
          animating
          size={props.size}
          style={{ alignSelf: 'center' }}
        />
      ) : (
        props.children
      )}
    </View>
  )
}

export default LoaderOrChildren
