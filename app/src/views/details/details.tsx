import * as React from 'react'
// import { Button, Input, Spin, Card } from 'antd'
import { withStore } from '@/src/components'
import PerfectScrollbar from 'react-perfect-scrollbar'

import Store from 'electron-store'
import { Layout, Divider, Row, Col } from 'antd'

import './details.less'
const { Content } = Layout
const store = new Store<any>()
interface DetailsProps extends PageProps, StoreProps {
  count: StoreStates['count']
  countAlias: StoreStates['count']
}

declare interface DetailsState {
  resData: UserLoginInfo.Response | {} | any | Array<CarouselItem>
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
export default class Details extends React.Component<DetailsProps, DetailsState> {
  // state 初始化
  state: DetailsState = {
    resData: {
      results: [{ book_title: '', book_infos: '' }],
    },
    loading: false,
    createWindowLoading: false,
    asyncDispatchLoading: false,
  }

  // 构造函数
  constructor(props: DetailsProps) {
    super(props)
  }
  postoption: RequestOptions = {
    formData: false,
    method: 'GET',
    errorType: 'modal',
  }

  sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  async handleQuery() {}
  image = (<img src={$tools.SIGN_UP} width="100%" alt="sign" />)
  componentDidMount() {
    const pk = store.get('pkvalue')
    this.setState({ loading: true })
    $api
      .BookQueryGet('/detail/' + pk, {}, { headers: { Authorization: `Token ${store.get('user')}` } })
      .then((resData: any) => {
        console.log('Errorrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr')
        console.log(resData)
        this.setState({
          resData: resData,
          loading: false,
        })
      })
  }
  render() {
    // const { resData, loading, createWindowLoading, asyncDispatchLoading } = this.state
    // const { count: reduxCount, countAlias } = this.props
    if (this.state.loading) {
      return <div>loading</div>
    }
    const book = (
      <Row className="book-row">
        <Col flex="300px"></Col>
        <Col flex="auto" className="book-text"></Col>
      </Row>
    )
    return (
      <PerfectScrollbar>
        <Layout className="book-detail-container">
          <Layout>
            <Content>
              <Row>
                <Col flex="300px">
                  <img src={this.state.resData.results[0].book_pic} className="detail-image" alt="" />
                </Col>
                <Col flex="auto" className="book-right-area">
                  <div>
                    <span className="">书名:</span>
                    {this.state.resData.results[0].book_title}
                  </div>
                  <div>
                    <span className="">作者:</span>
                    {this.state.resData.results[0].book_author}
                  </div>
                  <div>
                    <span>{this.state.resData.results[0].book_infos}</span>
                  </div>
                </Col>
              </Row>
            </Content>
          </Layout>
        </Layout>
      </PerfectScrollbar>
    )
  }
} // class Demo end
