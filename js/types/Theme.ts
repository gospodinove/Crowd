import { Theme as RNTheme } from '@react-navigation/native'

type CustomColors = {
  secondaryBackground: string
  icon: string
}

export type Theme = RNTheme & {
  colors: CustomColors
}
