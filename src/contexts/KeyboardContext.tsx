import React, {
  createContext,
  JSX,
  memo,
  ReactNode,
  useContext,
  useRef,
} from 'react'
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native'

import { useThemedStyles } from '../hooks/master/useThemedStyles'
import { DIMENSIONS } from '../utils/master/dimensions'
import { Theme } from './ThemeContext'

// ----- Keyboard Types -----
export interface KeyboardContextType {
  scrollViewRef: React.RefObject<ScrollView | null>
  inputRefs: React.MutableRefObject<any[]>
  registerInput: (ref: any, index: number) => void
  scrollToInput: (index: number) => void
  focusNextInput: (currentIndex: number) => void
  dismissKeyboard: () => void
  handleSubmitEditing: (currentIndex: number, totalInputs: number) => void
}

export interface KeyboardWrapperProps {
  children: ReactNode
  keyboardVerticalOffset?: number
  contentContainerStyle?: any
}

// ----- Keyboard Context -----
const KeyboardContext = createContext<KeyboardContextType | undefined>(
  undefined,
)

// ----- Keyboard Provider Component -----
interface KeyboardProviderProps {
  children: ReactNode
}

const KeyboardProviderInit = ({
  children,
}: KeyboardProviderProps): JSX.Element => {
  const scrollViewRef = useRef<ScrollView | null>(null)
  const inputRefs = useRef<any[]>([])

  // ----- Input Registration -----
  const registerInput = (ref: any, index: number) => {
    inputRefs.current[index] = ref
  }

  // ----- Auto Scroll to Input -----
  const scrollToInput = (index: number) => {
    const inputRef = inputRefs.current[index]
    const scrollView = scrollViewRef.current

    if (inputRef && scrollView) {
      inputRef.measureLayout(
        scrollView.getInnerViewNode(),
        (x: number, y: number) => {
          scrollView.scrollTo({
            y: y - DIMENSIONS.spacing[24],
            animated: true,
          })
        },
        () => {
          // Fallback if measureLayout fails
          console.warn('KeyboardContext: Failed to measure input layout')
        },
      )
    }
  }

  // ----- Focus Next Input -----
  const focusNextInput = (currentIndex: number) => {
    const nextInput = inputRefs.current[currentIndex + 1]
    if (nextInput) {
      nextInput.focus()
    } else {
      Keyboard.dismiss()
    }
  }

  // ----- Dismiss Keyboard -----
  const dismissKeyboard = () => {
    Keyboard.dismiss()
  }

  // ----- Handle Submit Editing -----
  const handleSubmitEditing = (currentIndex: number, totalInputs: number) => {
    if (currentIndex < totalInputs - 1) {
      focusNextInput(currentIndex)
    } else {
      dismissKeyboard()
    }
  }

  const contextValue: KeyboardContextType = {
    scrollViewRef,
    inputRefs,
    registerInput,
    scrollToInput,
    focusNextInput,
    dismissKeyboard,
    handleSubmitEditing,
  }

  return (
    <KeyboardContext.Provider value={contextValue}>
      {children}
    </KeyboardContext.Provider>
  )
}

export const KeyboardProvider = memo(KeyboardProviderInit)

// ----- Keyboard Hook -----
export const useKeyboard = (): KeyboardContextType => {
  const context = useContext(KeyboardContext)

  if (context === undefined) {
    throw new Error('useKeyboard must be used within a KeyboardProvider')
  }

  return context
}

// ----- Keyboard Wrapper Component -----
const KeyboardWrapperInit = ({
  children,
  keyboardVerticalOffset = DIMENSIONS.spacing[12],
  contentContainerStyle,
}: KeyboardWrapperProps): JSX.Element => {
  const styles = useThemedStyles(createStyles)
  const { scrollViewRef, dismissKeyboard } = useKeyboard()

  return (
    <KeyboardAvoidingView
      style={styles.keyboardAvoidingView}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={keyboardVerticalOffset}>
      <TouchableWithoutFeedback onPress={dismissKeyboard}>
        <ScrollView
          ref={scrollViewRef}
          contentContainerStyle={[
            styles.scrollViewContent,
            contentContainerStyle,
          ]}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          bounces={true}
          scrollEventThrottle={16}>
          {children}
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}

export const KeyboardWrapper = memo(KeyboardWrapperInit)

// ----- Themed Styles -----
const createStyles = (theme: Theme) =>
  StyleSheet.create({
    keyboardAvoidingView: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    scrollViewContent: {
      flexGrow: 1,
      paddingHorizontal: DIMENSIONS.spacing[16],
      paddingVertical: DIMENSIONS.spacing[12],
    },
  })
