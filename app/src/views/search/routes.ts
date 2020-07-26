const routes: RouteConfig[] = [
  {
    key: 'SearchPage',
    path: '/search',
    createConfig: {
      single: true,
    },
    windowOptions: {
      resizable: true,
      vibrancy: 'light',
    },
  },
  {
    key: 'PageParams',
    path: '/page-params/:test',
  },
]

export default routes
