// IP Location Service for getting user's country based on IP address

interface IpLocationResponse {
  country: string
  country_code: string
  status: string
}

interface IpLocationResult {
  success: boolean
  country?: string
  error?: string
}

export class IpLocationService {
  private static readonly API_URL = 'https://ipapi.co/json/'
  private static readonly TIMEOUT = 5000 // 5 seconds

  /**
   * Get user's country based on their IP address
   * Uses ipapi.co free service (no API key required)
   * Returns country name or null if failed
   */
  static async getUserCountry(): Promise<IpLocationResult> {
    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), this.TIMEOUT)

      const response = await fetch(this.API_URL, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      if (!response.ok) {
        return {
          success: false,
          error: `HTTP error! status: ${response.status}`,
        }
      }

      const data: IpLocationResponse = await response.json()

      // Check if the response contains the expected data
      if (data.status === 'fail' || !data.country) {
        return {
          success: false,
          error: 'Failed to get location data from IP',
        }
      }

      return {
        success: true,
        country: data.country,
      }
    } catch (error) {
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          return {
            success: false,
            error: 'Request timeout',
          }
        }
        return {
          success: false,
          error: error.message,
        }
      }
      return {
        success: false,
        error: 'Unknown error occurred',
      }
    }
  }

  /**
   * Alternative method using different API as fallback
   * Uses ip-api.com (also free, no API key required)
   */
  static async getUserCountryFallback(): Promise<IpLocationResult> {
    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), this.TIMEOUT)

      const response = await fetch(
        'http://ip-api.com/json/?fields=country,status',
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          signal: controller.signal,
        },
      )

      clearTimeout(timeoutId)

      if (!response.ok) {
        return {
          success: false,
          error: `HTTP error! status: ${response.status}`,
        }
      }

      const data = await response.json()

      if (data.status !== 'success' || !data.country) {
        return {
          success: false,
          error: 'Failed to get location data from fallback API',
        }
      }

      return {
        success: true,
        country: data.country,
      }
    } catch (error) {
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          return {
            success: false,
            error: 'Request timeout',
          }
        }
        return {
          success: false,
          error: error.message,
        }
      }
      return {
        success: false,
        error: 'Unknown error occurred',
      }
    }
  }

  /**
   * Get user country with automatic fallback
   * Tries primary API first, then fallback if it fails
   */
  static async getUserCountryWithFallback(): Promise<IpLocationResult> {
    // Try primary API first
    const primaryResult = await this.getUserCountry()

    if (primaryResult.success) {
      return primaryResult
    }

    // Try fallback API if primary fails
    console.warn(
      'Primary IP location service failed, trying fallback:',
      primaryResult.error,
    )
    return await this.getUserCountryFallback()
  }
}
