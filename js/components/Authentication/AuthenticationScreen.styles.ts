import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  cardContainer: { paddingTop: 150, paddingHorizontal: 20 },
  cardFooterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10
  },
  loginCardFooterText: { textAlign: 'center' },
  signUpCardFooterText: { textAlign: 'center', marginLeft: 10 }
})
