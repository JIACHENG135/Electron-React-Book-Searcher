const routes: RouteConfig[] = [
  {
    key: 'Preview',
    path: '/preview',
    windowOptions: {
      title: 'Preview',
      width: 1200,
      height: 600,
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
