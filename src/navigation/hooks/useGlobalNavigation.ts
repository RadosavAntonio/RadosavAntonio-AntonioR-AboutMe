import { useCallback } from 'react'
import { useAppNavigation } from './useNavigation'
import { Screens, HomeTabRoute } from '../navigation'

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
  const dispatch = useAppDispatch()

  const goBack = useCallback(() => {
    navigation.goBack()
  }, [navigation])

  // Login screens
  const navigateToLogin = useCallback(() => {
    navigation.navigate(Screen.LOGIN)
  }, [navigation])

  const navigateToLoginEmailScreen = useCallback(
    ({ isNewAccount }: { isNewAccount: boolean }) => {
      navigation.navigate(Screen.LOGIN_EMAIL_SCREEN, { isNewAccount })
    },
    [navigation],
  )

  const navigateToLoginPhone = useCallback(() => {
    navigation.navigate(Screen.LOGIN_PHONE)
  }, [navigation])

  const navigateToCreatorRegister = useCallback(() => {
    navigation.navigate(Screen.CREATOR_REGISTER)
  }, [navigation])

  // Tab screens
  const navigateToHome = useCallback(() => {
    // @ts-ignore
    navigation.navigate(HomeTabRoute.HOME_TAB, {
      screen: Screen.HOME,
    })
    dispatch(updateCurrentTab(HomeTabRoute.HOME_TAB))
  }, [navigation, dispatch])

  const navigateToActivity = useCallback(() => {
    // @ts-ignore
    navigation.navigate(HomeTabRoute.ACTIVITY_TAB, {
      screen: Screen.ACTIVITY,
    })
    dispatch(updateCurrentTab(HomeTabRoute.ACTIVITY_TAB))
  }, [navigation, dispatch])

  const navigateToBriefs = useCallback(() => {
    // @ts-ignore
    navigation.navigate(HomeTabRoute.BRIEFS_TAB, {
      screen: Screen.BRIEFS,
    })
    dispatch(updateCurrentTab(HomeTabRoute.BRIEFS_TAB))
  }, [navigation, dispatch])

  const navigateToInbox = useCallback(() => {
    // @ts-ignore
    navigation.navigate(HomeTabRoute.INBOX_TAB, {
      screen: Screen.INBOX,
    })
    dispatch(updateCurrentTab(HomeTabRoute.INBOX_TAB))
  }, [navigation, dispatch])

  const navigateToProfile = useCallback(() => {
    // @ts-ignore
    navigation.navigate(HomeTabRoute.PROFILE_TAB, {
      screen: Screen.PROFILE,
    })
    dispatch(updateCurrentTab(HomeTabRoute.PROFILE_TAB))
  }, [navigation, dispatch])

  // Account screens
  const navigateToMySocials = useCallback(
    ({ platformId }: { platformId?: PhylloPlatformId | undefined } = {}) => {
      navigation.navigate(Screen.MY_SOCIALS, { platformId })
    },
    [navigation],
  )

  const navigateToPortfolio = useCallback(() => {
    navigation.navigate(Screen.PORTFOLIO)
  }, [navigation])

  const navigateToEditProfile = useCallback(() => {
    navigation.navigate(Screen.EDIT_PROFILE)
  }, [navigation])

  const navigateToEarnings = useCallback(() => {
    navigation.navigate(Screen.EARNINGS)
  }, [navigation])

  const navigateToBankDetails = useCallback(
    ({ displayConfirmation }: { displayConfirmation?: boolean } = {}) => {
      navigation.navigate(Screen.BANK_DETAILS, { displayConfirmation })
    },
    [navigation],
  )

  const navigateToSettings = useCallback(() => {
    navigation.navigate(Screen.SETTINGS)
  }, [navigation])

  const navigateToDeliveryAddress = useCallback(() => {
    navigation.navigate(Screen.DELIVERY_ADDRESS)
  }, [navigation])

  const navigateToReviews = useCallback(
    ({ screen }: { screen: ReviewsScreenTabs }) => {
      navigation.navigate(Screen.REVIEWS, { screen })
    },
    [navigation],
  )

  // Profile
  const navigateToInterests = useCallback(
    ({ hasFlow }: { hasFlow: boolean }) => {
      navigation.navigate(Screen.INTERESTS, { hasFlow })
    },
    [navigation],
  )

  const navigateToLocation = useCallback(() => {
    navigation.navigate(Screen.LOCATION)
  }, [navigation])

  const navigateToGender = useCallback(() => {
    navigation.navigate(Screen.GENDER)
  }, [navigation])

  const navigateToEthnicity = useCallback(() => {
    navigation.navigate(Screen.ETHNICITY)
  }, [navigation])

  const navigateToAge = useCallback(() => {
    navigation.navigate(Screen.AGE)
  }, [navigation])

  const navigateToMediaHandle = useCallback(() => {
    navigation.navigate(Screen.MEDIA_HANDLE)
  }, [navigation])

  const navigateToBio = useCallback(() => {
    navigation.navigate(Screen.BIO)
  }, [navigation])

  const navigateToProfileImage = useCallback(() => {
    navigation.navigate(Screen.PROFILE_IMAGE)
  }, [navigation])

  const navigateToProfileComplete = useCallback(() => {
    navigation.navigate(Screen.PROFILE_COMPLETE)
  }, [navigation])

  const navigateToVerification = useCallback(() => {
    navigation.navigate(Screen.VERIFICATION)
  }, [navigation])

  const navigateToJobPosition = useCallback(() => {
    navigation.navigate(Screen.JOB_POSITION)
  }, [navigation])

  const navigateToMediakit = useCallback(() => {
    navigation.navigate(Screen.MEDIAKIT)
  }, [navigation])

  const navigateToPrize = useCallback(() => {
    navigation.navigate(Screen.PRIZE)
  }, [navigation])

  // Utils screens
  const navigateToUrlView = useCallback(
    ({ url }: { url: string }) => {
      navigation.navigate(Screen.URL_VIEW, { url })
    },
    [navigation],
  )

  const navigateToCampaign = useCallback(
    ({ campaignId }: { campaignId: string }) => {
      navigation.navigate(Screen.CAMPAIGN, { campaignId })
    },
    [navigation],
  )

  const navigateToBrief = useCallback(
    ({ briefId }: { briefId: string }) => {
      navigation.navigate(Screen.BRIEF, { briefId })
    },
    [navigation],
  )

  const navigateToNotifications = useCallback(() => {
    navigation.navigate(Screen.NOTIFICATIONS)
  }, [navigation])

  const navigateToMessage = useCallback(
    ({ chatId }: { chatId: string }) => {
      navigation.navigate(Screen.MESSAGE, { chatId })
    },
    [navigation],
  )

  const navigateToEditProfileHometownSelection = useCallback(() => {
    navigation.navigate(Screen.EDIT_PROFILE_HOMETOWN_SELECTION)
  }, [navigation])

  const navigateToLoading = useCallback(() => {
    navigation.navigate(Screen.LOADING)
  }, [navigation])

  const navigateToBiometrics = useCallback(() => {
    navigation.navigate(Screen.BIOMETRICS)
  }, [navigation])

  const navigateToFaq = useCallback(() => {
    navigation.navigate(Screen.FAQ)
  }, [navigation])

  const navigateToShoutRelax = useCallback(() => {
    navigation.navigate(Screen.SHOUT_RELAX)
  }, [navigation])

  const navigateToSandbox = useCallback(() => {
    navigation.navigate(Screen.SANDBOX)
  }, [navigation])

  const navigateToBrandScreen = useCallback(
    ({ brandId }: { brandId: string }) => {
      navigation.navigate(Screen.BRAND_SCREEN, { brandId })
    },
    [navigation],
  )

  const navigateToAllBrandsScreen = useCallback(() => {
    navigation.navigate(Screen.ALL_BRANDS_SCREEN)
  }, [navigation])

  // Fun screens
  const navigateToMemoryGame = useCallback(() => {
    navigation.navigate(Screen.MEMORY_GAME)
  }, [navigation])

  return {
    goBack,

    // Login screens
    navigateToLogin,
    navigateToLoginEmailScreen,
    navigateToLoginPhone,
    navigateToCreatorRegister,

    // Tab screens
    navigateToHome,
    navigateToActivity,
    navigateToBriefs,
    navigateToInbox,
    navigateToProfile,

    // Account screens
    navigateToMySocials,
    navigateToPortfolio,
    navigateToEditProfile,
    navigateToEarnings,
    navigateToBankDetails,
    navigateToSettings,
    navigateToDeliveryAddress,
    navigateToReviews,

    // Profile
    navigateToInterests,
    navigateToLocation,
    navigateToGender,
    navigateToEthnicity,
    navigateToAge,
    navigateToMediaHandle,
    navigateToBio,
    navigateToProfileImage,
    navigateToProfileComplete,
    navigateToVerification,
    navigateToJobPosition,
    navigateToMediakit,
    navigateToPrize,

    // Utils screens
    navigateToUrlView,
    navigateToCampaign,
    navigateToBrief,
    navigateToNotifications,
    navigateToMessage,
    navigateToEditProfileHometownSelection,
    navigateToLoading,
    navigateToBiometrics,
    navigateToFaq,
    navigateToShoutRelax,
    navigateToSandbox,
    navigateToBrandScreen,
    navigateToAllBrandsScreen,

    // Fun screens
    navigateToMemoryGame,
  }
}
