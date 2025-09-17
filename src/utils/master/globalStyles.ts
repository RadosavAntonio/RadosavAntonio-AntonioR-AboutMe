import { StyleSheet } from 'react-native'

import { Theme } from '../../contexts/ThemeContext'
import { useThemedStyles } from '../../hooks/master/useThemedStyles'
import { DIMENSIONS } from './dimensions'

const createGlobalStyles = (theme: Theme) => ({
  // ----- TYPOGRAPHY -----
  textDisplay: {
    color: theme.colors.textInverse,
    fontSize: DIMENSIONS.typography.display,
    fontWeight: '700' as const,
    lineHeight: DIMENSIONS.typography.display * 1.2,
  },

  textExtraLarge: {
    color: theme.colors.textInverse,
    fontSize: DIMENSIONS.typography.xxxl,
    fontWeight: '600' as const,
    lineHeight: DIMENSIONS.typography.xxxl * 1.3,
  },

  textLarge: {
    color: theme.colors.textInverse,
    fontSize: DIMENSIONS.typography.xxl,
    fontWeight: '600' as const,
    lineHeight: DIMENSIONS.typography.xxl * 1.4,
  },

  textTitle: {
    color: theme.colors.textInverse,
    fontSize: DIMENSIONS.typography.xl,
    fontWeight: '600' as const,
    lineHeight: DIMENSIONS.typography.xl * 1.4,
  },

  textSubtitle: {
    color: theme.colors.textInverse,
    fontSize: DIMENSIONS.typography.lg,
    fontWeight: '500' as const,
    lineHeight: DIMENSIONS.typography.lg * 1.5,
  },

  textBody: {
    color: theme.colors.textInverse,
    fontSize: DIMENSIONS.typography.base,
    fontWeight: '400' as const,
    lineHeight: DIMENSIONS.typography.base * 1.5,
  },

  textBodyMedium: {
    color: theme.colors.textInverse,
    fontSize: DIMENSIONS.typography.md,
    fontWeight: '400' as const,
    lineHeight: DIMENSIONS.typography.md * 1.5,
  },

  textSmall: {
    color: theme.colors.textInverse,
    fontSize: DIMENSIONS.typography.sm,
    fontWeight: '400' as const,
    lineHeight: DIMENSIONS.typography.sm * 1.4,
  },

  textExtraSmall: {
    color: theme.colors.textInverse,
    fontSize: DIMENSIONS.typography.xs,
    fontWeight: '400' as const,
    lineHeight: DIMENSIONS.typography.xs * 1.3,
  },

  // ----- text setups -----
  textBold: {
    fontWeight: '800' as const,
  },

  textSemiBold: {
    fontWeight: '600' as const,
  },

  textMedium: {
    fontWeight: '500' as const,
  },

  textCenter: {
    textAlign: 'center' as const,
  },

  textLeft: {
    textAlign: 'left' as const,
  },

  textRight: {
    textAlign: 'right' as const,
  },

  // ----- text colors -----
  textPrimary: {
    color: theme.colors.primary,
  },

  textSecondary: {
    color: theme.colors.textSecondary,
  },

  textError: {
    color: theme.colors.error,
  },

  textSuccess: {
    color: theme.colors.tertiary,
  },

  textWarning: {
    color: theme.colors.accent,
  },

  textWhite: {
    color: theme.colors.textInverse,
  },

  textBlack: {
    color: theme.colors.textPrimary,
  },

  // ----- Direction -----
  rowSpace: {
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    alignItems: 'center' as const,
  },

  rowAround: {
    flexDirection: 'row' as const,
    justifyContent: 'space-around' as const,
    alignItems: 'center' as const,
  },

  row: {
    flexDirection: 'row' as const,
  },

  // ----- Common combinations -----
  centerContent: {
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
  },

  rowCentered: {
    flexDirection: 'row' as const,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
  },

  rowBetween: {
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    alignItems: 'center' as const,
  },

  rowStart: {
    flexDirection: 'row' as const,
    justifyContent: 'flex-start' as const,
    alignItems: 'center' as const,
  },

  // ----- Flex -----
  flex: {
    flex: 1,
  },

  // ----- content -----
  contentWidth: {
    width: DIMENSIONS.screen.contentWidth,
  },

  // ----- position -----

  absolute: {
    position: 'absolute' as const,
  },

  relative: {
    position: 'relative' as const,
  },

  absoluteFill: {
    ...StyleSheet.absoluteFillObject,
  },

  absoluteTop: {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    right: 0,
  },

  absoluteBottom: {
    position: 'absolute' as const,
    bottom: 0,
    left: 0,
    right: 0,
  },

  // ----- shadow -----
  shadowSmall: {
    shadowColor: theme.colors.shadowLight,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 1,
    shadowRadius: 2.22,
    elevation: 3,
  },

  shadowMedium: {
    shadowColor: theme.colors.shadowMedium,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 3.84,
    elevation: 5,
  },

  shadowLarge: {
    shadowColor: theme.colors.shadowDark,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 1,
    shadowRadius: 4.65,
    elevation: 8,
  },
})

export const useGlobalStyles = () => {
  return useThemedStyles(createGlobalStyles)
}
