import React, { useEffect, useRef, useState } from 'react'
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'

export interface Message {
  id: string
  text: string
  isUser: boolean
  timestamp: Date
}

interface ChatInterfaceProps {
  messages: Message[]
  onSendMessage: (message: string) => void
  isLoading: boolean
  isInitializing: boolean
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({
  messages,
  onSendMessage,
  isLoading,
  isInitializing,
}) => {
  const [inputText, setInputText] = useState('')
  const scrollViewRef = useRef<ScrollView>(null)

  useEffect(() => {
    // Auto-scroll to bottom when new messages are added
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true })
    }, 100)
  }, [messages])

  const handleSend = () => {
    if (inputText.trim() && !isLoading && !isInitializing) {
      onSendMessage(inputText.trim())
      setInputText('')
    }
  }

  const renderMessage = (message: Message) => (
    <View
      key={message.id}
      style={[
        styles.messageContainer,
        message.isUser ? styles.userMessage : styles.aiMessage,
      ]}>
      <Text
        style={[
          styles.messageText,
          message.isUser ? styles.userMessageText : styles.aiMessageText,
        ]}>
        {message.text}
      </Text>
      <Text style={styles.timestamp}>
        {message.timestamp.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        })}
      </Text>
    </View>
  )

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        style={styles.messagesContainer}
        contentContainerStyle={styles.messagesContent}>
        {isInitializing && (
          <View style={styles.initializingContainer}>
            <ActivityIndicator size="large" color="#007AFF" />
            <Text style={styles.initializingText}>
              Initializing AI model...
            </Text>
            <Text style={styles.initializingSubtext}>
              This may take a moment on first launch
            </Text>
          </View>
        )}

        {messages.length === 0 && !isInitializing && (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyTitle}>Welcome to AI Chat!</Text>
            <Text style={styles.emptySubtitle}>
              Start a conversation by typing a message below.
            </Text>
          </View>
        )}

        {messages.map(renderMessage)}

        {isLoading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="small" color="#007AFF" />
            <Text style={styles.loadingText}>AI is thinking...</Text>
          </View>
        )}
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          value={inputText}
          onChangeText={setInputText}
          placeholder={
            isInitializing ? 'Please wait...' : 'Type your message...'
          }
          multiline
          maxLength={500}
          editable={!isLoading && !isInitializing}
          onSubmitEditing={handleSend}
          blurOnSubmit={false}
        />
        <TouchableOpacity
          style={[
            styles.sendButton,
            (!inputText.trim() || isLoading || isInitializing) &&
              styles.sendButtonDisabled,
          ]}
          onPress={handleSend}
          disabled={!inputText.trim() || isLoading || isInitializing}>
          <Text
            style={[
              styles.sendButtonText,
              (!inputText.trim() || isLoading || isInitializing) &&
                styles.sendButtonTextDisabled,
            ]}>
            Send
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  messagesContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  messagesContent: {
    paddingTop: 16,
    paddingBottom: 8,
  },
  messageContainer: {
    marginVertical: 4,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    maxWidth: '80%',
  },
  userMessage: {
    backgroundColor: '#007AFF',
    alignSelf: 'flex-end',
  },
  aiMessage: {
    backgroundColor: '#ffffff',
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  messageText: {
    fontSize: 16,
    lineHeight: 20,
  },
  userMessageText: {
    color: '#ffffff',
  },
  aiMessageText: {
    color: '#333333',
  },
  timestamp: {
    fontSize: 12,
    color: '#999999',
    marginTop: 4,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    alignItems: 'flex-end',
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginRight: 8,
    maxHeight: 100,
    fontSize: 16,
  },
  sendButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  sendButtonDisabled: {
    backgroundColor: '#cccccc',
  },
  sendButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  sendButtonTextDisabled: {
    color: '#999999',
  },
  initializingContainer: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  initializingText: {
    marginTop: 16,
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
  },
  initializingSubtext: {
    marginTop: 8,
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333333',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 12,
  },
  loadingText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#666666',
    fontStyle: 'italic',
  },
})
