import { useEffect, useState } from 'react'
import { Alert } from 'react-native'
import { usePhoneAuthTranslations } from '../../contexts/LanguageContext'
import { FirebaseService } from '../../services/firebaseService'

export interface PhoneAuthState {
  selectedCountry: any
  inputValue: string
  fullPhoneNumber: string
  confirmation: any
  verificationCode: string
  loading: boolean
  error: string
}

export interface PhoneAuthActions {
  handleInputValue: (phoneNumber: string) => void
  handleSelectedCountry: (country: any) => void
  handlePhoneNumberChange: (phoneNumber: string) => void
  setVerificationCode: (code: string) => void
  validatePhoneNumber: (phoneNumber: string) => boolean
  sendVerificationCode: () => Promise<void>
  confirmVerificationCode: () => Promise<void>
  resetForm: () => void
}

export interface UsePhoneAuthReturn extends PhoneAuthState, PhoneAuthActions {}

export const usePhoneAuth = (): UsePhoneAuthReturn => {
  // ----- State Management -----
  const [selectedCountry, setSelectedCountry] = useState<any>(null)
  const [inputValue, setInputValue] = useState('')
  const [fullPhoneNumber, setFullPhoneNumber] = useState('')
  const [confirmation, setConfirmation] = useState<any>(null)
  const [verificationCode, setVerificationCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // ----- Context Hooks -----
  const t = usePhoneAuthTranslations()

  // ----- Firebase Auth State Listener -----
  useEffect(() => {
    const unsubscribe = FirebaseService.onAuthStateChanged(user => {
      if (user) {
        console.log('User signed in successfully:', user.phoneNumber)
        // You can navigate to the main app or update your Redux store here
      }
    })

    return unsubscribe
  }, [])

  // ----- Input Handlers -----
  const handleInputValue = (phoneNumber: string) => {
    setInputValue(phoneNumber)
    setError('')
  }

  const handleSelectedCountry = (country: any) => {
    setSelectedCountry(country)
    setError('')
  }

  const handlePhoneNumberChange = (phoneNumber: string) => {
    setFullPhoneNumber(phoneNumber)
    setError('') // Clear any previous errors when phone number changes
  }

  // ----- Validation Logic -----
  const validatePhoneNumber = (phoneNumber: string) => {
    // Basic validation - check if it starts with + and has at least 10 digits
    const phoneRegex = /^\+[1-9]\d{9,14}$/
    return phoneRegex.test(phoneNumber)
  }

  // ----- Authentication Handlers -----
  const sendVerificationCode = async () => {
    if (!fullPhoneNumber) {
      setError(t.errors.enterPhoneNumber)
      return
    }

    if (!validatePhoneNumber(fullPhoneNumber)) {
      setError(t.errors.invalidPhoneNumber)
      return
    }

    try {
      setLoading(true)
      setError('')

      console.log('Sending verification code to:', fullPhoneNumber)
      const result = (await FirebaseService.sendPhoneVerificationCode(
        fullPhoneNumber,
      )) as any

      if (result.success) {
        setConfirmation(result.confirmation)
        Alert.alert(
          t.success.verificationCodeSent,
          `${t.success.verificationCodeSentMessage} ${fullPhoneNumber}`,
        )
      } else {
        setError(result.error || t.errors.sendVerificationFailed)
        Alert.alert('Error', result.error || t.errors.sendVerificationFailed)
      }
    } catch (err: any) {
      console.error('Send verification code error:', err)
      setError(t.errors.sendVerificationFailed)
      Alert.alert('Error', t.errors.sendVerificationFailed)
    } finally {
      setLoading(false)
    }
  }

  const confirmVerificationCode = async () => {
    if (!verificationCode.trim()) {
      setError(t.errors.enterVerificationCode)
      return
    }

    if (!confirmation) {
      setError(t.errors.noVerificationSession)
      return
    }

    try {
      setLoading(true)
      setError('')

      const result = (await FirebaseService.verifyPhoneNumber(
        confirmation,
        verificationCode,
      )) as any

      if (result.success) {
        Alert.alert(t.success.phoneVerified, t.success.phoneVerifiedMessage)
        // Reset the form
        setConfirmation(null)
        setVerificationCode('')
        setInputValue('')
        setFullPhoneNumber('')
      } else {
        setError(result.error || t.errors.invalidVerificationCode)
        Alert.alert('Error', result.error || t.errors.invalidVerificationCode)
      }
    } catch (err: any) {
      console.error('Confirm verification code error:', err)
      setError(t.errors.invalidVerificationCode)
      Alert.alert('Error', t.errors.invalidVerificationCode)
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setConfirmation(null)
    setVerificationCode('')
    setError('')
  }

  // ----- Hook Return Object -----
  return {
    // State
    selectedCountry,
    inputValue,
    fullPhoneNumber,
    confirmation,
    verificationCode,
    loading,
    error,

    // Actions
    handleInputValue,
    handleSelectedCountry,
    handlePhoneNumberChange,
    setVerificationCode,
    validatePhoneNumber,
    sendVerificationCode,
    confirmVerificationCode,
    resetForm,
  }
}
