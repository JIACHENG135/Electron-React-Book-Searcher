const routes: RouteConfig[] = [
  {
    key: 'Trans',
    path: '/trans',
    windowOptions: {
      title: 'transparent window',
      width: 600,
      height: 400,
      minWidth: 600,
      minHeight: 400,
      frame: true,
      transparent: true,
    },
    createConfig: {
      showSidebar: false,
      // saveWindowBounds: true,
      // openDevTools: true,
    },
  },
]

export default routes
