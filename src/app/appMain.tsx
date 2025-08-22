import React, { JSX, memo, useEffect, useState } from 'react'
import { Alert, StyleSheet } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { ChatInterface, Message } from '../components/ChatInterface'
import LlamaService from '../services/LlamaService'
import { generateUniqueId } from '../utils/generateUniqueId'

const AppMainInit = (): JSX.Element => {
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isInitializing, setIsInitializing] = useState(true)

  useEffect(() => {
    // Import Reactotron configuration to initialize it
    if (__DEV__) {
      import('../../ReactotronConfig')
    }

    // Initialize the AI model
    initializeAI()
  }, [])

  const initializeAI = async () => {
    try {
      setIsInitializing(true)
      await LlamaService.initialize()

      // Add welcome message
      const welcomeMessage: Message = {
        id: generateUniqueId(),
        text: "Hello! I'm your AI assistant. How can I help you today?",
        isUser: false,
        timestamp: new Date(),
      }
      setMessages([welcomeMessage])
    } catch (error) {
      console.error('Failed to initialize AI:', error)
      Alert.alert(
        'AI Initialization Failed',
        'There was an error setting up the AI model. Please try restarting the app.',
        [{ text: 'OK' }],
      )
    } finally {
      setIsInitializing(false)
    }
  }

  const handleSendMessage = async (text: string) => {
    // Add user message
    const userMessage: Message = {
      id: generateUniqueId(),
      text,
      isUser: true,
      timestamp: new Date(),
    }

    setMessages(prev => [...prev, userMessage])
    setIsLoading(true)

    try {
      // Get AI response
      const response = await LlamaService.sendMessage(text)

      // Add AI response
      const aiMessage: Message = {
        id: generateUniqueId(),
        text: response,
        isUser: false,
        timestamp: new Date(),
      }

      setMessages(prev => [...prev, aiMessage])
    } catch (error) {
      console.error('Error getting AI response:', error)

      // Add error message
      const errorMessage: Message = {
        id: generateUniqueId(),
        text: "Sorry, I'm having trouble responding right now. Please try again.",
        isUser: false,
        timestamp: new Date(),
      }

      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    // Cleanup when component unmounts
    return () => {
      LlamaService.dispose()
    }
  }, [])

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <ChatInterface
          messages={messages}
          onSendMessage={handleSendMessage}
          isLoading={isLoading}
          isInitializing={isInitializing}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

export const AppMain = memo(AppMainInit)

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
