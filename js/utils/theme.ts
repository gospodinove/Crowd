import { ColorNameT } from '../types/ColorName'

export const isColorName = (value: string): value is ColorNameT => {
  // TODO: figure out how to get this dynamically from ColorNameT
  const allowedKeys: string[] = [
    'primary',
    'background',
    'secondaryBackground',
    'text',
    'border',
    'icon',
    'black',
    'white',
    'grey'
  ]

  return allowedKeys.indexOf(value) !== -1
}
