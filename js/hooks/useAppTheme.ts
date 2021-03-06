import { useContext } from 'react'
import { ThemeContext } from '../components/ThemeProvider'

export const useAppTheme = () => useContext(ThemeContext)
