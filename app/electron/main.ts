import { app, Tray, BrowserWindow, globalShortcut, clipboard, screen, ipcMain } from 'electron'

import { creatAppTray } from './tray'
import Store from 'electron-store'
$tools.log.info(`Application <${$tools.APP_NAME}> launched.`)
const store = new Store<any>()

let tray: Tray
let activeWin: BrowserWindow | boolean
app.allowRendererProcessReuse = true

ipcMain.on('Slow Down', (event: any, mes: any) => {
  $tools.windowList.get('Details')?.webContents.send('CanSlowDown', mes)
})

app.on('ready', () => {
  tray = creatAppTray()

  globalShortcut.register('CommandOrControl+C+T', () => {
    store.set('clipboard', clipboard.readText())
    activeWin = $tools.activeWindow('Trans')
    if (activeWin) {
      activeWin.reload()
    } else {
      $tools.createWindow('Trans', {
        windowOptions: {
          title: 'Translating results',
          transparent: true,
          minWidth: 200,
          minHeight: 200,
          width: 500,
          height: 200,
          titleBarStyle: 'customButtonsOnHover',
          vibrancy: 'light',
          resizable: false,
        },
      })
    }
  })
  $tools.createWindow('About')
})

app.on('activate', () => {
  if (process.platform == 'darwin') {
    $tools.createWindow('About')
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
