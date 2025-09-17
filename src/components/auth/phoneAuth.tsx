import React from 'react'
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import PhoneNumberInput from 'react-native-international-phone-number'
import { usePhoneAuthTranslations } from '../../contexts/LanguageContext'
import { Theme } from '../../contexts/ThemeContext'
import { usePhoneAuth } from '../../hooks/login/usePhoneAuth'
import { useThemedStyles } from '../../hooks/master/useThemedStyles'
import { useGlobalStyles } from '../../utils/master/globalStyles'

interface PhoneAuthProps {}

function PhoneAuth({}: PhoneAuthProps) {
  // Use the custom phone auth hook
  const {
    selectedCountry,
    inputValue,
    fullPhoneNumber,
    confirmation,
    verificationCode,
    loading,
    error,
    handleInputValue,
    handleSelectedCountry,
    handlePhoneNumberChange,
    setVerificationCode,
    sendVerificationCode,
    confirmVerificationCode,
    resetForm,
  } = usePhoneAuth()

  // Use themed styles, global styles, and translations
  const styles = useThemedStyles(createStyles)
  const globalStyles = useGlobalStyles()
  const t = usePhoneAuthTranslations()

  // Show verification code input if we have a confirmation
  if (confirmation) {
    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={styles.content}>
          <View style={[styles.headerSection, globalStyles.centerContent]}>
            <Text style={[globalStyles.textTitle, styles.titleSpacing]}>
              {t.enterVerificationCode}
            </Text>
            <Text
              style={[
                globalStyles.textBody,
                globalStyles.textSecondary,
                styles.subtitleSpacing,
              ]}>
              {t.verificationCodeSubtitle} {fullPhoneNumber}
            </Text>
          </View>

          <View style={styles.inputSection}>
            <TextInput
              style={[
                styles.codeInput,
                globalStyles.textCenter,
                globalStyles.shadowSmall,
              ]}
              value={verificationCode}
              onChangeText={setVerificationCode}
              placeholder={t.codeInputPlaceholder}
              placeholderTextColor={globalStyles.textSecondary.color}
              keyboardType="number-pad"
              maxLength={6}
              editable={!loading}
            />

            {error ? (
              <Text
                style={[
                  globalStyles.textError,
                  globalStyles.textCenter,
                  styles.errorSpacing,
                ]}>
                {error}
              </Text>
            ) : null}
          </View>

          <View style={styles.buttonSection}>
            <TouchableOpacity
              style={[
                styles.primaryButton,
                globalStyles.shadowMedium,
                loading && styles.buttonDisabled,
              ]}
              onPress={confirmVerificationCode}
              disabled={loading}>
              {loading ? (
                <ActivityIndicator color="#FFFFFF" size="small" />
              ) : (
                <Text
                  style={[globalStyles.textSemiBold, styles.primaryButtonText]}>
                  {t.verifyCode}
                </Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.secondaryButton, globalStyles.centerContent]}
              onPress={resetForm}>
              <Text
                style={[globalStyles.textMedium, styles.secondaryButtonText]}>
                {t.backToPhoneNumber}
              </Text>
            </TouchableOpacity>
          </View>
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
        <View style={[styles.headerSection, globalStyles.centerContent]}>
          <Text style={[globalStyles.textTitle, styles.titleSpacing]}>
            {t.signIn}
          </Text>
          <Text
            style={[
              globalStyles.textBody,
              globalStyles.textSecondary,
              styles.subtitleSpacing,
            ]}>
            {t.signInSubtitle}
          </Text>
        </View>

        <View style={styles.inputSection}>
          <View style={[styles.phoneInputContainer, globalStyles.shadowSmall]}>
            <PhoneNumberInput
              value={inputValue}
              onChangePhoneNumber={handlePhoneNumberChange}
              selectedCountry={selectedCountry}
              onChangeSelectedCountry={handleSelectedCountry}
              onChangeText={handleInputValue}
              placeholder={t.phoneNumberPlaceholder}
              style={styles.phoneInputStyle}
            />
          </View>

          {error ? (
            <Text
              style={[
                globalStyles.textError,
                globalStyles.textCenter,
                styles.errorSpacing,
              ]}>
              {error}
            </Text>
          ) : null}
        </View>

        <View style={styles.buttonSection}>
          <TouchableOpacity
            style={[
              styles.primaryButton,
              globalStyles.shadowMedium,
              (!fullPhoneNumber || loading) && styles.buttonDisabled,
            ]}
            onPress={sendVerificationCode}
            disabled={!fullPhoneNumber || loading}>
            {loading ? (
              <ActivityIndicator color="#FFFFFF" size="small" />
            ) : (
              <Text
                style={[globalStyles.textSemiBold, styles.primaryButtonText]}>
                {t.sendVerificationCode}
              </Text>
            )}
          </TouchableOpacity>

          <View style={[styles.disclaimerContainer, globalStyles.shadowSmall]}>
            <Text style={[globalStyles.textExtraSmall, styles.disclaimerText]}>
              {t.disclaimer}
            </Text>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  )
}

