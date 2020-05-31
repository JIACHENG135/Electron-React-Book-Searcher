const routes: RouteConfig[] = [
  {
    key: 'Details',
    path: '/details',
    windowOptions: {
      width: 610,
      height: 380,
      frame: false,
      title: 'Details',
      transparent: true,
      resizable: true,
    },
    createConfig: {
      showTitlebar: false,
      hideMenus: true,
      saveWindowBounds: false,
    },
  },
]

export default routes
