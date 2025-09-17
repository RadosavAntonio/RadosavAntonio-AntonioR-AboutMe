import { BORDER_RADIUS, SCREEN_MARGIN_HORIZONTAL } from './constants'
import {
  getSize,
  getWidthByRatio,
  getWindowHeight,
  getWindowWidth,
} from './globalUtilityFunctionsAndConstants'

/**
 * Comprehensive dimension system for consistent spacing and sizing
 * throughout the application. All values are responsive and scale
 * based on screen size.
 */
export const DIMENSIONS = {
  // ----- SCREEN DIMENSIONS -----
  screen: {
    width: getWindowWidth(),
    height: getWindowHeight(),
    contentWidth: getWidthByRatio(1) - 2 * SCREEN_MARGIN_HORIZONTAL,
    margin: SCREEN_MARGIN_HORIZONTAL,
  },

  // ----- SPACING SCALE -----
  spacing: {
    xs: getSize(4), // 4px base
    sm: getSize(8), // 8px base
    md: getSize(12), // 12px base
    lg: getSize(16), // 16px base
    xl: getSize(24), // 24px base
    xxl: getSize(32), // 32px base
    xxxl: getSize(48), // 48px base
    xxxxl: getSize(64), // 64px base
  },

  // ----- TYPOGRAPHY SCALE -----
  typography: {
    xs: getSize(10), // Caption, labels
    sm: getSize(12), // Small text, metadata
    base: getSize(14), // Body text
    md: getSize(16), // Larger body text
    lg: getSize(18), // Subheadings
    xl: getSize(20), // Small titles
    xxl: getSize(24), // Titles
    xxxl: getSize(32), // Large titles
    display: getSize(40), // Hero text

    // ----- Line height multipliers -----
    lineHeight: {
      tight: 1.2,
      normal: 1.4,
      relaxed: 1.6,
    },
  },

  // ----- ICON SIZES -----
  icons: {
    xs: getSize(12), // Small inline icons
    sm: getSize(16), // Standard icons
    md: getSize(20), // Medium icons
    lg: getSize(24), // Large icons
    xl: getSize(32), // Extra large icons
    xxl: getSize(48), // Hero icons
    xxxl: getSize(64), // Oversized icons
  },

  // ----- TOUCH TARGETS -----
  touchTargets: {
    min: getSize(44), // iOS minimum (44px)
    small: getSize(48), // Small buttons
    medium: getSize(56), // Standard buttons
    large: getSize(64), // Large buttons
    hero: getSize(80), // Hero buttons
  },

  // ----- COMPONENT DIMENSIONS -----
  components: {
    // ----- Buttons -----
    button: {
      small: getSize(32),
      medium: getSize(48),
      large: getSize(56),
      hero: getSize(64),
    },

    // ----- Inputs -----
    input: {
      small: getSize(40),
      medium: getSize(48),
      large: getSize(56),
    },

    // ----- Cards and containers -----
    card: {
      small: getSize(80),
      medium: getSize(120),
      large: getSize(160),
    },

    // ----- Navigation -----
    header: getSize(64),
    tabBar: getSize(80),
    bottomSheet: {
      handle: getSize(4),
      handleWidth: getSize(36),
    },

    // ----- Avatar sizes -----
    avatar: {
      xs: getSize(24),
      sm: getSize(32),
      md: getSize(48),
      lg: getSize(64),
      xl: getSize(96),
      xxl: getSize(128),
    },

    // ----- Modal dimensions -----
    modal: {
      borderRadius: BORDER_RADIUS[20],
      padding: getSize(24),
      margin: getSize(16),
    },
  },

  // ----- BORDER RADIUS -----
  borderRadius: {
    none: 0,
    xs: BORDER_RADIUS[10],
    sm: BORDER_RADIUS[13],
    md: BORDER_RADIUS[20],
    lg: BORDER_RADIUS[25],
    xl: BORDER_RADIUS[40],
    circle: BORDER_RADIUS.circle,
  },

  // ----- ELEVATION/SHADOW LEVELS -----
  elevation: {
    none: 0,
    small: 2,
    medium: 4,
    large: 8,
    extraLarge: 16,
  },

  // ----- LAYOUT BREAKPOINTS -----
  breakpoints: {
    // ----- For responsive design -----
    small: 360, // Small phones
    medium: 768, // Tablets
    large: 1024, // Large tablets/small desktops
  },

  // ----- ANIMATION DURATIONS -----
  animation: {
    fast: 150, // Quick transitions
    normal: 250, // Standard transitions
    slow: 350, // Slower transitions
    slowest: 500, // Longest transitions
  },

  // ----- Z-INDEX LAYERS -----
  zIndex: {
    background: -1,
    base: 0,
    content: 1,
    elevated: 10,
    overlay: 100,
    modal: 1000,
    popover: 1010,
    tooltip: 1020,
    toast: 1030,
    maximum: 9999,
  },
}