// ----- Improved Themed Styles with Global Style Integration -----
const createStyles = (theme: Theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 40,
    justifyContent: 'space-between' as const,
  },

  // ----- Section Layouts -----
  headerSection: {
    flex: 1,
    justifyContent: 'center' as const,
    minHeight: 120,
  },
  inputSection: {
    flex: 2,
    justifyContent: 'center' as const,
    paddingVertical: 20,
  },
  buttonSection: {
    flex: 1,
    justifyContent: 'flex-end' as const,
    minHeight: 140,
  },

  // ----- Spacing Utilities -----
  titleSpacing: {
    marginBottom: 12,
  },
  subtitleSpacing: {
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  errorSpacing: {
    marginTop: 12,
    marginBottom: 8,
  },

  // ----- Input Styles -----
  phoneInputContainer: {
    marginBottom: 24,
    borderRadius: 16,
    overflow: 'hidden' as const,
  },
  phoneInputStyle: {
    borderWidth: 1,
    borderColor: theme.colors.textTertiary,
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: theme.colors.surface,
    fontSize: 16,
    color: theme.colors.textPrimary,
  },
  codeInput: {
    borderWidth: 1,
    borderColor: theme.colors.primary,
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 20,
    fontSize: 24,
    backgroundColor: theme.colors.surface,
    marginBottom: 24,
    letterSpacing: 12,
    color: theme.colors.textPrimary,
    fontWeight: '600' as const,
  },

  // ----- Button Styles -----
  primaryButton: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 18,
    paddingHorizontal: 24,
    borderRadius: 16,
    alignItems: 'center' as const,
    marginBottom: 24,
    minHeight: 56,
    justifyContent: 'center' as const,
  },
  primaryButtonText: {
    color: theme.colors.textOnPrimary,
    fontSize: 18,
  },
  buttonDisabled: {
    backgroundColor: theme.colors.textTertiary,
    shadowOpacity: 0,
    elevation: 0,
  },
  secondaryButton: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    marginTop: 8,
  },
  secondaryButtonText: {
    color: theme.colors.primary,
    fontSize: 16,
    textAlign: 'center' as const,
  },

  // ----- Disclaimer Section -----
  disclaimerContainer: {
    backgroundColor: theme.colors.accent,
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
  },
  disclaimerText: {
    color: theme.colors.textOnAccent,
    textAlign: 'center' as const,
    lineHeight: 18,
  },

  // ----- Legacy styles for backward compatibility -----
  title: {
    fontSize: 32,
    fontWeight: 'bold' as const,
    color: theme.colors.textPrimary,
    marginBottom: 12,
    textAlign: 'center' as const,
  },
  subtitle: {
    fontSize: 16,
    color: theme.colors.textSecondary,
    marginBottom: 32,
    textAlign: 'center' as const,
    lineHeight: 24,
    paddingHorizontal: 16,
  },
  button: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center' as const,
    marginBottom: 16,
    shadowColor: theme.colors.shadowPrimary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: theme.colors.textOnPrimary,
    fontSize: 16,
    fontWeight: '600' as const,
  },
  errorText: {
    color: theme.colors.error,
    fontSize: 14,
    marginBottom: 16,
    textAlign: 'center' as const,
  },
  disclaimer: {
    fontSize: 12,
    color: theme.colors.textOnAccent,
    textAlign: 'center' as const,
    lineHeight: 16,
  },
})

export default PhoneAuth
