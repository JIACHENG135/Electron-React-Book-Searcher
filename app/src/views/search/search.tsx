import * as React from 'react'
// import { Button, Input, Spin, Card } from 'antd'
import { withStore } from '@/src/components'

import { Layout, Input, Row, Col, Radio, Menu, Breadcrumb } from 'antd'
import CountUp from 'react-countup'

import { shell } from 'electron'
import './search.less'
const { Header, Content, Footer } = Layout
const { Search } = Input

interface DemoProps extends PageProps, StoreProps {
  count: StoreStates['count']
  countAlias: StoreStates['count']
}

declare interface DemoState {
  resData: queryTestInfoUsingGET.Response | {}
  loading: boolean
  createWindowLoading: boolean
  asyncDispatchLoading: boolean
  value: number
}

/**
 * DemoProps 是组件的 props 类型声明
 * DemoState 是组件的 state 类型声明
 * props 和 state 的默认值需要单独声明
 */

@withStore(['count', { countAlias: 'count' }])
export default class Demo extends React.Component<DemoProps, DemoState> {
  // state 初始化
  state: DemoState = {
    resData: {},
    loading: false,
    createWindowLoading: false,
    asyncDispatchLoading: false,
    value: 1,
  }

  // 构造函数
  constructor(props: DemoProps) {
    super(props)
  }

  componentDidMount() {
    console.log(this)
  }
  setInputValue(e: any) {
    this.setState({
      value: e,
    })
  }
  render() {
    const { resData, loading, createWindowLoading, asyncDispatchLoading } = this.state
    const { count: reduxCount, countAlias } = this.props
    return (
      <Layout className="demo-container">
        <Header></Header>
        <Content>
          <Row gutter={[0, 10]}>
            <Col span={11}></Col>
            <Col span={2}>
              <img width="60" src={$tools.APP_SVG} className="svg-image" />
            </Col>
            <Col span={11}></Col>
          </Row>
          <Row gutter={[0, 20]}>
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
          <Row gutter={[0, 20]}>
            <Col span={6}></Col>
            <Col span={12}>
              <Search
                placeholder="input search loading with enterButton"
                loading={loading}
                enterButton
                allowClear
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
