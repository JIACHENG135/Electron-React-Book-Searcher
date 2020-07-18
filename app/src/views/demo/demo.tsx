import * as React from 'react'

// import { Button, Input, Spin, Card } from 'antd'
import { withStore } from '@/src/components'
import { Layout } from 'antd'
import './demo.less'
import PerfectScrollbar from 'react-perfect-scrollbar'
// import 'antd/dist/antd.css'

import Carousel from 'react-multi-carousel'
import BookSection from './book-section'
import 'react-multi-carousel/lib/styles.css'
import 'react-perfect-scrollbar/dist/css/styles.css'
import './demo.less'

const { Content } = Layout
interface DemoProps extends PageProps, StoreProps {
  count: StoreStates['count']
  countAlias: StoreStates['count']
}

declare interface DemoState {
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
  }
  componentDidMount() {}
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

  render() {
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
      <PerfectScrollbar>
        <div className="scroll-area">
          <Layout className="demo-container">
            <Content>
              {/* <Carousel responsive={responsive} infinite={true} itemClass="item-class">
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
              <div className="book-section-area">
                <BookSection title="计算机"></BookSection>
                <BookSection title="小说"></BookSection>
                <BookSection title="武侠"></BookSection>
                <BookSection title="文学"></BookSection>
                <BookSection title="社会"></BookSection>
                <BookSection title="电影"></BookSection>
              </div> */}
            </Content>
          </Layout>
        </div>
      </PerfectScrollbar>
    )
  }
}
