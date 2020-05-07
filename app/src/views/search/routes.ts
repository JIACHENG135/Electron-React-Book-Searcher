const routes: RouteConfig[] = [
  {
    key: 'SearchPage',
    path: '/search',
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
