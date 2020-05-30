const routes: RouteConfig[] = [
  {
    key: 'Preview',
    path: '/preview',
    windowOptions: {
      title: 'Preview',
      width: 1200,
      height: 800,
      frame: false,
    },
    createConfig: {
      showSidebar: false,
      saveWindowBounds: true,
      // openDevTools: true,
    },
  },
]

export default routes
