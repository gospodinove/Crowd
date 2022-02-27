export type ColorNameT =
  | 'primary'
  | 'background'
  | 'secondaryBackground'
  | 'text'
  | 'border'
  | 'icon'
  | 'black'
  | 'white'
  | 'grey'

export type ThemeT = {
  colors: {
    [Key in ColorNameT]: string
  }
}
