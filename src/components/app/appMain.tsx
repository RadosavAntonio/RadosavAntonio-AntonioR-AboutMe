import { getApps } from '@react-native-firebase/app'
import React, { JSX, memo, useEffect } from 'react'
import { StyleSheet } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import PhoneAuth from '../auth/phoneAuth'

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
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <PhoneAuth />
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

export const AppMain = memo(AppMainInit)

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
