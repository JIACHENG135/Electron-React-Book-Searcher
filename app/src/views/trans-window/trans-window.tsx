import * as React from 'react'
import axios from 'axios'
import Store from 'electron-store'
import './trans-window.less'
// import { Button, Input, Spin, Card } from 'antd'

// import './login.module.less'
// import './canvas.less'

interface LoginProps extends PageProps, StoreProps {}

declare interface LoginState {
  translated: string
}

/**
 * DemoProps 是组件的 props 类型声明
 * DemoState 是组件的 state 类型声明
 * props 和 state 的默认值需要单独声明
 */
const store = new Store<any>()
export default class Login extends React.Component<LoginProps, LoginState> {
  // state 初始化
  state: LoginState = {
    translated: '',
  }

  // 构造函数
  constructor(props: LoginProps) {
    super(props)
  }

  componentDidMount() {
    console.log('http://127.0.0.1:8000/api/translate/' + store.get('clipboard') + '/cn')
    axios.get('http://127.0.0.1:8000/api/translate/' + store.get('clipboard') + '/cn').then((resData: any) => {
      this.setState({
        translated: resData.data,
      })
    })
  }

  sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  canva = (<canvas></canvas>)
  render() {
    const { translated } = this.state
    // const { count: reduxCount, countAlias } = this.props
    return (
      <div className="container-window">
        <h1>{translated}</h1>
      </div>
    )
  }
} // class Demo end
