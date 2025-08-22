import React, { JSX, memo, useEffect } from 'react'
import { StyleSheet } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { AiChat } from '../components/aiChat/aiChat'

const AppMainInit = (): JSX.Element => {
  useEffect(() => {
    // init reactotron
    if (__DEV__) {
      import('../../ReactotronConfig')
    }
  }, [])

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <AiChat />
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
