const routes: RouteConfig[] = [
  {
    key: 'Details',
    path: '/details',
    windowOptions: {
      width: 610,
      height: 380,
      frame: false,
      title: 'Details',
      titleBarStyle: 'hiddenInset',
      transparent: true,
      resizable: false,
      maximizable: false,
    },
    createConfig: {
      showTitlebar: false,
      showSidebar: false,
      hideMenus: true,
      saveWindowBounds: false,
    },
  },
]

export default routes
