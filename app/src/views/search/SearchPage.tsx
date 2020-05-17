import * as React from 'react'
// import { Button, Input, Spin, Card } from 'antd'
import { withStore } from '@/src/components'
import Store from 'electron-store'

import { Layout, Input, Row, Col, Radio } from 'antd'
import CountUp from 'react-countup'

import './search.less'
import './canvas.less'
const { Header, Content } = Layout
const { Search } = Input

interface SearchProps extends PageProps, StoreProps {
  count: StoreStates['count']
  countAlias: StoreStates['count']
}

declare interface SearchState {
  resData: queryTestInfoUsingGET.Response | {}
  loading: boolean
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

  componentDidMount() {}
  setInputValue(e: any) {
    this.setState({
      value: e,
    })
  }
  sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }
  async handlesearch(value: any) {
    // console.log(value)
    try {
      await $api.SearchGet(
        'book/' + value,
        { page: 1 },
        { headers: { Authorization: `Token ${store.get('user')}` } }
      )
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
    const { loading } = this.state

    return (
      <Layout className="demo-container">
        <Header></Header>
        <Content className="saerch-wrap">
          {this.state.canv ? this.canva : ''}
          {/* <canvas></canvas> */}
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
                loading={loading}
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
          <Row gutter={[0, 20]} style={{ paddingTop: '10px' }}>
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
                  <span>Aritcles</span>
                </Col>
              </Row>
            </Col>
            <Col span={8}></Col>
          </Row>
        </Content>
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
      }, 1000)
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
