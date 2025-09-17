export const spanishTranslations = {
  phoneAuth: {
    signIn: 'Iniciar Sesión',
    signInSubtitle: 'Ingresa tu número de teléfono para comenzar',
    enterVerificationCode: 'Ingresa el Código de Verificación',
    verificationCodeSubtitle: 'Hemos enviado un código de verificación a',
    phoneNumberPlaceholder: 'Número de teléfono',
    codeInputPlaceholder: 'Ingresa el código de 6 dígitos',
    sendVerificationCode: 'Enviar Código de Verificación',
    verifyCode: 'Verificar Código',
    backToPhoneNumber: 'Volver al Número de Teléfono',
    disclaimer:
      'Al continuar, aceptas recibir mensajes SMS para verificación. Se pueden aplicar tarifas estándar.',

    // Error messages
    errors: {
      enterPhoneNumber: 'Por favor ingresa un número de teléfono',
      invalidPhoneNumber:
        'Por favor ingresa un número de teléfono válido con código de país',
      enterVerificationCode: 'Por favor ingresa el código de verificación',
      noVerificationSession:
        'No se encontró sesión de verificación. Por favor intenta de nuevo.',
      sendVerificationFailed: 'Error al enviar el código de verificación',
      invalidVerificationCode: 'Código de verificación inválido',
    },

    // Success messages
    success: {
      verificationCodeSent: 'Código de Verificación Enviado',
      verificationCodeSentMessage: 'Se ha enviado un código de verificación a',
      phoneVerified: 'Éxito',
      phoneVerifiedMessage: '¡Número de teléfono verificado exitosamente!',
    },
  },
} as const
