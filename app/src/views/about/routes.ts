const routes: RouteConfig[] = [
  {
    key: 'About',
    path: '/about',
    windowOptions: {
      title: 'About',
      resizable: true,
      vibrancy: 'light',
    },
    createConfig: {
      showTitlebar: false,
      hideMenus: true,
    },
  },
]

export default routes
