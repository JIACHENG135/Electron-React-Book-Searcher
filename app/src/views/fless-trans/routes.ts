const routes: RouteConfig[] = [
  {
    key: 'Fless',
    path: '/fless',
    windowOptions: {
      title: 'frameless transparent window',
      frame: false,
      height: 500,
      width: 500,
      transparent: true,
      titleBarStyle: 'customButtonsOnHover',
    },
    createConfig: {
      showSidebar: false,
      saveWindowBounds: false,
      single: true,
      // openDevTools: true,
    },
  },
]

export default routes
