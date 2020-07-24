import * as React from 'react'

import Store from 'electron-store'
import './trans-window.less'

// import ReactLoading from 'react-loading'
import { IpcRenderer, Shell, BrowserWindow, Remote, DownloadItem } from 'electron'
// import { Button, Input, Spin, Card } from 'antd'

// import './login.module.less'
// import './canvas.less'

interface LoginProps extends PageProps, StoreProps {}

declare interface LoginState {
  translated: string
  loading: boolean
  winHeight: number
  winWidth: number
  poster: string
}

declare global {
  interface Window {
    require: (
      module: 'electron'
    ) => {
      ipcRenderer: IpcRenderer
      shell: Shell
      remote: Remote
      downloadItem: DownloadItem
    }
  }
}

const { ipcRenderer, shell, remote, downloadItem } = window.require('electron')

/**
 * DemoProps 是组件的 props 类型声明
 * DemoState 是组件的 state 类型声明
 * props 和 state 的默认值需要单独声明
 */
const store = new Store<any>()
const win: BrowserWindow = remote.getCurrentWindow()
const winSize = win.getSize()
export default class Login extends React.Component<LoginProps, LoginState> {
  // state 初始化
  state: LoginState = {
    translated: '',
    loading: true,
    winHeight: winSize[1],
    winWidth: winSize[0],
    poster: store.get('poster'),
  }

  // 构造函数
  constructor(props: LoginProps) {
    super(props)
  }

  sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  canva = (<canvas></canvas>)
  throttle(fn: Function, rateTime: number) {
    let prev = Date.now() - rateTime
    return (...args: any[]) => {
      if (Date.now() - prev >= rateTime) {
        fn.apply(this, args)
        prev = Date.now()
      }
    }
  }
  componentDidMount() {
    win.on('resize', this.throttle(this.onResize, 100).bind(this, win))
  }
  onResize(win: BrowserWindow) {
    const bound = win.getSize()
    this.setState({
      winHeight: bound[1],
      winWidth: bound[0],
    })
  }
  render() {
    const { winHeight, winWidth, poster } = this.state
    const url = store.get('play-url')

    // const bound = win.getSize()

    // const loadingBar = (
    //   <div>
    //     <ReactLoading className="loading-bubble" type="spinningBubbles" color="black" height={30} width={30} />
    //   </div>
    // )

    // const { count: reduxCount, countAlias } = this.props
    return (
      <div className="container-window">
        <video
          id="my-video"
          className="video-js"
          controls
          preload="auto"
          width={winWidth}
          height={winHeight}
          poster={poster}
          data-setup="{}"
        >
          <source src={url} type="video/mp4" />
          <source src="MY_VIDEO.webm" type="video/webm" />
          <p className="vjs-no-js">
            To view this video please enable JavaScript, and consider upgrading to a web browser that
            <a href="https://videojs.com/html5-video-support/">supports HTML5 video</a>
          </p>
        </video>
      </div>
    )
  }
} // class Demo end
