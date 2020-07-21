import * as React from 'react'
import axios from 'axios'
import Store from 'electron-store'
import './trans-window.less'
// import { Button, Input, Spin, Card } from 'antd'

// import './login.module.less'
// import './canvas.less'

interface LoginProps extends PageProps, StoreProps {}

declare interface LoginState {}

/**
 * DemoProps 是组件的 props 类型声明
 * DemoState 是组件的 state 类型声明
 * props 和 state 的默认值需要单独声明
 */

export default class Login extends React.Component<LoginProps, LoginState> {
  // state 初始化
  state: LoginState = {
    resData: {},
    loading: false,
    createWindowLoading: false,
    asyncDispatchLoading: false,
    value: 1,
    userprofile: {
      username: '',
      password: '',
    },
  }

  // 构造函数
  constructor(props: LoginProps) {
    super(props)
  }

  componentDidMount() {}

  sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  canva = (<canvas></canvas>)
  render() {
    // const { resData, loading, createWindowLoading, asyncDispatchLoading } = this.state
    // const { count: reduxCount, countAlias } = this.props
    return (
      <div className="container-window">
        <h1>A big test</h1>
      </div>
    )
  }
} // class Demo end
