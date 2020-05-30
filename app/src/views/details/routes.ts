const routes: RouteConfig[] = [
  {
    key: 'Details',
    path: '/details',
    windowOptions: {
      width: 600,
      height: 380,
      frame: false,
      title: 'Details',
      transparent: true,
      resizable: false,
    },
    createConfig: {
      showTitlebar: false,
      hideMenus: true,
      saveWindowBounds: true,
    },
  },
]

export default routes
