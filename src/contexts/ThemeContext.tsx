import React, { createContext, ReactNode, useContext } from 'react'
import { useAppSelector } from '../store/hooks'
import { darkColors } from './resources/colors/darkColors'
import { lightColors } from './resources/colors/lightColors'

// ----- Theme Types -----
export type ThemeColors = typeof lightColors | typeof darkColors
export type ColorKey = keyof typeof lightColors

export interface Theme {
  colors: ThemeColors
  isDarkMode: boolean
}

// ----- Theme Context -----
interface ThemeContextType {
  theme: Theme
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

// ----- Theme Provider Component -----
interface ThemeProviderProps {
  children: ReactNode
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const isDarkMode = useAppSelector(state => state.appSettings.darkMode)

  const theme: Theme = {
    colors: isDarkMode ? darkColors : lightColors,
    isDarkMode,
  }

  return (
    <ThemeContext.Provider value={{ theme }}>{children}</ThemeContext.Provider>
  )
}

// ----- Theme Hook -----
export const useTheme = (): Theme => {
  const context = useContext(ThemeContext)

  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }

  return context.theme
}
