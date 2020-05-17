import * as React from 'react'
import axios from 'axios'
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

  async componentDidMount() {
    const script1 = document.createElement('script')
    script1.src = 'https://ssjh.s3-ap-northeast-1.amazonaws.com/transparent.js'
    const script2 = document.createElement('script')
    script2.src = 'https://ssjh.s3-ap-northeast-1.amazonaws.com/gat.gui.min.js'
    document.body.appendChild(script2)
    document.body.appendChild(script1)
    this.setState({ loading: true })

    await this.sleep(2000)
    this.setState({ loading: false })
    this.props.closeWindow()
  }

  sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  canva = (<canvas></canvas>)
  render() {
    // const { resData, loading, createWindowLoading, asyncDispatchLoading } = this.state
    // const { count: reduxCount, countAlias } = this.props
    return (
      <div className="">
        <canvas></canvas>
      </div>
    )
  }
} // class Demo end
