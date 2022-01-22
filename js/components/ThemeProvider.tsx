import React, { createContext, memo, useMemo } from 'react'
import { useColorScheme } from 'react-native'
import { DarkTheme } from '../themes/DarkTheme'
import { LightTheme } from '../themes/LightTheme'
import { ThemeT } from '../types/Theme'

export const ThemeContext = createContext<ThemeT>(LightTheme)

type PropsT = { children: JSX.Element }

const ThemeProvider = (props: PropsT) => {
  const isDarkScheme = useColorScheme() === 'dark'

  const theme = useMemo(
    () => (isDarkScheme ? DarkTheme : LightTheme),
    [isDarkScheme]
  )

  return (
    <ThemeContext.Provider value={theme}>
      {props.children}
    </ThemeContext.Provider>
  )
}

export default memo(ThemeProvider)
