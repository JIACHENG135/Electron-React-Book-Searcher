import * as React from 'react'

import { ReactReader } from 'react-reader'
import Store from 'electron-store'
interface UserProps extends PageProps, StoreProps {}

declare interface UserState {
  location: string | number | null
}

/**
 * DemoProps 是组件的 props 类型声明
 * DemoState 是组件的 state 类型声明
 * props 和 state 的默认值需要单独声明
 */
const store = new Store<any>()
const filename = store.get('filename')
const bookanme = store.get('bookname')
const epuburl = store.get('epuburl')
export default class User extends React.Component<UserProps, UserState> {
  // state 初始化
  state: UserState = {
    location: store.get(filename) ? store.get(filename) : 2,
  }

  // 构造函数
  constructor(props: UserProps) {
    super(props)
  }

  sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }
  render() {
    const { location } = this.state

    // const { count: reduxCount, countAlias } = this.props
    return <div style={{ position: 'relative', height: '100%' }}></div>
  }
} // class Demo end
