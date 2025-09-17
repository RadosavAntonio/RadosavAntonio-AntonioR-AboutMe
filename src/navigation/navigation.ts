export enum Screens {
  //Login
  LOGIN = 'Login',

  //Home
  HOME_SCREEN = 'Home Screen',

  //Ai
  AI_SELECT = 'AI Select',

  //Utils
  URL_VIEW = 'Url view',
  LOADING = 'Loading',
}

export type AppNavigationParams = {
  //Login
  [Screens.LOGIN]: undefined

  //Home
  [Screens.HOME_SCREEN]: undefined

  //Ai
  [Screens.AI_SELECT]: undefined

  //Utils
  [Screens.URL_VIEW]: { url: string }
  [Screens.LOADING]: undefined
}

export enum HomeTabRoute {
  HOME_TAB = 'Home tab',
  AI_TAB = 'AI tab',
}

export type HomeTabList = {
  [HomeTabRoute.HOME_TAB]: undefined
  [HomeTabRoute.AI_TAB]: undefined
}
