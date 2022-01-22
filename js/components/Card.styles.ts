import { ColorValue, StyleSheet } from 'react-native'

type PropsT = {
  backgroundColor: ColorValue
  borderColor: ColorValue
}

export const cardStyles = (props: PropsT) =>
  StyleSheet.create({
    container: {
      backgroundColor: props.backgroundColor,
      borderColor: props.borderColor,
      borderWidth: 1,
      borderRadius: 10,
      paddingHorizontal: 20,
      paddingVertical: 10
    }
  })
