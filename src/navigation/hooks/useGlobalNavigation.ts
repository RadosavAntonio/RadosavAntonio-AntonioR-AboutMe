import { useCallback } from 'react'
import { Screens } from '../navigation'
import { useAppNavigation } from './useNavigation'

type GlobalNavigationReturn = {
  goBack: () => void
  // Login screens
  navigateToLogin: () => void
  // Home screens
  navigateToHomeScreen: () => void
  // AI screens
  navigateToAISelect: () => void
  // Utils screens
  navigateToUrlView: ({ url }: { url: string }) => void
  navigateToLoading: () => void
}

export const useGlobalNavigation = (): GlobalNavigationReturn => {
  const navigation = useAppNavigation()

  const goBack = useCallback(() => {
    navigation.goBack()
  }, [navigation])

  // Login screens
  const navigateToLogin = useCallback(() => {
    navigation.navigate(Screens.LOGIN)
  }, [navigation])

  // Home screens
  const navigateToHomeScreen = useCallback(() => {
    navigation.navigate(Screens.HOME_SCREEN)
  }, [navigation])

  // AI screens
  const navigateToAISelect = useCallback(() => {
    navigation.navigate(Screens.AI_SELECT)
  }, [navigation])

  // Utils screens
  const navigateToUrlView = useCallback(
    ({ url }: { url: string }) => {
      navigation.navigate(Screens.URL_VIEW, { url })
    },
    [navigation],
  )

  const navigateToLoading = useCallback(() => {
    navigation.navigate(Screens.LOADING)
  }, [navigation])

  return {
    goBack,
    navigateToLogin,
    navigateToHomeScreen,
    navigateToAISelect,
    navigateToUrlView,
    navigateToLoading,
  }
}
