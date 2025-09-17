import React from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import { useAppDispatch, useAppSelector } from '../store/hooks/useAppDispatch'
import { setCurrentScreen, setCurrentTab } from '../store/slices/sessionSlice'
import { clearUser, setUser } from '../store/slices/userSlice'

const ReduxExample: React.FC = () => {
  const dispatch = useAppDispatch()
  const user = useAppSelector(state => state.user)
  const session = useAppSelector(state => state.session)

  const handleSetUser = () => {
    dispatch(
      setUser({
        userId: '123456',
        phoneNumber: '+1234567890',
      }),
    )
  }

  const handleClearUser = () => {
    dispatch(clearUser())
  }

  const handleSetSession = () => {
    dispatch(setCurrentTab('Home'))
    dispatch(setCurrentScreen('HomeScreen'))
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Redux Store Example</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>User State (Persistent):</Text>
        <Text>User ID: {user.userId || 'Not set'}</Text>
        <Text>Phone: {user.phoneNumber || 'Not set'}</Text>
        <View style={styles.buttons}>
          <Button title="Set User" onPress={handleSetUser} />
          <Button title="Clear User" onPress={handleClearUser} />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Session State (Not Persistent):</Text>
        <Text>Current Tab: {session.currentTab || 'Not set'}</Text>
        <Text>Current Screen: {session.currentScreen || 'Not set'}</Text>
        <View style={styles.buttons}>
          <Button title="Set Session" onPress={handleSetSession} />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  buttons: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 10,
  },
})

export default ReduxExample
