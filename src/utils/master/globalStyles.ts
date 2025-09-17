import { StyleSheet } from 'react-native'

import { colors } from '../../assets/colors'
import { DIMENSIONS } from './dimensions'

export const globalStyle = StyleSheet.create({
  // ----- TYPOGRAPHY -----
  textDisplay: {
    color: colors.textInverse,
    fontSize: DIMENSIONS.typography.display,
    fontWeight: '700',
    lineHeight: DIMENSIONS.typography.display * 1.2,
  },

  textExtraLarge: {
    color: colors.textInverse,
    fontSize: DIMENSIONS.typography.xxxl,
    fontWeight: '600',
    lineHeight: DIMENSIONS.typography.xxxl * 1.3,
  },

  textLarge: {
    color: colors.textInverse,
    fontSize: DIMENSIONS.typography.xxl,
    fontWeight: '600',
    lineHeight: DIMENSIONS.typography.xxl * 1.4,
  },

  textTitle: {
    color: colors.textInverse,
    fontSize: DIMENSIONS.typography.xl,
    fontWeight: '600',
    lineHeight: DIMENSIONS.typography.xl * 1.4,
  },

  textSubtitle: {
    color: colors.textInverse,
    fontSize: DIMENSIONS.typography.lg,
    fontWeight: '500',
    lineHeight: DIMENSIONS.typography.lg * 1.5,
  },

  textBody: {
    color: colors.textInverse,
    fontSize: DIMENSIONS.typography.base,
    fontWeight: '400',
    lineHeight: DIMENSIONS.typography.base * 1.5,
  },

  textBodyMedium: {
    color: colors.textInverse,
    fontSize: DIMENSIONS.typography.md,
    fontWeight: '400',
    lineHeight: DIMENSIONS.typography.md * 1.5,
  },

  textSmall: {
    color: colors.textInverse,
    fontSize: DIMENSIONS.typography.sm,
    fontWeight: '400',
    lineHeight: DIMENSIONS.typography.sm * 1.4,
  },

  textExtraSmall: {
    color: colors.textInverse,
    fontSize: DIMENSIONS.typography.xs,
    fontWeight: '400',
    lineHeight: DIMENSIONS.typography.xs * 1.3,
  },

  // ----- text setups -----
  textBold: {
    fontWeight: '800',
  },

  textSemiBold: {
    fontWeight: '600',
  },

  textMedium: {
    fontWeight: '500',
  },

  textCenter: {
    textAlign: 'center',
  },

  textLeft: {
    textAlign: 'left',
  },

  textRight: {
    textAlign: 'right',
  },

  // ----- text colors -----
  textPrimary: {
    color: colors.primary,
  },

  textSecondary: {
    color: colors.textSecondary,
  },

  textError: {
    color: colors.error,
  },

  textSuccess: {
    color: colors.tertiary,
  },

  textWarning: {
    color: colors.accent,
  },

  textWhite: {
    color: colors.textInverse,
  },

  textBlack: {
    color: colors.textPrimary,
  },

  // ----- Direction -----
  rowSpace: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  rowAround: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },

  row: {
    flexDirection: 'row',
  },

  // ----- Common combinations -----
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  rowCentered: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  rowStart: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  // ----- content -----
  contentWidth: {
    width: DIMENSIONS.screen.contentWidth,
  },

  // ----- position -----

  absolute: {
    position: 'absolute',
  },

  relative: {
    position: 'relative',
  },

  absoluteFill: {
    ...StyleSheet.absoluteFillObject,
  },

  absoluteTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },

  absoluteBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },

  // ----- shadow -----
  shadowSmall: {
    shadowColor: colors.shadowLight,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 1,
    shadowRadius: 2.22,
    elevation: 3,
  },

  shadowMedium: {
    shadowColor: colors.shadowMedium,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 3.84,
    elevation: 5,
  },

  shadowLarge: {
    shadowColor: colors.shadowDark,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 1,
    shadowRadius: 4.65,
    elevation: 8,
  },
})
