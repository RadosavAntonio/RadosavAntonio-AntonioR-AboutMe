import { getApps } from '@react-native-firebase/app'
import { useEffect } from 'react'
import { useIpLocation } from './useIPLocation'

export const useInitialServices = () => {
  useIpLocation()

  useEffect(() => {
    // init firebase check
    const apps = getApps()
    console.log(
      'Firebase apps:',
      apps.length > 0 ? 'initialized' : 'not initialized',
      apps,
    )

    // init reactotron
    if (__DEV__) {
      import('../../../ReactotronConfig')
    }
  }, [])
}
