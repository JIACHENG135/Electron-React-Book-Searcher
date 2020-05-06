const routes: RouteConfig[] = [
  {
    key: 'Search',
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
