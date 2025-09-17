import React, { JSX, memo } from 'react'
import { StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { LanguageProvider } from '../../contexts/LanguageContext'
import { ThemeProvider } from '../../contexts/ThemeContext'
import { useInitialServices } from '../../hooks/master/useInitalServices'
import PhoneAuth from '../auth/phoneAuth'
import { FloatingLanguageToggle } from './FloatingLanguageToggle'
import { FloatingThemeToggle } from './FloatingThemeToggle'

const AppMainInit = (): JSX.Element => {
  useInitialServices()

  return (
    <SafeAreaView style={styles.container}>
      <LanguageProvider>
        <ThemeProvider>
          <PhoneAuth />
          <FloatingLanguageToggle />
          <FloatingThemeToggle />
        </ThemeProvider>
      </LanguageProvider>
    </SafeAreaView>
  )
}

export const AppMain = memo(AppMainInit)

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
