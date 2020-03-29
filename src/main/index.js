import { app, BrowserWindow, Menu } from 'electron'
import { productName } from '../../package.json'

// set app name
app.setName(productName)

// disable electron warning
process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = 'true'

const gotTheLock = app.requestSingleInstanceLock()
const isDev = process.env.NODE_ENV === 'development'
const isDebug = process.argv.includes('--debug')






let loadingScreen;
const createLoadingScreen = () => {
  /// create a browser window
  loadingScreen = new BrowserWindow(
    Object.assign({
      /// define width and height for the window
      width: 1260,
      height: 540,
      /// remove the window frame, so it will become a frameless window
      // frame: false,
      /// and set the transparency, to remove any window background color
      // transparent: true
    })
  );
  // loadingScreen.setResizable(false);
  loadingScreen.loadURL(`file://./loading.html`);
  // loadingScreen.loadURL('${__dirname}/loading.html')
  // loadingScreen.on('closed', () => (loadingScreen = null));
  // loadingScreen.webContents.on('did-finish-load', () => {
    // loadingScreen.show();
  // });
};







let mainWindow

// only allow single instance of application
// if (!isDev) {
//   if (gotTheLock) {
//     app.on('second-instance', () => {
//       // Someone tried to run a second instance, we should focus our window.
//       if (mainWindow && mainWindow.isMinimized()) {
//         mainWindow.restore()
//       }
//       mainWindow.focus()
//     })
//   } else {
//     app.quit()
//     process.exit(0)
//   }
// } else {
//   require('electron-debug')({
//     showDevTools: !(process.env.RENDERER_REMOTE_DEBUGGING === 'true'),
//   })
// }

async function installDevTools() {
  try {
    /* eslint-disable */
    require('devtron').install()
    require('vue-devtools').install()
    /* eslint-enable */
  } catch (err) {
    console.log(err)
  }
}

function createWindow() {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    width: 1260,
    height: 540,
    minWidth: 1260,
    minHeight: 540,
    titleBarStyle: 'hidden',
    // transparent: true,
    vibrancy: 'selection',
    webPreferences: {
      nodeIntegration: true,
      nodeIntegrationInWorker: false,
      webSecurity: false
    },
    show: false,
  })


  // eslint-disable-next-line
  setMenu()

  // load root file/url
  if (isDev) {
    // mainWindow.loadFile(`${__dirname}/index.html`)
    mainWindow.loadURL('http://localhost:9080')
  } else {
    mainWindow.loadFile(`${__dirname}/index.html`)

    global.__static = require('path')
      .join(__dirname, '/static')
      .replace(/\\/g, '\\\\')
  }
  mainWindow.webContents.on("did-finish-load",()=>{
    if (loadingScreen){
      loadingScreen.close();
    }
    mainWindow.show();
  })


  // Show when loaded
  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
    mainWindow.focus()
  })

  mainWindow.on('closed', () => {
    console.log('closed')
  })
}

app.on('ready', () => {
  // createLoadingScreen();
  createWindow()
  // mainWindow.setVibrancy("dark")
  if (isDev) {
    installDevTools()
  }

  if (isDebug) {
    mainWindow.webContents.openDevTools()
  }
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */

const sendMenuEvent = async data => {
  mainWindow.webContents.send('change-view', data)
}

const template = [
  {
    label: app.getName(),
    submenu: [
      {
        label: 'Home',
        accelerator: 'CommandOrControl+H',
        click() {
          sendMenuEvent({ route: '/' })
        },
      },
      { type: 'separator' },
      { role: 'minimize' },
      { role: 'togglefullscreen' },
      { type: 'separator' },
      { role: 'quit', accelerator: 'Alt+F4' },
    ],
  },
  {
    role: 'help',
    submenu: [
      {
        label: 'Get Help',
        role: 'help',
        accelerator: 'F1',
        click() {
          sendMenuEvent({ route: '/help' })
        },
      },
      {
        label: 'Enable Dev Tools',
        accelerator: "F12",
        click: () => {
          mainWindow.webContents.toggleDevTools();
        }
      },
      {
        label: 'About',
        role: 'about',
        accelerator: 'CommandOrControl+A',
        click() {
          sendMenuEvent({ route: '/about' })
        },
      },
    ],
  },
]

function setMenu() {
  if (process.platform === 'darwin') {
    template.unshift({
      label: app.getName(),
      submenu: [
        { role: 'about' },
        { type: 'separator' },
        { role: 'services' },
        { type: 'separator' },
        { role: 'hide' },
        { role: 'hideothers' },
        { role: 'unhide' },
        { type: 'separator' },
        { role: 'quit' },
      ],
    })

    template.push({
      role: 'window',
    })

    template.push({
      role: 'help',
    })

    template.push({ role: 'services' })
  }

  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)
}


