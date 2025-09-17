import { getApps } from '@react-native-firebase/app'
import React, { JSX, memo, useEffect } from 'react'
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import PhoneAuth from '../components/auth/phoneAuth'
import { persistor, store } from '../store/store'

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
      import('../../ReactotronConfig')
    }
  }, [])

  const LoadingComponent = () => (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="#0000ff" />
      <Text>Loading...</Text>
    </View>
  )

  return (
    <Provider store={store}>
      <PersistGate loading={<LoadingComponent />} persistor={persistor}>
        <SafeAreaProvider>
          <SafeAreaView style={styles.container}>
            <Text>Firebase Phone Auth Test</Text>
            <PhoneAuth />
          </SafeAreaView>
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  )
}

export const AppMain = memo(AppMainInit)

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
})
