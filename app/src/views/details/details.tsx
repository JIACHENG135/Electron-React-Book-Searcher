import * as React from 'react'
// import { Button, Input, Spin, Card } from 'antd'
import axios from 'axios'
import { withStore } from '@/src/components'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { IpcRenderer, Shell, BrowserWindow, Remote, DownloadItem, Notification } from 'electron'
import Store from 'electron-store'
import { Layout, Button, Popover, Row, Col } from 'antd'
import {
  DownloadOutlined,
  ApartmentOutlined,
  CloseOutlined,
  EyeOutlined,
  FilePdfOutlined,
} from '@ant-design/icons'
import './details.less'
const { Content } = Layout
const store = new Store<any>()
interface DetailsProps extends PageProps, StoreProps {
  count: StoreStates['count']
  countAlias: StoreStates['count']
}

declare interface DetailsState {
  data: any
  s4books: any
  loading: boolean
  createWindowLoading: boolean
  asyncDispatchLoading: boolean
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
const data = store.get('detail')
const s4books = store.get('s4books')
let win: BrowserWindow
@withStore(['count', { countAlias: 'count' }])
export default class Details extends React.Component<DetailsProps, DetailsState> {
  // state 初始化
  state: DetailsState = {
    data: data,
    s4books: s4books,
    loading: false,
    createWindowLoading: false,
    asyncDispatchLoading: false,
  }
  // 构造函数
  constructor(props: DetailsProps) {
    super(props)
  }
  postoption: RequestOptions = {
    formData: false,
    method: 'GET',
    errorType: 'modal',
  }

  sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  handleClose() {
    this.props.closeWindow()
  }
  image = (<img src={$tools.SIGN_UP} width="100%" alt="sign" />)
  componentDidMount() {}
  handleDownload(url: string, filename: any) {
    const win: BrowserWindow = remote.getCurrentWindow()
    const savepath = `${$tools.AssetsPath('preview-file')}/${filename}`
    const n = new remote.Notification({
      icon: $tools.APP_ICON,
      title: 'Download completed',
      body: 'Download completed',
      sound: 'Purr',
    })
    win.webContents.downloadURL(url)
    win.webContents.session.on('will-download', (event: any, item: DownloadItem, webContents: any) => {
      item.setSavePath(savepath)
      console.log(savepath)
      item.once('done', (event: any, state: any) => {
        if (state === 'completed') {
          n.show()
          console.log('Finished downloading')
        } else {
          console.log(`Download failed: ${state}`)
        }
      })
    })
  }

