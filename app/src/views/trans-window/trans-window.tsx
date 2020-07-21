import * as React from 'react'
import axios from 'axios'
import Store from 'electron-store'
import './trans-window.less'
import { Row, Col } from 'antd'
import ReactLoading from 'react-loading'
// import { Button, Input, Spin, Card } from 'antd'

// import './login.module.less'
// import './canvas.less'

interface LoginProps extends PageProps, StoreProps {}

declare interface LoginState {
  translated: string
  loading: boolean
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
    loading: true,
  }

  // 构造函数
  constructor(props: LoginProps) {
    super(props)
  }

  componentDidMount() {
    console.log('http://127.0.0.1:8000/api/translate/' + store.get('clipboard') + '/cn')
    axios
      .get('http://vue-aplayer-django.herokuapp.com/api/translate/' + store.get('clipboard') + '/cn')
      .then((resData: any) => {
        this.setState({
          translated: resData.data,
          loading: false,
        })
      })
      .catch((err: any) => {
        this.setState({
          translated: '别带问号...',
          loading: false,
        })
      })
  }

  sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  canva = (<canvas></canvas>)
  render() {
    const { translated, loading } = this.state
    const loadingBar = (
      <div>
        <ReactLoading className="loading-bubble" type="spinningBubbles" color="black" height={30} width={30} />
      </div>
    )
    // const { count: reduxCount, countAlias } = this.props
    return (
      <div className="container-window">
        <Row align="middle" style={{ height: '50%' }}>
          <Col className="trans-text-area" span={12}>
            <h5>{store.get('clipboard')}</h5>
          </Col>
          <Col className="trans-text-area" span={12}>
            <h4>{loading ? loadingBar : translated}</h4>
          </Col>
        </Row>
      </div>
    )
  }
} // class Demo end
