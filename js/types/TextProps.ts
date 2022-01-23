import { TextProps as RNTextProps } from 'react-native'

export type TextPropsT = Omit<RNTextProps, 'style'> & {
  children: string | number
  weight: 'regular' | 'semibold'
  size: number
  lineHeight: number
  color?: string
  style?: Omit<
    RNTextProps['style'],
    'fontSize' | 'lineheight' | 'color' | 'fontWeight'
  >
}
