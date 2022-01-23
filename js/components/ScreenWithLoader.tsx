import React, { memo, useMemo } from 'react'
import { ActivityIndicator, View, ViewStyle } from 'react-native'
import { styles } from './ScreenWithLoader.styles'

type PropsT = {
  isLoading: boolean
  size: 'large' | 'small'
  color: string
  children: JSX.Element
  containerStyle?: ViewStyle
}

const ScreenWithLoader = (props: PropsT) => {
  const style = useMemo(
    () => styles({ container: props.containerStyle }),
    [props.containerStyle]
  )

  return (
    <View style={style.container}>
      {props.children}

      {props.isLoading ? (
        <View style={style.loaderContainer}>
          <ActivityIndicator animating size={props.size} color={props.color} />
        </View>
      ) : null}
    </View>
  )
}

export default memo(ScreenWithLoader)
