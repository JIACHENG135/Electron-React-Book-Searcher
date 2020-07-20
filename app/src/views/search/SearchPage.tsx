import * as React from 'react'
// import { Button, Input, Spin, Card } from 'antd'
import { withStore } from '@/src/components'
import Store from 'electron-store'
import axios from 'axios'
import { Layout, Input, Row, Col, Radio, Button } from 'antd'
import BookRow from './components/book-row'
import LibgenRow from './components/libgen-row'
import PerfectScrollbar from 'react-perfect-scrollbar'
import './search.less'
import './canvas.less'
import { IpcRenderer, Shell, BrowserWindow, Remote, DownloadItem } from 'electron'

const { Header, Content } = Layout
const { Search } = Input

interface SearchProps extends PageProps, StoreProps {
  count: StoreStates['count']
  countAlias: StoreStates['count']
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

const win: BrowserWindow = remote.getCurrentWindow()

declare interface SearchState {
  cols: number
  resData: queryTestInfoUsingGET.Response | {} | any
  loading: boolean
  currentPage: string | number | any
  createWindowLoading: boolean
  asyncDispatchLoading: boolean
  value: number
  canv: boolean
}
const store = new Store<any>()
/**
 * SearchProps 是组件的 props 类型声明
 * SearchState 是组件的 state 类型声明
 * props 和 state 的默认值需要单独声明
 */

@withStore(['count', { countAlias: 'count' }])
export default class SearchPage extends React.Component<SearchProps, SearchState> {
  // state 初始化
  state: SearchState = {
    resData: {},
    loading: false,
    cols: 6,
    currentPage: 1,
    createWindowLoading: false,
    asyncDispatchLoading: false,
    value: 1,
    canv: false,
  }

  // 构造函数
  constructor(props: SearchProps) {
    super(props)
  }
  // canva = document.createElement('CANVAS')

  componentDidMount() {
    win.on('resize', this.throttle(this.onResize, 1000).bind(this, win))
  }
  setInputValue(e: any) {
    this.setState({
      value: e,
      resData: {},
    })
  }
  sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  throttle(fn: Function, rateTime: number) {
    let prev = Date.now() - rateTime
    return (...args: any[]) => {
      if (Date.now() - prev >= rateTime) {
        fn.apply(this, args)
        prev = Date.now()
      }
    }
  }

  onResize(win: BrowserWindow) {
    const bound = win.getBounds()
    if (bound.width < 800) {
      this.setState({
        cols: 2,
      })
    } else if (bound.width < 1200) {
      this.setState({
        cols: 4,
      })
    } else if (bound.width < 1600) {
      this.setState({
        cols: 6,
      })
    } else {
      this.setState({
        cols: 8,
      })
    }
  }
  handlesearch(value: any) {
    console.log(typeof this.state.value)
    store.set('searchValue', value)
    try {
      this.setState({
        resData: {
          results: [],
        },
        loading: true,
      })

      if (this.state.value == 2) {
        $api
          // .SearchGet('book/' + value, { page: 1 }, { headers: { Authorization: `Token ${store.get('user')}` } })
          .SearchGet('libgen/' + value, { page: 1 })

          .then((resData: any) => {
            console.log(resData)
            this.setState({
              resData,
            })
          })
          .finally(() => {
            this.setState({
              loading: false,
            })
          })
      } else {
        $api
          // .SearchGet('book/' + value, { page: 1 }, { headers: { Authorization: `Token ${store.get('user')}` } })
          .SearchGet('book/' + value, { page: 1 })

          .then((resData: any) => {
            this.setState({
              resData,
            })
          })
          .finally(() => {
            this.setState({
              loading: false,
            })
          })
      }
    } catch (err) {
      this.setState({
        canv: true,
      })
      const script1 = document.createElement('script')
      script1.src = 'https://ssjh.s3-ap-northeast-1.amazonaws.com/black.js'
      const script2 = document.createElement('script')
      script2.src = 'https://ssjh.s3-ap-northeast-1.amazonaws.com/gat.gui.min.js'
      document.body.appendChild(script2)
      document.body.appendChild(script1)
    }
  }

  handleNextPre(preOrnext: number) {
    this.setState({
      resData: {
        results: [],
      },
      loading: true,
    })
    let url
    if (preOrnext == 0) {
      url = this.state.resData.previous
      this.setState({
        currentPage: this.state.currentPage - 1,
      })
    } else {
      url = this.state.resData.next
      this.setState({
        currentPage: this.state.currentPage + 1,
      })
    }
    try {
      axios(url)
        .then((resData: any) => {
          this.setState({
            resData: resData.data,
          })
        })
        .finally(() => {
          this.setState({
            loading: false,
          })
        })
      // $api
      //   .SearchGet(
      //     'book/' + store.get('searchValue'),
      //     { page: page },
      //     { headers: { Authorization: `Token ${store.get('user')}` } }
      //   )
      //   .then((resData: any) => {
      //     console.log(resData)
      //     this.setState({
      //       resData,
      //     })
      //   })
    } catch (err) {
      this.setState({
        canv: true,
      })
      const script1 = document.createElement('script')
      script1.src = 'https://ssjh.s3-ap-northeast-1.amazonaws.com/black.js'
      const script2 = document.createElement('script')
      script2.src = 'https://ssjh.s3-ap-northeast-1.amazonaws.com/gat.gui.min.js'
      document.body.appendChild(script2)
      document.body.appendChild(script1)
    }
  }

