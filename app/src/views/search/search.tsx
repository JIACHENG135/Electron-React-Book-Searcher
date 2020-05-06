import * as React from 'react'
// import { Button, Input, Spin, Card } from 'antd'
import { withStore } from '@/src/components'

import { Layout, Menu, Breadcrumb } from 'antd'
import { shell } from 'electron'
import './search.less'
const { Header, Content, Footer, Sider } = Layout

interface DemoProps extends PageProps, StoreProps {
  count: StoreStates['count']
  countAlias: StoreStates['count']
}

declare interface DemoState {
  resData: queryTestInfoUsingGET.Response | {}
  loading: boolean
  createWindowLoading: boolean
  asyncDispatchLoading: boolean
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
  }

  // 构造函数
  constructor(props: DemoProps) {
    super(props)
  }

  componentDidMount() {
    console.log(this)
  }

  render() {
    const { resData, loading, createWindowLoading, asyncDispatchLoading } = this.state
    const { count: reduxCount, countAlias } = this.props
    return (
      <Layout className="demo-container">
        <Sider className="sider">Sider</Sider>
        <Layout className="layout">
          <Header>Header</Header>
          <Content>Content</Content>
          <Footer>
            Footer
            <p className="fs-12 text-gray">
              Copyright © {new Date().getFullYear()}{' '}
              <a
                onClick={() => {
                  shell.openExternal('https://github.com/JIACHENG135?tab=repositories')
                }}
              >
                JIACHENG35.
              </a>{' '}
              All rights deserved
            </p>
          </Footer>
        </Layout>
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
