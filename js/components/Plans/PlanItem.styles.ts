import { ColorValue, StyleSheet } from 'react-native'

type PropsT = {
  avatarBackgroundColor: ColorValue
}

export const planItemStyles = (props: PropsT) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      marginHorizontal: 20,
      paddingVertical: 10,
      alignItems: 'center'
    },
    avatar: {
      width: 50,
      height: 50,
      backgroundColor: props.avatarBackgroundColor,
      borderRadius: 25,
      justifyContent: 'center',
      alignItems: 'center'
    },
    detailsContainer: {
      marginHorizontal: 5
    },
    detailsRow: {
      flexDirection: 'row',
      alignItems: 'center'
    }
  })
