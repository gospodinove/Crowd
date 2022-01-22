import { ColorValue, StyleSheet } from 'react-native'

type PropsT = {
  textColor: ColorValue
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
    peopleCountNumber: {
      fontSize: 11,
      color: 'grey'
    },
    detailsContainer: {
      marginHorizontal: 5
    },
    name: {
      fontSize: 18,
      fontWeight: '600',
      color: props.textColor
    },
    detailsRow: {
      flexDirection: 'row',
      alignItems: 'center'
    },
    date: {
      fontSize: 11,
      color: 'grey'
    }
  })
