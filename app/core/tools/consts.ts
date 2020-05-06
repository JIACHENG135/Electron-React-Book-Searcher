import { app, BrowserWindowConstructorOptions } from 'electron'
import { asAssetsPath } from './paths'

/** 应用名称 */
export const APP_NAME = app.name

/** 应用版本 */
export const APP_VERSION = app.getVersion()

/** 应用标题 */
export const APP_TITLE = 'Electron Antd'

/** 应用主图标 (桌面) */
export const APP_ICON = asAssetsPath('app-icon/app-icon@256.png')
export const APP_SVG = asAssetsPath('tools-icon/index-svg-white.svg')

/** 亮色风格托盘图标 标准尺寸 16*16, 系统会自动载入 @2x 和 @3x */
export const TRAY_ICON_LIGHT = asAssetsPath('tray-icon/tray-icon-light.png')

/** 动态小猫gif图像 */
export const CAT_GIF = asAssetsPath('tools-icon/cat-gif-2.gif')
export const SVG_ICON = asAssetsPath('tools-icon/index-svg.svg')
export const HISTORY = asAssetsPath('tools-icon/history.jpg')
export const WENXUE = asAssetsPath('tools-icon/wenxue.jpg')
export const SHEKE = asAssetsPath('tools-icon/sheke.jpg')
export const BIO = asAssetsPath('tools-icon/biography.jpg')
export const SCIENCE = asAssetsPath('tools-icon/science.jpg')

/** 暗色风格托盘图标 (仅 macOS) */
export const TRAY_ICON_DARK = asAssetsPath('tray-icon/tray-icon-dark.png')

/** 创建新窗口时默认加载的选项 */
export const DEFAULT_WINDOW_OPTIONS: BrowserWindowConstructorOptions = {
  icon: APP_ICON,
  minWidth: 200,
  minHeight: 200,
  width: 800,
  height: 600,
  show: false,
  hasShadow: true,
  webPreferences: {
    nodeIntegration: true,
    scrollBounce: true,
  },
  // titleBarStyle: 'hidden', // 隐藏标题栏, 但显示窗口控制按钮
  // frame: process.platform === 'darwin' ? true : false, // 无边框窗口
  // frame: false, // 无边框窗口
  // skipTaskbar: false, // 是否在任务栏中隐藏窗口
  // backgroundColor: '#fff',
  // transparent: true, // 窗口是否透明
  // titleBarStyle: 'default',
  vibrancy: 'selection', // 毛玻璃效果
}

export const DEFAULT_INITIAL_CONFIG: CreateConfig = {
  showSidebar: false,
  showTitlebar: true,
  autoShow: true,
  delayToShow: 10,
  single: true,
}
