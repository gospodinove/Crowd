import { ReactNode } from 'react'
import { TextProps as RNTextProps } from 'react-native'
import { ColorNameT } from './ColorName'

export type TextPropsT = Omit<RNTextProps, 'style' | 'numberOfLines'> & {
  children: ReactNode
  weight: 'regular' | 'semibold'
  size: number
  lineHeight: number
  color?: ColorNameT
  numberOfLines?: number
  style?: Omit<
    RNTextProps['style'],
    'fontSize' | 'lineheight' | 'color' | 'fontWeight'
  >
}
