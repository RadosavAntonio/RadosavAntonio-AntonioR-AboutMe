import React, { JSX, memo, useEffect, useState } from 'react'
import { Alert, StyleSheet, View } from 'react-native'
import {
  disposeLlama,
  initializeLlama,
  sendMessage,
} from '../../services/llamaService'
import { generateUniqueId } from '../../utils/generativTools/generateUniqueId'
import { ChatInterface, Message } from './ChatInterface'

const AiChatInit = (): JSX.Element => {
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isInitializing, setIsInitializing] = useState(true)

  const initializeAI = async () => {
    try {
      setIsInitializing(true)
      await initializeLlama()

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
      const response = await sendMessage(text)

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
    // Initialize the AI model
    initializeAI()
    // Cleanup when component unmounts
    return () => {
      disposeLlama()
    }
  }, [])
  return (
    <View style={styles.container}>
      <ChatInterface
        messages={messages}
        onSendMessage={handleSendMessage}
        isLoading={isLoading}
        isInitializing={isInitializing}
      />
    </View>
  )
}

export const AiChat = memo(AiChatInit)

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
