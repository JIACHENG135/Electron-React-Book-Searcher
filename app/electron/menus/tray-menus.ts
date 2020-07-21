import { MenuItemConstructorOptions } from 'electron'

export const trayMenus: MenuItemConstructorOptions[] = [
  {
    label: 'Help',
    submenu: [{ label: 'About', click: () => $tools.createWindow('About') }],
  },

  { type: 'separator' },

  { label: 'Quit', role: 'quit' },
]
