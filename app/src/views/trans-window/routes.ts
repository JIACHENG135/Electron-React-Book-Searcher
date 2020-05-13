const routes: RouteConfig[] = [
  {
    key: 'Trans',
    path: '/trans',
    windowOptions: {
      title: 'transparent window',
      width: 400,
      height: 200,
      frame: false,
      transparent: true,
    },
    createConfig: {
      showSidebar: false,
      saveWindowBounds: true,
      // openDevTools: true,
    },
  },
]

export default routes
