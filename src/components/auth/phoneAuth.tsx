import {
  getAuth,
  onAuthStateChanged,
  signInWithPhoneNumber,
} from '@react-native-firebase/auth'
import { useEffect, useState } from 'react'
import { Button, TextInput } from 'react-native'

function PhoneAuth() {
  const [confirm, setConfirm] = useState<any>(null)
  const [code, setCode] = useState('')
  const [loading, setLoading] = useState(false)

  function handleAuthStateChanged(user: any) {
    if (user) {
      console.log('User signed in successfully:', user.phoneNumber)
    }
  }

  useEffect(() => {
    const auth = getAuth()
    const subscriber = onAuthStateChanged(auth, handleAuthStateChanged)
    return subscriber
  }, [])

  async function handleSignInWithPhoneNumber(phoneNumber: string) {
    try {
      setLoading(true)
      console.log('Starting phone sign in for:', phoneNumber)

      const auth = getAuth()
      const confirmation = await signInWithPhoneNumber(auth, phoneNumber)
      console.log('Success! Confirmation received')
      setConfirm(confirmation)
    } catch (error: any) {
      console.error('Phone sign in error:', error.code, error.message)
    } finally {
      setLoading(false)
    }
  }

  async function confirmCode() {
    try {
      if (confirm) {
        await confirm.confirm(code)
        console.log('Code confirmed successfully')
      }
    } catch (error: any) {
      console.error('Code confirmation error:', error.message)
    }
  }

  if (!confirm) {
    return (
      <Button
        title={loading ? 'Sending...' : 'Phone Number Sign In'}
        onPress={() => handleSignInWithPhoneNumber('+441111111111')}
        disabled={loading}
      />
    )
  }

  return (
    <>
      <TextInput
        value={code}
        onChangeText={setCode}
        placeholder="Enter verification code"
      />
      <Button title="Confirm Code" onPress={confirmCode} />
    </>
  )
}

export default PhoneAuth
