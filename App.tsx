import React, { JSX, useRef } from 'react'
import {
  Animated,
  Keyboard,
  StatusBar,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import 'react-native-gesture-handler'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import {
  KeyboardAvoidingView,
  KeyboardProvider,
  KeyboardToolbar,
} from 'react-native-keyboard-controller'
import 'react-native-reanimated'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { AppMain } from './src/components/app/appMain'
import { persistor, store } from './src/store/store'
import { SPACE } from './src/utils/master/constants'
import { useGlobalStyles } from './src/utils/master/globalStyles'
import { isIos } from './src/utils/master/globalUtilityFunctionsAndConstants'

export const App = (): JSX.Element => {
  const translateY = useRef(new Animated.Value(0)).current
  const globalStyles = useGlobalStyles()

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <GestureHandlerRootView style={globalStyles.flex}>
          <SafeAreaProvider>
            <KeyboardProvider statusBarTranslucent>
              <TouchableWithoutFeedback
                onPress={() => Keyboard.dismiss()}
                accessible={false}>
                <View style={globalStyles.flex}>
                  {/* ----- in order for input field to be visible should be on a ScrollView ----- */}
                  <KeyboardAvoidingView
                    style={globalStyles.flex}
                    behavior={'padding'}
                    keyboardVerticalOffset={isIos ? 42 : SPACE[64]}>
                    <Animated.View
                      style={[
                        globalStyles.flex,
                        { transform: [{ translateY }] },
                      ]}>
                      {!isIos && <StatusBar backgroundColor="transparent" />}
                      <AppMain />
                    </Animated.View>
                  </KeyboardAvoidingView>
                  <KeyboardToolbar
                    onDoneCallback={() => Keyboard.dismiss()}
                    doneText="Done"
                  />
                </View>
              </TouchableWithoutFeedback>
            </KeyboardProvider>
          </SafeAreaProvider>
        </GestureHandlerRootView>
      </PersistGate>
    </Provider>
  )
}
