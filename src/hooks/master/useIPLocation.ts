import { useCallback, useEffect } from 'react'
import { IpLocationService } from '../../services/ipLocationService'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { setIpAddressLocation } from '../../store/slices/userSlice'

interface UseIpLocationReturn {
  ipAddressLocation: string | null
  refreshLocation: () => Promise<void>
  isLoading: boolean
}

/**
 * Custom hook for managing IP-based location detection
 * Automatically fetches user's country on app startup
 * Provides methods to refresh location manually
 */
export const useIpLocation = (): UseIpLocationReturn => {
  const dispatch = useAppDispatch()
  const ipAddressLocation = useAppSelector(
    state => state.user.ipAddressLocation,
  )

  /**
   * Fetch and store user's country based on IP address
   */
  const fetchAndStoreLocation = useCallback(async (): Promise<void> => {
    try {
      const result = await IpLocationService.getUserCountryWithFallback()

      if (result.success && result.country) {
        dispatch(setIpAddressLocation(result.country))
        console.log('IP location detected:', result.country)
      } else {
        console.warn('Failed to detect IP location:', result.error)
        // Don't clear existing location on failure
      }
    } catch (error) {
      console.error('Unexpected error in IP location detection:', error)
      // Don't clear existing location on error
    }
  }, [dispatch])

  /**
   * Refresh location - can be called manually
   */
  const refreshLocation = useCallback(async (): Promise<void> => {
    await fetchAndStoreLocation()
  }, [fetchAndStoreLocation])

  /**
   * Auto-fetch location on hook initialization
   * This will run every time the component using this hook mounts
   * Always fetches location on app startup regardless of existing value
   */
  useEffect(() => {
    // Always fetch location on app startup
    fetchAndStoreLocation()
  }, [fetchAndStoreLocation])

  return {
    ipAddressLocation,
    refreshLocation,
    isLoading: false, // We could add loading state if needed in the future
  }
}
