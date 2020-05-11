import * as React from 'react'

import { shell } from 'electron'
// import { Button, Input, Spin, Card } from 'antd'
import { withStore } from '@/src/components'
import { Layout, Skeleton, Row, Col, Divider } from 'antd'
import { SyncOutlined } from '@ant-design/icons'
import './demo.less'
// import 'antd/dist/antd.css'
import { v4 as uuidv4 } from 'uuid'

import Carousel from 'react-multi-carousel'
import ItemList from './ItemList'
import 'react-multi-carousel/lib/styles.css'

const { Content } = Layout

interface DemoProps extends PageProps, StoreProps {
  count: StoreStates['count']
  countAlias: StoreStates['count']
}

declare interface DemoState {
  resData?: queryTestInfoUsingGET.Response | {} | any
  resData2?: queryTestInfoUsingGET.Response | {} | any
  resData3?: queryTestInfoUsingGET.Response | {} | any
  resData4?: queryTestInfoUsingGET.Response | {} | any
  loading: boolean
  loading2: boolean
  loading3: boolean
  loading4: boolean

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
    // resData: {},
    resData: {
      results: [],
    },
    resData2: {
      results: [],
    },
    resData3: {
      results: [],
    },
    resData4: {
      results: [],
    },
    loading: true,
    loading2: true,
    loading3: true,
    loading4: true,
    createWindowLoading: false,
    asyncDispatchLoading: false,
  }
  scrollDivScience: any = React.createRef()
  scrollDivHistory: any = React.createRef()
  scrollDivWenxue: any = React.createRef()
  scrollDivBio: any = React.createRef()
  // 构造函数
  constructor(props: DemoProps) {
    super(props)
    this.requestTest('book/科学', 1)
    this.requestTest('book/历史', 2)
    this.requestTest('category/文学', 3)
    this.requestTest('category/传记', 4)
  }

  // componentDidMount() {}
  scrollSmoothHandlerScience = () => {
    this.scrollDivScience.current.scrollIntoView({ behavior: 'smooth' })
  }
  scrollSmoothHandlerHistory = () => {
    this.scrollDivHistory.current.scrollIntoView({ behavior: 'smooth' })
  }

  scrollSmoothHandlerWenxue = () => {
    this.scrollDivWenxue.current.scrollIntoView({ behavior: 'smooth' })
  }
  scrollSmoothHandlerBio = () => {
    this.scrollDivBio.current.scrollIntoView({ behavior: 'smooth' })
  }
  requestTest(bookname: string, keyword: number) {
    if (keyword == 1) {
      this.setState({
        loading: true,
        resData: {
          results: [],
        },
      })
    } else if (keyword == 2) {
      this.setState({
        loading2: true,
        resData2: {
          results: [],
        },
      })
    } else if (keyword == 3) {
      this.setState({
        loading3: true,
        resData3: {
          results: [],
        },
      })
    } else if (keyword == 4) {
      this.setState({
        loading4: true,
        resData4: {
          results: [],
        },
      })
    }
    $api
      .queryTestInfo(bookname, { page: 2 })
      .then(resData => {
        if (keyword == 1) this.setState({ resData: resData })
        else if (keyword == 2) this.setState({ resData2: resData })
        else if (keyword == 3) this.setState({ resData3: resData })
        else if (keyword == 4) this.setState({ resData4: resData })
      })
      .finally(() => {
        if (keyword == 1) this.setState({ loading: false })
        else if (keyword == 2) this.setState({ loading2: false })
        else if (keyword == 3) this.setState({ loading3: false })
        else if (keyword == 4) this.setState({ loading4: false })
      })
  }

  requestRandomTest(bookname: string, keyword: number) {
    console.log('You called this function')
    if (keyword == 1) {
      this.setState({
        loading: true,
        resData: {
          results: [],
        },
      })
    } else if (keyword == 2) {
      this.setState({
        loading2: true,
        resData2: {
          results: [],
        },
      })
    } else if (keyword == 3) {
      this.setState({
        loading3: true,
        resData3: {
          results: [],
        },
      })
    } else if (keyword == 4) {
      this.setState({
        loading4: true,
        resData4: {
          results: [],
        },
      })
    }
    $api
      .queryTestInfo(bookname, { page: Math.floor(Math.random() * Math.floor(4)) + 1 })
      .then(resData => {
        if (keyword == 1) this.setState({ resData: resData })
        else if (keyword == 2) this.setState({ resData2: resData })
        else if (keyword == 3) this.setState({ resData3: resData })
        else if (keyword == 4) this.setState({ resData4: resData })
      })
      .finally(() => {
        if (keyword == 1) this.setState({ loading: false })
        else if (keyword == 2) this.setState({ loading2: false })
        else if (keyword == 3) this.setState({ loading3: false })
        else if (keyword == 4) this.setState({ loading4: false })
      })
  }
  render() {
    const { resData, resData2, resData3, resData4, loading, loading2, loading3, loading4 } = this.state

    const { count: reduxCount, countAlias } = this.props

    const syncicon = <SyncOutlined></SyncOutlined>
    const nosyncicon = <SyncOutlined spin></SyncOutlined>

    const syncicon2 = <SyncOutlined></SyncOutlined>
    const nosyncicon2 = <SyncOutlined spin></SyncOutlined>
    const syncicon3 = <SyncOutlined></SyncOutlined>
    const nosyncicon3 = <SyncOutlined spin></SyncOutlined>
    const syncicon4 = <SyncOutlined></SyncOutlined>
    const nosyncicon4 = <SyncOutlined spin></SyncOutlined>

    const itemlist = <ItemList items={resData.results} key="JIACHENGLIU"></ItemList>

    const itemlist2 = <ItemList items={resData2.results} key="JIACHENGLIU2"></ItemList>

    const itemlist3 = <ItemList items={resData3.results} key="JIACHENGLIU3"></ItemList>
    const itemlist4 = <ItemList items={resData4.results} key="JIACHENGLIU4"></ItemList>

    const responsive = {
      superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 3000 },
        items: 5,
      },
      desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 3,
      },
      tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2,
      },
      mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
      },
    }

    return (
      <Layout className="demo-container">
        <Content>
          <Carousel responsive={responsive} infinite={true} itemClass="item-class">
            <div className="carousel-layer" onClick={this.scrollSmoothHandlerScience}>
              <img src={$tools.SCIENCE} className="carousel-image" alt="science" />
            </div>
            <div className="carousel-layer" onClick={this.scrollSmoothHandlerHistory}>
              <img src={$tools.HISTORY} className="carousel-image" alt="science" />
            </div>
            <div className="carousel-layer" onClick={this.scrollSmoothHandlerWenxue}>
              <img src={$tools.WENXUE} className="carousel-image" alt="science" />
            </div>
            <div className="carousel-layer" onClick={this.scrollSmoothHandlerBio}>
              <img src={$tools.BIO} className="carousel-image" alt="science" />
            </div>
          </Carousel>
          <section id="kexue" ref={this.scrollDivScience}>
            <Divider orientation="left" style={{ color: '#333', fontWeight: 'normal' }}>
              【科学】
            </Divider>

            <Skeleton loading={loading} key="Skeleton1" active className="skeleton-holder"></Skeleton>

            {itemlist}
            <Row>
              <Col span={24}>
                <span className="sync-icon" onClick={this.requestRandomTest.bind(this, 'book/科学', 1)}>
                  {loading ? nosyncicon : syncicon}
                </span>
              </Col>
            </Row>
          </section>
          <section id="lishi" ref={this.scrollDivHistory}>
            <Divider orientation="left" style={{ color: '#333', fontWeight: 'normal' }}>
              【历史】
            </Divider>

            <Skeleton loading={loading2} key="Skeleton2" active className="skeleton-holder"></Skeleton>
            {itemlist2}
            <Row>
              <Col span={24}>
                <span className="sync-icon" onClick={this.requestRandomTest.bind(this, 'book/历史', 2)}>
                  {loading2 ? nosyncicon2 : syncicon2}
                </span>
              </Col>
            </Row>
          </section>
          <section id="文学" ref={this.scrollDivWenxue}>
            <Divider orientation="left" style={{ color: '#333', fontWeight: 'normal' }}>
              【文学】
            </Divider>

            <Skeleton loading={loading3} key="Skeleton3" active className="skeleton-holder"></Skeleton>
            {itemlist3}
            <Row>
              <Col span={24}>
                <span className="sync-icon" onClick={this.requestRandomTest.bind(this, 'category/文学', 3)}>
                  {loading3 ? nosyncicon3 : syncicon3}
                </span>
              </Col>
            </Row>
          </section>
          <section id="传记" ref={this.scrollDivBio}>
            <Divider orientation="left" style={{ color: '#333', fontWeight: 'normal' }}>
              【传记】
            </Divider>

            <Skeleton loading={loading4} key="Skeleton4" active className="skeleton-holder"></Skeleton>
            {itemlist4}
            <Row>
              <Col span={24}>
                <span className="sync-icon" onClick={this.requestRandomTest.bind(this, 'category/传记', 4)}>
                  {loading4 ? nosyncicon4 : syncicon4}
                </span>
              </Col>
            </Row>
          </section>
        </Content>
        {/* <Affix offsetBottom={10}>
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
          </Affix> */}
        {/* <Footer>
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
          </Footer> */}
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

  requestTestError() {
    this.setState({ loading: true })
    $api
      .queryTestInfoError({})
      .catch(resData => {
        this.setState({ resData: resData })
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

  // handleCateClick(event, index) {}
} // class Demo end
