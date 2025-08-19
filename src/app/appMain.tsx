import React, { JSX, memo, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'

const AppMainInit = (): JSX.Element => {
  useEffect(() => {
    // Import Reactotron configuration to initialize it
    if (__DEV__) {
      import('../../ReactotronConfig')
    }
  }, [])

  return (
    <View style={styles.container}>
      <Text>AppMain</Text>
    </View>
  )
}

export const AppMain = memo(AppMainInit)

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
