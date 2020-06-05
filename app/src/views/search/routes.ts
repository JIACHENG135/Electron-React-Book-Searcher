const routes: RouteConfig[] = [
  {
    key: 'SearchPage',
    path: '/search',
    createConfig: {
      single: false,
    },
    windowOptions: {
      resizable: true,
    },
  },
  {
    key: 'PageParams',
    path: '/page-params/:test',
  },
]

export default routes
