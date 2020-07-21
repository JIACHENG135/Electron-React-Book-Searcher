import { app, Tray, BrowserWindow, globalShortcut, clipboard, screen } from 'electron'

import { creatAppTray } from './tray'
import Store from 'electron-store'
$tools.log.info(`Application <${$tools.APP_NAME}> launched.`)
const store = new Store<any>()

let tray: Tray

app.allowRendererProcessReuse = true

app.on('ready', () => {
  tray = creatAppTray()

  globalShortcut.register('Cmd+C+T', () => {
    store.set('clipboard', clipboard.readText())
    $tools.createWindow('Trans', {
      windowOptions: {
        title: 'Translating results',
        transparent: true,
        minWidth: 200,
        minHeight: 200,
        width: 200,
        height: 200,
        titleBarStyle: 'customButtonsOnHover',
        vibrancy: 'light',
      },
    })
  })
  $tools.createWindow('SearchPage')
})

app.on('activate', () => {
  if (process.platform == 'darwin') {
    $tools.createWindow('SearchPage')
  }
})

app.on('window-all-closed', function() {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('before-quit', () => {
  $tools.log.info(`Application <${$tools.APP_NAME}> has exited normally.`)
  if (process.platform === 'win32') {
    tray.destroy()
  }
})
