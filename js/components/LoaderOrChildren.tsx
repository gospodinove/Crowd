import React, { memo, useMemo } from 'react'
import { ActivityIndicator, StyleSheet, View, ViewStyle } from 'react-native'
import { useAppTheme } from '../hooks/useAppTheme'
import { ColorNameT } from '../types/ColorName'

type PropsT = {
  isLoading: boolean
  size: 'large' | 'small'
  color: ColorNameT
  children: JSX.Element
  containerStyle?: ViewStyle
}

const LoaderOrChildren = (props: PropsT) => {
  const theme = useAppTheme()

  const style = useMemo(
    () =>
      StyleSheet.create({
        container: {
          ...props.containerStyle,
          flex: 1,
          justifyContent: 'center'
        },
        loaderContainer: {
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: theme.colors.background
        }
      }),
    [props.containerStyle, theme]
  )

  return (
    <View style={style.container}>
      {props.children}

      {props.isLoading ? (
        <View style={style.loaderContainer}>
          <ActivityIndicator
            animating
            size={props.size}
            color={theme.colors[props.color]}
          />
        </View>
      ) : null}
    </View>
  )
}

export default memo(LoaderOrChildren)
