import React from 'react'
import { Text, TouchableOpacity } from 'react-native'
import { useLanguage } from '../../contexts/LanguageContext'
import { Theme } from '../../contexts/ThemeContext'
import { useThemedStyles } from '../../hooks/master/useThemedStyles'
import { useAppDispatch } from '../../store/hooks'
import { toggleLanguage } from '../../store/slices/appSettingsSlice'

interface FloatingLanguageToggleProps {
  style?: any
}

const createStyles = (theme: Theme) => ({
  button: {
    position: 'absolute' as const,
    bottom: 100, // Position above theme toggle
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: theme.colors.secondary,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    shadowColor: theme.colors.shadowDark,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 8,
    zIndex: 1000,
  },
  text: {
    fontSize: 14,
    fontWeight: 'bold' as const,
    color: theme.colors.textOnPrimary,
  },
})

export const FloatingLanguageToggle: React.FC<FloatingLanguageToggleProps> = ({
  style,
}) => {
  const dispatch = useAppDispatch()
  const { language } = useLanguage()
  const styles = useThemedStyles(createStyles)

  const handleToggle = () => {
    dispatch(toggleLanguage())
  }

  return (
    <TouchableOpacity
      style={[styles.button, style]}
      onPress={handleToggle}
      activeOpacity={0.8}>
      <Text style={styles.text}>{language.toUpperCase()}</Text>
    </TouchableOpacity>
  )
}
