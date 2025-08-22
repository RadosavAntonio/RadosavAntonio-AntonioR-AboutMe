import auth from '@react-native-firebase/auth'

export class FirebaseService {
  // Check if Firebase is properly initialized
  static isInitialized(): boolean {
    try {
      return !!auth().app
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
}
