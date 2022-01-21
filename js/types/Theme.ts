import { Theme as RNTheme } from '@react-navigation/native'

type CustomColors = {
  secondaryBackground: string
}

export type Theme = RNTheme & {
  colors: CustomColors
}
