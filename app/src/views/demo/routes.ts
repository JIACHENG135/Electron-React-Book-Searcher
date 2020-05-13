const routes: RouteConfig[] = [
  {
    key: 'Demo',
    path: '/demo',
    windowOptions: {
      frame: false,

      titleBarStyle: 'default',
    },
    createConfig: {
      single: false,
    },
  },
  {
    key: 'PageParams',
    path: '/page-params/:test',
  },
]

export default routes
