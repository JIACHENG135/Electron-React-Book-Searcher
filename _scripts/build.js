const os = require('os')
const builder = require('electron-builder')

const Platform = builder.Platform
const { name, productName } = require('../package.json')

let targets
var platform = os.platform()

if (platform == 'darwin') {
  targets = Platform.MAC.createTarget()
} else if (platform == 'win32') {
  targets = Platform.WINDOWS.createTarget()
} else if (platform == 'linux') {
  targets = Platform.LINUX.createTarget()
}

const config = {
  appId: `com.mubaidr.${name}`,
  copyright: 'Copyright ©2019 mubaidr@gmail.com',
  // asar: false,
  // compression: 'store',
  productName,
  directories: {
    output: './build/',
  },
  files: ['_icons/icon.*', './dist/**/*'],
  dmg: {
    contents: [
      {
        path: '/Applications',
        type: 'link',
        x: 410,
        y: 230,
      },
      {
        type: 'file',
        x: 130,
        y: 230,
      },
    ],
    window: {
      height: 380,
      width: 540,
    },
  },
  linux: {
    icon: '_icons/icon.png',
    target: ['deb', 'snap', 'AppImage'],
  },
  mac: {
    category: 'public.app-category.utilities',
    icon: '_icons/icon.icns',
    target: ['dmg', 'zip'],
    type: 'distribution',
  },
  win: {
    icon: '_icons/libgen.png',
    target: ['nsis', 'zip', 'portable'],
  },
  nsis: {
    allowToChangeInstallationDirectory: true,
    oneClick: false,
  },
}

builder
  .build({
    targets,
    config,
  })
  .then(m => {
    console.log(m)
  })
  .catch(e => {
    console.error(e)
  })
