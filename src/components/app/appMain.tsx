import { getApps } from '@react-native-firebase/app'
import React, { JSX, memo, useEffect } from 'react'
import { StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { LanguageProvider } from '../../contexts/LanguageContext'
import { ThemeProvider } from '../../contexts/ThemeContext'
import PhoneAuth from '../auth/phoneAuth'
import { FloatingLanguageToggle } from './FloatingLanguageToggle'
import { FloatingThemeToggle } from './FloatingThemeToggle'

const AppMainInit = (): JSX.Element => {
  useEffect(() => {
    // Check Firebase initialization
    const apps = getApps()
    console.log(
      'Firebase apps:',
      apps.length > 0 ? 'initialized' : 'not initialized',
    )
    if (apps.length > 0) {
      console.log('Default app name:', apps[0].name)
    }

    // init reactotron
    if (__DEV__) {
      import('../../../ReactotronConfig')
    }
  }, [])

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
