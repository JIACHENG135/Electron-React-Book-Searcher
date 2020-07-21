const routes: RouteConfig[] = [
  {
    key: 'Trans',
    path: '/trans',
    windowOptions: {
      title: 'transparent window',
      frame: false,
      transparent: true,
    },
    createConfig: {
      showSidebar: false,
      saveWindowBounds: false,
      // openDevTools: true,
    },
  },
]

export default routes
