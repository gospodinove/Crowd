import { StyleSheet, ViewStyle } from 'react-native'

type PropsT = {
  container?: ViewStyle
}

export const buttonStyles = (props: PropsT) =>
  StyleSheet.create({
    leftIcon: { marginRight: 5 },
    text: { textAlign: 'center' },
    rightIcon: { marginLeft: 5 },
    container: {
      ...props.container,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center'
    }
  })
