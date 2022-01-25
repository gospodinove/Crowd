import { StyleSheet } from 'react-native'

type PropsT = {
  textColor: string
}

export const tabBarStyles = (props: PropsT) =>
  StyleSheet.create({
    tabBarItem: {
      paddingHorizontal: 20,
      justifyContent: 'center'
    },
    tabBarItemName: { color: props.textColor, fontWeight: '600' }
  })