  canva = (<canvas></canvas>)
  render() {
    const { resData } = this.state
    const results: Array<any> = resData.results
    let bookLen
    let rows
    let index
    let bookArray
    let bookblock
    let bookArea

    let nextButton
    let prevButton
    let currentPage

    if (results) {
      bookblock = new Array<any>()
      index = 0
      bookLen = results.length
      bookArray = new Array<any>()
      currentPage = this.state.currentPage
      for (const book of results) {
        if (bookArray.length % this.state.cols == 0) {
          if (this.state.value == 1) {
            console.log(book)
            bookblock.push(<BookRow items={bookArray} grid={this.state.cols}></BookRow>)
          } else {
            bookblock.push(<LibgenRow items={bookArray} grid={this.state.cols}></LibgenRow>)
          }

          bookArray = new Array<any>()
        }
        bookArray.push(book)
        index += 1
      }
      if (bookArray.length > 0) {
        if (this.state.value == 1) {
          bookblock.push(<BookRow items={bookArray} grid={this.state.cols}></BookRow>)
        } else {
          bookblock.push(<LibgenRow items={bookArray} grid={this.state.cols}></LibgenRow>)
        }
      }
      bookArea = bookblock.map((item, index) => {
        return <div key={index}>{item}</div>
      })
    } else {
      bookArea = ''
      currentPage = ' '
    }
    if (this.state.resData.next) {
      nextButton = (
        <Button onClick={this.handleNextPre.bind(this, 1)} type="primary" className="page-button">
          next
        </Button>
      )
    } else {
      nextButton = ' '
    }
    if (this.state.resData.previous) {
      prevButton = (
        <Button onClick={this.handleNextPre.bind(this, 0)} type="primary" className="page-button">
          prev
        </Button>
      )
    } else {
      prevButton = ' '
    }
    return (
      <Layout className="demo-container">
        <PerfectScrollbar>
          <Header></Header>
          <Content className="saerch-wrap">
            {this.state.canv ? this.canva : ''}

            <Row gutter={[0, 10]}>
              <Col span={1}></Col>
              <Col span={22}>
                <div style={{ textAlign: 'center' }}>
                  <span>
                    <img src={$tools.APP_ICON} width="44" />
                  </span>
                  <span style={{ marginLeft: '10px' }}>
                    <img src={$tools.APP_TEXT} width="110" alt="" />
                  </span>
                </div>
              </Col>
              <Col span={1}></Col>
            </Row>
            <Row gutter={[0, 20]} style={{ paddingTop: '20px' }}>
              <Col span={6}></Col>
              <Col span={12}>
                <Search
                  placeholder="input search loading with enterButton"
                  loading={this.state.loading}
                  enterButton
                  allowClear
                  onSearch={(value: any) => this.handlesearch(value)}
                />
              </Col>
              <Col span={6}></Col>
            </Row>
            <div className="mid-item">
              <Radio.Group
                onChange={(ev: any): void => this.setInputValue(ev.target.value)}
                value={this.state.value}
              >
                <Radio value={1}>搜中文</Radio>
                <Radio value={2}>Search English</Radio>
              </Radio.Group>
            </div>
            {/* <Row gutter={[0, 20]} style={{ paddingTop: '10px' }}>
            <Col span={8}></Col>
            <Col span={8}>
              <Row>
                <Col span={8}>
                  <CountUp className="book-counter" start={0} end={2330367} duration={1.0} />
                  <span>Books</span>
                </Col>
                <Col span={8}>
                  <CountUp className="book-counter" start={0} end={533572} duration={1.0} />
                  <span>Comics</span>
                </Col>
                <Col span={8}>
                  <CountUp className="book-counter" start={0} end={2791901} duration={1.0} />
                  <span>Articles</span>
                </Col>
              </Row>
            </Col>
            <Col span={8}></Col>
          </Row> */}

            {bookArea}
            <div className="page-design">
              <span>{prevButton}</span>
              <span>{nextButton}</span>
            </div>
          </Content>
        </PerfectScrollbar>
      </Layout>
    )
  }

  asyncDispatch = (dispatch: Dispatch) => {
    return new Promise(resolve => {
      this.setState({ asyncDispatchLoading: true })
      setTimeout(() => {
        const { count } = this.props
        dispatch({ type: 'ACTION_ADD_COUNT', data: count + 1 })
        this.setState({ asyncDispatchLoading: false })
        resolve()
      }, 800)
    })
  }

  openNewWindow = () => {
    this.setState({ createWindowLoading: true })
    $tools.createWindow('Demo').finally(() => this.setState({ createWindowLoading: false }))
  }

  requestTest() {
    this.setState({ loading: true })
    $api
      .queryTestInfo('category/python', { page: 1 })
      .then(resData => {
        this.setState({ resData })
      })
      .finally(() => this.setState({ loading: false }))
  }

  requestTestError() {
    this.setState({ loading: true })
    $api
      .queryTestInfoError({})
      .catch(resData => {
        this.setState({ resData })
      })
      .finally(() => this.setState({ loading: false }))
  }

  requestTestErrorModal() {
    this.setState({ loading: true })
    $api
      .queryTestInfoError({}, { errorType: 'modal' })
      .catch(resData => {
        this.setState({ resData })
      })
      .finally(() => this.setState({ loading: false }))
  }
} // class Demo end
