import * as React from 'react'
import axios from 'axios'
// import { Button, Input, Spin, Card } from 'antd'
import { withStore } from '@/src/components'
import Store from 'electron-store'
import { Layout, Skeleton, Row, Col, Divider } from 'antd'
import { UserOutlined, LockOutlined, SyncOutlined } from '@ant-design/icons'
import ItemList from './book-section/ItemList'
const { Content, Sider } = Layout
const store = new Store<any>()
interface BookSectionProps {
  title: string
  ref: any
}

declare interface BookSectionState {
  resData: Array<any> | any
  loading: boolean
  createWindowLoading: boolean
  asyncDispatchLoading: boolean
  value: number
  userprofile: UserLoginInfo.Params
  itemlist: any
}

/**
 * DemoProps 是组件的 props 类型声明
 * DemoState 是组件的 state 类型声明
 * props 和 state 的默认值需要单独声明
 */

@withStore(['count', { countAlias: 'count' }])
export default class BookSection extends React.Component<BookSectionProps, BookSectionState> {
  // state 初始化

  state: BookSectionState = {
    resData: {
      results: [{}],
      count: 0,
    },
    loading: false,
    createWindowLoading: false,
    asyncDispatchLoading: false,
    value: 1,
    userprofile: {
      username: '',
      password: '',
    },
    itemlist: '',
  }

  // 构造函数
  constructor(props: BookSectionProps) {
    super(props)
  }
  scrollDiv: any = React.createRef()
  postoption: RequestOptions = {
    formData: false,
    method: 'POST',
    errorType: 'modal',
  }
  componentDidMount() {
    this.requestTest('book/' + this.props.title)
  }

  sectiontitle = (
    <Divider orientation="left" style={{ color: '#333', fontWeight: 'normal' }}>
      【{this.props.title}】
    </Divider>
  )
  requestTest(bookname: string) {
    this.setState({
      loading: true,
      resData: {
        results: [],
        count: 0,
      },
    })
    $api
      .queryTestInfo(bookname, { page: 1 }, { headers: { Authorization: `Token ${store.get('user')}` } })
      .then(resData => {
        console.log('requestTest')
        console.log(resData)
        this.setState({ resData: resData })
      })
      .catch(err => {
        $tools.createWindow('Login', {
          windowOptions: { modal: true, parent: undefined, title: 'Login' },
        })
      })
      .finally(() => {
        this.setState({ loading: false })
      })
  }
  requestRandomTest(bookname: string, keyword: number) {
    this.setState({
      loading: true,
      resData: {
        results: [],
      },
    })
    console.log(this.state.resData.count)
    const randompage: number = Math.floor((Math.random() * this.state.resData.count) / 10 - 1)
    $api
      .queryTestInfo(
        bookname,
        { page: randompage },
        { headers: { Authorization: `Token ${store.get('user')}` } }
      )
      .then(resData => {
        console.log(resData)
        this.setState({ resData: resData })
      })
      .catch(err => {
        $tools.createWindow('Login', {
          windowOptions: { modal: true, parent: undefined, title: 'Login' },
        })
      })
      .finally(() => {
        this.setState({ loading: false })
      })
  }
  render() {
    const { ref } = this.props
    // const { resData, loading, createWindowLoading, asyncDispatchLoading } = this.state
    // const { count: reduxCount, countAlias } = this.props
    const syncicon = <SyncOutlined></SyncOutlined>
    const nosyncicon = <SyncOutlined spin></SyncOutlined>
    return (
      <section id="kexue" ref={ref}>
        {this.state.resData.results.length > 0 ? this.sectiontitle : ''}

        <Skeleton loading={this.state.loading} key="Skeleton1" active className="skeleton-holder"></Skeleton>

        <ItemList items={this.state.resData.results}></ItemList>
        <Row>
          <Col span={24}>
            <span
              ref={this.props.title}
              className="sync-icon"
              onClick={this.requestRandomTest.bind(this, 'book/' + this.props.title, 2)}
            >
              {this.state.loading ? nosyncicon : syncicon}
            </span>
          </Col>
        </Row>
      </section>
    )
  }
} // class Demo end
