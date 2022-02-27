import { ColorNameT } from './ColorName'

export type ThemeT = {
  colors: {
    [Key in ColorNameT]: string
  }
}
