import * as React from 'react'
// import { Button, Input, Spin, Card } from 'antd'
import { withStore } from '@/src/components'

import { Layout, Form, Input, Button, Checkbox, Row, Col } from 'antd'
import './register.less'

import { UserOutlined, LockOutlined } from '@ant-design/icons'

const { Header, Content, Sider } = Layout

interface RegisterProps extends PageProps, StoreProps {
  count: StoreStates['count']
  countAlias: StoreStates['count']
}

declare interface RegisterState {
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
export default class Register extends React.Component<RegisterProps, RegisterState> {
  // state 初始化
  state: RegisterState = {
    resData: {},
    loading: false,
    createWindowLoading: false,
    asyncDispatchLoading: false,
    value: 1,
  }

  // 构造函数
  constructor(props: RegisterProps) {
    super(props)
  }

  componentDidMount() {}
  onFinish() {}
  render() {
    const { resData, loading, createWindowLoading, asyncDispatchLoading } = this.state
    const { count: reduxCount, countAlias } = this.props
    return (
      <Layout className="demo-container">
        <Sider width="50%">
          <img src={$tools.SIGN_UP} width="100%" alt="sign" />
        </Sider>
        <Layout>
          <Content>
            <div className="form-container">
              <Form
                name="normal_login"
                className="login-form"
                initialValues={{
                  remember: true,
                }}
                onFinish={this.onFinish}
              >
                <Form.Item
                  name="username"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your Username!',
                    },
                  ]}
                >
                  <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                </Form.Item>

                <Form.Item
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your Password!',
                    },
                  ]}
                >
                  <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Password"
                  />
                </Form.Item>
                <Form.Item>
                  <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox>Remember me</Checkbox>
                  </Form.Item>

                  <div>
                    <a className="login-form-forgot" href="">
                      Forgot password
                    </a>
                  </div>

                  <a href="">Register now!</a>
                </Form.Item>

                <Form.Item>
                  <Button type="primary" htmlType="submit" className="login-form-button">
                    Log in
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </Content>
        </Layout>
      </Layout>
    )
  }
} // class Demo end
