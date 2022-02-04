import React, { memo, useMemo } from 'react'
import { ActivityIndicator, View, ViewStyle } from 'react-native'
import { useAppTheme } from '../hooks/useAppTheme'
import { styles } from './LoaderOrChildren.styles'

type PropsT = {
  isLoading: boolean
  size: 'large' | 'small'
  color: string
  children: JSX.Element
  containerStyle?: ViewStyle
}

const LoaderOrChildren = (props: PropsT) => {
  const theme = useAppTheme()

  const style = useMemo(
    () =>
      styles({
        container: props.containerStyle,
        loaderContainerBackground: theme.colors.background
      }),
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

export default memo(LoaderOrChildren)
