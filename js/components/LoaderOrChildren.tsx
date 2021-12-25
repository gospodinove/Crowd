import React from 'react'
import { ActivityIndicator, View, ViewStyle } from 'react-native'

type PropsT = {
  isLoading: boolean
  children: JSX.Element
  containerStyle?: ViewStyle
}

const renderLoader = () => {
  return <ActivityIndicator animating style={{ alignSelf: 'center' }} />
}

const LoaderOrChildren = (props: PropsT) => {
  return (
    <View style={[{ flex: 1, justifyContent: 'center' }, props.containerStyle]}>
      {props.isLoading ? renderLoader() : props.children}
    </View>
  )
}

export default LoaderOrChildren
