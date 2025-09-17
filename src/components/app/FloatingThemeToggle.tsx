import React from 'react'
import { Text, TouchableOpacity } from 'react-native'
import { useThemedStyles } from '../../hooks/master/useThemedStyles'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { toggleDarkMode } from '../../store/slices/appSettingsSlice'

interface FloatingThemeToggleProps {
  style?: any
}

const createStyles = (colors: any) => ({
  button: {
    position: 'absolute' as const,
    bottom: 30,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primary,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    shadowColor: colors.shadowDark,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 8,
    zIndex: 1000,
  },
  icon: {
    fontSize: 24,
    color: colors.textOnPrimary,
  },
})

export const FloatingThemeToggle: React.FC<FloatingThemeToggleProps> = ({
  style,
}) => {
  const dispatch = useAppDispatch()
  const isDarkMode = useAppSelector(state => state.appSettings.darkMode)
  const styles = useThemedStyles(createStyles)

  const handleToggle = () => {
    dispatch(toggleDarkMode())
  }

  return (
    <TouchableOpacity
      style={[styles.button, style]}
      onPress={handleToggle}
      activeOpacity={0.8}>
      <Text style={styles.icon}>{isDarkMode ? '☀️' : '🌙'}</Text>
    </TouchableOpacity>
  )
}
