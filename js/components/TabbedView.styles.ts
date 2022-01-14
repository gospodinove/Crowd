import { ColorValue, StyleSheet } from 'react-native'

type PropsT = {
  tabBarBackgroundColor: ColorValue
}

export const tabbedViewStyle = (props: PropsT) =>
  StyleSheet.create({
    tabBarContainer: {
      height: 40,
      backgroundColor: props.tabBarBackgroundColor
    },
    tabBarItem: {
      paddingHorizontal: 20,
      justifyContent: 'center'
    },
    tabBarItemTitle: {
      color: 'white',
      fontWeight: '600'
    }
  })
