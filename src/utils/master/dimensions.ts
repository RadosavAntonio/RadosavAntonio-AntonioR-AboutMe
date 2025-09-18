import {
  getSize,
  getWidthByRatio,
  getWindowHeight,
  getWindowWidth,
} from './globalUtilityFunctionsAndConstants'

export const SCREEN_MARGIN_HORIZONTAL = getSize(12)

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
    [4]: getSize(4), // 4px base
    [8]: getSize(8), // 8px base
    [12]: getSize(12), // 12px base
    [16]: getSize(16), // 16px base
    [24]: getSize(24), // 24px base
    [32]: getSize(32), // 32px base
    [48]: getSize(48), // 48px base
    [64]: getSize(64), // 64px base
  },

  // ----- TYPOGRAPHY SCALE -----
  typography: {
    [10]: getSize(10), // Caption, labels
    [12]: getSize(12), // Small text, metadata
    [14]: getSize(14), // Body text
    [16]: getSize(16), // Larger body text
    [18]: getSize(18), // Subheadings
    [20]: getSize(20), // Small titles
    [24]: getSize(24), // Titles
    [32]: getSize(32), // Large titles
    [40]: getSize(40), // Hero text

    // ----- Line height multipliers -----
    lineHeight: {
      tight: 1.2,
      normal: 1.4,
      relaxed: 1.6,
    },
  },

  // ----- ICON SIZES -----
  icons: {
    [12]: getSize(12), // Small inline icons
    [16]: getSize(16), // Standard icons
    [20]: getSize(20), // Medium icons
    [24]: getSize(24), // Large icons
    [32]: getSize(32), // Extra large icons
    [48]: getSize(48), // Hero icons
    [64]: getSize(64), // Oversized icons
  },

  // ----- COMPONENT DIMENSIONS -----
  components: {
    // ----- Buttons -----
    button: {
      [32]: getSize(32),
      [48]: getSize(48),
      [56]: getSize(56),
      [64]: getSize(64),
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
      [24]: getSize(24),
      [32]: getSize(32),
      [48]: getSize(48),
      [64]: getSize(64),
      [96]: getSize(96),
      [128]: getSize(128),
    },

    // ----- Modal dimensions -----
    modal: {
      borderRadius: 13,
      padding: getSize(24),
      margin: getSize(16),
    },
  },

  // ----- BORDER RADIUS -----
  borderRadius: {
    [0]: 0,
    [10]: 10,
    [13]: 13,
    [20]: 20,
    [25]: 25,
    circle: 1000,
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