  handleLibgenDownload(url: string, filename: any) {
    const win: BrowserWindow = remote.getCurrentWindow()
    const act_url =
      'http://93.174.95.29/fiction/' +
      this.state.data.images.large.replace('http://93.174.95.29/fictioncovers/', '').replace('.jpg', '') +
      '.' +
      this.state.data.extension +
      '/' +
      this.state.data.title +
      '.' +
      this.state.data.extension

    const savepath = `${$tools.AssetsPath('preview-file')}/${filename}`
    win.webContents.downloadURL(act_url)
    win.webContents.session.on('will-download', (event: any, item: DownloadItem, webContents: any) => {
      item.setSavePath(savepath)
      console.log(savepath)
      item.once('done', (event: any, state: any) => {
        if (state === 'completed') {
          console.log('Finished downloading')
        } else {
          console.log(`Download failed: ${state}`)
        }
      })
    })
  }
  handlePreviewPdf(locator: string, md5: string, filename: string) {
    // store.set('pdf-filename', filename)
    // store.set('locator', locator)
    // store.set('md5', md5)
    if (win) {
    } else {
      win = remote.getCurrentWindow()
    }
    let loadingUrl
    axios
      .get('http://127.0.0.1:8000/api/downloadlib/' + locator + '/' + md5 + '/' + filename)
      .then((res: any) => {
        loadingUrl = res.data
        store.set('loadingUrl', loadingUrl)
        // $tools.createWindow('Prepdf', {
        //   windowOptions: { title: 'Preview PDF file', transparent: false },
        // })
      })
  }
  handlePreview(url: string, filename: any) {
    store.set('filename', filename)
    if (win) {
    } else {
      win = remote.getCurrentWindow()
    }
    store.set('epuburl', url)
    $tools.createWindow('Preview', {
      windowOptions: { title: 'Preview', transparent: false },
    })
    store.set('bookname', this.state.data.title)
    // const prewin = win
    // const savepath = `${$tools.AssetsPath('preview-file')}/${filename}`
    // console.log(savepath)
    // axios({
    //   url: url, //your url
    //   method: 'GET',
    //   responseType: 'blob', // important
    // })
    //   .then((response: any) => {
    //     const url = window.URL.createObjectURL(new Blob([response.data]))
    //     const link = document.createElement('a')
    //     link.href = url
    //     link.setAttribute('download', filename) //or any other extension
    //     document.body.appendChild(link)
    //     link.click()
    //   })
    //   .finally(() => {
    //     $tools.createWindow('Preview', {
    //       windowOptions: { title: 'Preview', transparent: false },
    //     })
    //   })

    // prewin.webContents.session.downloadURL(url)
    // prewin.webContents.session.on('will-download', (event: any, item: DownloadItem, webContents: any) => {
    //   event.preventDefault()
    //   console.log(item.getFilename())
    //   console.log(savepath)
    //   item.savePath = savepath
    //   item.once('done', (event: any, state: any) => {
    //     if (state === 'completed') {
    //       $tools.createWindow('Preview', {
    //         windowOptions: { title: 'Preview', transparent: false },
    //       })
    //     } else {
    //       console.log(`Download failed: ${state}`)
    //     }
    //   })
    // })
  }
  render() {
    // const { resData, loading, createWindowLoading, asyncDispatchLoading } = this.state
    // const { count: reduxCount, countAlias } = this.props
    if (this.state.loading) {
      return <div>loading</div>
    }
    let summarytext, summarytag
    let authortext, authortag
    let hasEpub, preview, filename, trans

    if (this.state.s4books.files.length > 0) {
      this.state.s4books.files.forEach((element: string) => {
        if (element.includes('.epub')) {
          hasEpub = true
          filename = element
        }
      })
    }

    if (hasEpub) {
      preview = (
        <span>
          <Button
            onClick={this.handlePreview.bind(
              this,
              `${process.env.API_PROTOCOL}${process.env.API_HOST}${process.env.API_BASE_PATH}/download/${filename}`,
              filename
            )}
            type="primary"
            danger
            icon={<EyeOutlined></EyeOutlined>}
          />
        </span>
      )
    } else {
      if (this.state.data.status == 2) {
        preview = (
          <span title="Preview the PDF file">
            <Button
              type="primary"
              danger
              icon={<FilePdfOutlined></FilePdfOutlined>}
              href={`${$tools.AssetsPath(
                'webpage/web/viewer.html'
              )}?file=https://vue-aplayer-django.herokuapp.com/api/downloadlib/${this.state.data.images.large
                .replace('http://93.174.95.29/fictioncovers/', '')
                .replace('.jpg', '') +
                '/' +
                this.state.data.title +
                '.' +
                this.state.data.extension}`}
              target="_blank"
              rel="noreferrer noopener"
            ></Button>
          </span>
        )
      } else {
        preview = ''
      }
    }

    if (this.state.data.summary === '') {
      summarytext = ''
      summarytag = ''
    } else {
      summarytag = <p className="cata-tag">Introduction: </p>
      summarytext = this.state.data.summary.split('\n').map((value: string, index: number) => {
        return (
          <p className="cata-text" key={index}>
            {value}
          </p>
        )
      })
    }
    if (this.state.data.author_intro === '') {
      authortext = ''
      authortag = ''
    } else {
      authortag = <p className="cata-tag">Introduction of author: </p>
      authortext = this.state.data.author_intro
        .replace('作者简介：', '')
        .split('\n')
        .map((value: string, index: number) => {
          return (
            <p className="cata-text" key={index}>
              {value}{' '}
            </p>
          )
        })
    }

    let popover_content
    if (this.state.data.status == 2) {
      console.log('There is no files')
      popover_content = (
        <p>
          <a
            onClick={this.handleLibgenDownload.bind(
              this,
              this.state.data.md5,
              this.state.data.title + '.' + this.state.data.extension
            )}
          >
            {this.state.data.title + '.' + this.state.data.extension}
          </a>
        </p>
      )
    } else {
      popover_content = this.state.s4books.files.map((value: string, index: number) => {
        return (
          <p key={index}>
            <a
              onClick={this.handleDownload.bind(
                this,
                `${process.env.API_PROTOCOL}${process.env.API_HOST}${process.env.API_BASE_PATH}/download/${value}`,
                value
              )}
            >
              {value.split('.')[1]}
            </a>
          </p>
        )
      })
    }
    if (this.state.data.translator.length > 0) {
      trans = (
        <p className="book-text cata-tag">
          Translator:{' '}
          {this.state.data.translator.map((value: string) => {
            return value
          })}
        </p>
      )
    } else {
      trans = ''
    }

    return (
      <Layout className="book-detail-container">
        <Layout>
          <Content>
            <Row>
              <Col flex="260px">
                <img src={this.state.data.images.large} className="detail-image" alt="" />
              </Col>
              <PerfectScrollbar>
                <Col flex="auto" className="book-right-area">
                  <div className="book-right-container">
                    <div>
                      <p className="book-text cata-tag">Bookname: {this.state.data.title}</p>
                    </div>
                    <div>
                      <p className="book-text cata-tag">
                        Douban rating: {this.state.data.rating.average / 2}{' '}
                        <a href={this.state.data.alt}>
                          ({this.state.data.rating.numRaters}
                          {'人评分'})
                        </a>
                      </p>
                      <p className="book-text cata-tag">Publishing Year: {this.state.data.pubdate}</p>
                      <p className="book-text cata-tag">Publisher: {this.state.data.publisher}</p>
                    </div>
                    <div>
                      <p className="book-text cata-tag">
                        Author:{' '}
                        {this.state.data.author.map((value: string) => {
                          return value
                        })}
                      </p>
                      {trans}
                      {/* {this.state.data.results[0].book_author} */}
                    </div>
                    <div>
                      <span className="book-icon" title="Download">
                        <Popover
                          placement="top"
                          trigger="click"
                          content={popover_content}
                          // content={this.state.s4books.files.map((value: string, index: number) => {
                          //   return (
                          //     <p key={index}>
                          //       <a
                          //         onClick={this.handleDownload.bind(
                          //           this,
                          //           `${process.env.API_PROTOCOL}${process.env.API_HOST}${process.env.API_BASE_PATH}/download/${value}`,
                          //           value
                          //         )}
                          //       >
                          //         {value.split('.')[1]}
                          //       </a>
                          //     </p>
                          //   )
                          // })}
                        >
                          <Button type="primary" icon={<DownloadOutlined />} />
                        </Popover>
                      </span>
                      <span className="book-icon" title="Subscribe">
                        <Button type="primary" icon={<ApartmentOutlined />} />
                      </span>
                      <span
                        className="book-icon"
                        title="Close the window"
                        onClick={this.handleClose.bind(this)}
                      >
                        <Button type="primary" danger icon={<CloseOutlined />} />
                      </span>
                      {preview}
                    </div>
                    <div>
                      {summarytag}
                      {summarytext}
                    </div>
                    <div>
                      {authortag}
                      {authortext}
                    </div>
                  </div>
                </Col>
              </PerfectScrollbar>
            </Row>
          </Content>
        </Layout>
      </Layout>
    )
  }
} // class Demo end
