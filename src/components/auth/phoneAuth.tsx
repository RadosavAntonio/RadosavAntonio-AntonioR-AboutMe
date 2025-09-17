import React, { useEffect, useState } from 'react'
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import PhoneNumberInput from 'react-native-international-phone-number'
import { FirebaseService } from '../../services/firebaseService'

interface PhoneAuthProps {}

function PhoneAuth({}: PhoneAuthProps) {
  const [selectedCountry, setSelectedCountry] = useState<any>(null)
  const [inputValue, setInputValue] = useState('')
  const [fullPhoneNumber, setFullPhoneNumber] = useState('')
  const [confirmation, setConfirmation] = useState<any>(null)
  const [verificationCode, setVerificationCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    // Listen for auth state changes
    const unsubscribe = FirebaseService.onAuthStateChanged(user => {
      if (user) {
        console.log('User signed in successfully:', user.phoneNumber)
        // You can navigate to the main app or update your Redux store here
      }
    })

    return unsubscribe
  }, [])

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

  const validatePhoneNumber = (phoneNumber: string) => {
    // Basic validation - check if it starts with + and has at least 10 digits
    const phoneRegex = /^\+[1-9]\d{9,14}$/
    return phoneRegex.test(phoneNumber)
  }

  const sendVerificationCode = async () => {
    if (!fullPhoneNumber) {
      setError('Please enter a phone number')
      return
    }

    if (!validatePhoneNumber(fullPhoneNumber)) {
      setError('Please enter a valid phone number with country code')
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
          'Verification Code Sent',
          `A verification code has been sent to ${fullPhoneNumber}`,
        )
      } else {
        setError(result.error || 'Failed to send verification code')
        Alert.alert('Error', result.error || 'Failed to send verification code')
      }
    } catch (err: any) {
      console.error('Send verification code error:', err)
      setError('Failed to send verification code')
      Alert.alert('Error', 'Failed to send verification code')
    } finally {
      setLoading(false)
    }
  }

  const confirmVerificationCode = async () => {
    if (!verificationCode.trim()) {
      setError('Please enter the verification code')
      return
    }

    if (!confirmation) {
      setError('No verification session found. Please try again.')
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
        Alert.alert('Success', 'Phone number verified successfully!')
        // Reset the form
        setConfirmation(null)
        setVerificationCode('')
        setInputValue('')
        setFullPhoneNumber('')
      } else {
        setError(result.error || 'Invalid verification code')
        Alert.alert('Error', result.error || 'Invalid verification code')
      }
    } catch (err: any) {
      console.error('Confirm verification code error:', err)
      setError('Invalid verification code')
      Alert.alert('Error', 'Invalid verification code')
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setConfirmation(null)
    setVerificationCode('')
    setError('')
  }

  // Show verification code input if we have a confirmation
  if (confirmation) {
    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={styles.content}>
          <Text style={styles.title}>Enter Verification Code</Text>
          <Text style={styles.subtitle}>
            We've sent a verification code to {fullPhoneNumber}
          </Text>

          <TextInput
            style={styles.codeInput}
            value={verificationCode}
            onChangeText={setVerificationCode}
            placeholder="Enter 6-digit code"
            keyboardType="number-pad"
            maxLength={6}
            editable={!loading}
          />

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={confirmVerificationCode}
            disabled={loading}>
            {loading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={styles.buttonText}>Verify Code</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity style={styles.secondaryButton} onPress={resetForm}>
            <Text style={styles.secondaryButtonText}>Back to Phone Number</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    )
  }

  // Show phone number input
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={styles.content}>
        <Text style={styles.title}>Sign In</Text>
        <Text style={styles.subtitle}>
          Enter your phone number to get started
        </Text>

        <View style={styles.phoneInputContainer}>
          <PhoneNumberInput
            value={inputValue}
            onChangePhoneNumber={handlePhoneNumberChange}
            selectedCountry={selectedCountry}
            onChangeSelectedCountry={handleSelectedCountry}
            onChangeText={handleInputValue}
            placeholder="Phone number"
            style={styles.phoneInputStyle}
          />
        </View>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <TouchableOpacity
          style={[
            styles.button,
            (!fullPhoneNumber || loading) && styles.buttonDisabled,
          ]}
          onPress={sendVerificationCode}
          disabled={!fullPhoneNumber || loading}>
          {loading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.buttonText}>Send Verification Code</Text>
          )}
        </TouchableOpacity>

        <Text style={styles.disclaimer}>
          By continuing, you agree to receive SMS messages for verification.
          Standard rates may apply.
        </Text>
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 40,
    textAlign: 'center',
    lineHeight: 22,
  },
  phoneInputContainer: {
    marginBottom: 20,
  },
  phoneInputStyle: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FAFAFA',
  },
  codeInput: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 18,
    textAlign: 'center',
    backgroundColor: '#FAFAFA',
    marginBottom: 20,
    letterSpacing: 8,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#007AFF',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonDisabled: {
    backgroundColor: '#CCCCCC',
    shadowOpacity: 0,
    elevation: 0,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    paddingVertical: 12,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '500',
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 14,
    marginBottom: 16,
    textAlign: 'center',
  },
  disclaimer: {
    fontSize: 12,
    color: '#999999',
    textAlign: 'center',
    lineHeight: 16,
    marginTop: 20,
  },
})

export default PhoneAuth
