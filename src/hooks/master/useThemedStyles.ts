import { useMemo } from 'react'
import { Theme, useTheme } from '../../contexts/ThemeContext'

export const useThemedStyles = <T>(createStyles: (theme: Theme) => T): T => {
  const theme = useTheme()

  return useMemo(() => createStyles(theme), [theme, createStyles])
}
