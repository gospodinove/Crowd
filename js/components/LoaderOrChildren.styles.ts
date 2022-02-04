import { ColorValue, StyleSheet, ViewStyle } from 'react-native'

type PropsT = {
  loaderContainerBackground: ColorValue
  container?: ViewStyle
}

export const styles = (props: PropsT) =>
  StyleSheet.create({
    container: { ...props.container, flex: 1, justifyContent: 'center' },
    loaderContainer: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: props.loaderContainerBackground
    }
  })
