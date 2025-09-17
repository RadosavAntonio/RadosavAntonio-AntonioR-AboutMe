export const englishTranslations = {
  phoneAuth: {
    signIn: 'Sign In',
    signInSubtitle: 'Enter your phone number to get started',
    enterVerificationCode: 'Enter Verification Code',
    verificationCodeSubtitle: "We've sent a verification code to",
    phoneNumberPlaceholder: 'Phone number',
    codeInputPlaceholder: 'Enter 6-digit code',
    sendVerificationCode: 'Send Verification Code',
    verifyCode: 'Verify Code',
    backToPhoneNumber: 'Back to Phone Number',
    disclaimer:
      'By continuing, you agree to receive SMS messages for verification. Standard rates may apply.',

    // Error messages
    errors: {
      enterPhoneNumber: 'Please enter a phone number',
      invalidPhoneNumber: 'Please enter a valid phone number with country code',
      enterVerificationCode: 'Please enter the verification code',
      noVerificationSession: 'No verification session found. Please try again.',
      sendVerificationFailed: 'Failed to send verification code',
      invalidVerificationCode: 'Invalid verification code',
    },

    // Success messages
    success: {
      verificationCodeSent: 'Verification Code Sent',
      verificationCodeSentMessage: 'A verification code has been sent to',
      phoneVerified: 'Success',
      phoneVerifiedMessage: 'Phone number verified successfully!',
    },
  },
} as const
