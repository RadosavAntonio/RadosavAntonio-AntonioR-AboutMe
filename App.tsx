import { JSX } from 'react'
import { ActivityIndicator } from 'react-native'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { AppMain } from './src/components/app/appMain'
import { persistor, store } from './src/store/store'

export const App = (): JSX.Element => {
  return (
    <Provider store={store}>
      <PersistGate loading={<ActivityIndicator />} persistor={persistor}>
        <AppMain />
      </PersistGate>
    </Provider>
  )
}
