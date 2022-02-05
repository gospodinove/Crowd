import { TextProps as RNTextProps } from 'react-native'

export type TextPropsT = Omit<RNTextProps, 'style' | 'numberOfLines'> & {
  children: string | number
  weight: 'regular' | 'semibold'
  size: number
  lineHeight: number
  color?: string
  numberOfLines?: number
  style?: Omit<
    RNTextProps['style'],
    'fontSize' | 'lineheight' | 'color' | 'fontWeight'
  >
}
