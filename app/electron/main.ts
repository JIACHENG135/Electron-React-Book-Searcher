import { app, Tray, BrowserWindow, globalShortcut, clipboard } from 'electron'

import { creatAppTray } from './tray'

$tools.log.info(`Application <${$tools.APP_NAME}> launched.`)

let tray: Tray

app.allowRendererProcessReuse = true

app.on('ready', () => {
  tray = creatAppTray()
  globalShortcut.register('Alt+Cmd+T', () => $tools.createWindow('Trans'))
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
