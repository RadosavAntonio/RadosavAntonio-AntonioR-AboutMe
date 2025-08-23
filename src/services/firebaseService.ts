import auth from '@react-native-firebase/auth'

export class FirebaseService {
  // Check if Firebase is properly initialized
  static isInitialized(): boolean {
    try {
      console.log('Checking Firebase initialization...')
      const app = auth().app
      console.log('Firebase app:', !!app)
      console.log('Firebase app name:', app?.name)
      console.log('Firebase app options:', app?.options)
      return !!app
    } catch (error) {
      console.error('Firebase initialization check failed:', error)
      return false
    }
  }

  // Get current user
  static getCurrentUser() {
    return auth().currentUser
  }

  // Sign in with email and password
  static async signInWithEmailAndPassword(email: string, password: string) {
    try {
      const userCredential = await auth().signInWithEmailAndPassword(
        email,
        password,
      )
      return { success: true, user: userCredential.user }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }

  // Create user with email and password
  static async createUserWithEmailAndPassword(email: string, password: string) {
    try {
      const userCredential = await auth().createUserWithEmailAndPassword(
        email,
        password,
      )
      return { success: true, user: userCredential.user }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }

  // Sign out
  static async signOut() {
    try {
      await auth().signOut()
      return { success: true }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }

  // Listen to authentication state changes
  static onAuthStateChanged(callback: (user: any) => void) {
    return auth().onAuthStateChanged(callback)
  }

  // Phone Authentication Methods

  // Send verification code to phone number
  static async sendPhoneVerificationCode(phoneNumber: string) {
    try {
      console.log('=== FIREBASE SERVICE DEBUG START ===')
      console.log(
        '1. Firebase Auth - Sending verification code to:',
        phoneNumber,
      )

      // Check if Firebase is initialized
      console.log('2. Checking Firebase initialization...')
      if (!this.isInitialized()) {
        console.error('3. Firebase is NOT initialized!')
        throw new Error('Firebase app is not initialized')
      }
      console.log('3. Firebase is initialized successfully')

      console.log('4. Using PhoneAuthProvider.verifyPhoneNumber API...')

      // Use the correct API from Firebase documentation
      // We need to return a Promise to work with React Native Firebase
      return new Promise((resolve, reject) => {
        auth()
          .signInWithPhoneNumber(phoneNumber)
          .then(confirmation => {
            console.log('7. Phone verification request completed successfully')
            console.log('8. Confirmation object:', !!confirmation)
            console.log('9. Confirmation type:', typeof confirmation)
            console.log(
              '10. Confirmation methods:',
              Object.keys(confirmation || {}),
            )
            console.log('=== FIREBASE SERVICE DEBUG END ===')
            resolve({ success: true, confirmation })
          })
          .catch(error => {
            console.error('=== FIREBASE SERVICE ERROR ===')
            console.error(
              'Firebase Auth - Error sending verification code:',
              error,
            )
            console.error('Error details:', {
              message: error.message,
              code: error.code,
              stack: error.stack,
              name: error.name,
              nativeErrorMessage: error.nativeErrorMessage,
              userInfo: error.userInfo,
            })

            // Handle specific Firebase Auth errors for v23
            let errorMessage = error.message

            if (error.code === 'auth/invalid-phone-number') {
              errorMessage = 'Invalid phone number format'
            } else if (error.code === 'auth/missing-phone-number') {
              errorMessage = 'Phone number is required'
            } else if (error.code === 'auth/quota-exceeded') {
              errorMessage = 'SMS quota exceeded. Try again later'
            } else if (error.code === 'auth/user-disabled') {
              errorMessage = 'User account has been disabled'
            } else if (error.code === 'auth/operation-not-allowed') {
              errorMessage = 'Phone authentication is not enabled'
            } else if (error.code === 'auth/app-not-authorized') {
              errorMessage =
                'This app is not authorized to use Firebase Authentication'
            } else if (error.code === 'auth/network-request-failed') {
              errorMessage = 'Network error. Please check your connection'
            } else if (error.code === 'auth/too-many-requests') {
              errorMessage = 'Too many requests. Please try again later'
            } else if (error.code === 'auth/captcha-check-failed') {
              errorMessage = 'Captcha verification failed. Please try again'
            }

            console.error('Final error message:', errorMessage)
            resolve({ success: false, error: errorMessage })
          })
      })
    } catch (error: any) {
      console.error('=== FIREBASE SERVICE CRITICAL ERROR ===')
      console.error('Critical error in sendPhoneVerificationCode:', error)
      return {
        success: false,
        error: error.message || 'Critical error occurred',
      }
    }
  }

  // Verify phone number with code
  static async verifyPhoneNumber(confirmation: any, verificationCode: string) {
    try {
      const userCredential = await confirmation.confirm(verificationCode)
      return { success: true, user: userCredential.user }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }

  // Link phone number to existing account
  static async linkPhoneNumber(phoneNumber: string) {
    try {
      const user = auth().currentUser
      if (!user) {
        return { success: false, error: 'No user is currently signed in' }
      }

      const confirmation = await auth().signInWithPhoneNumber(phoneNumber)
      return { success: true, confirmation }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }

  // Complete phone number linking
  static async confirmPhoneNumberLink(
    confirmation: any,
    verificationCode: string,
  ) {
    try {
      const user = auth().currentUser
      if (!user) {
        return { success: false, error: 'No user is currently signed in' }
      }

      const credential = auth.PhoneAuthProvider.credential(
        confirmation.verificationId,
        verificationCode,
      )

      await user.linkWithCredential(credential)
      return { success: true, user }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }
}
