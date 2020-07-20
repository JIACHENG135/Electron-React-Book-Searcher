import React from 'react'
import LibgenBook from './libgen-book'
import 'react-multi-carousel/lib/styles.css'
import { Row, Col } from 'antd'
import { v4 as uuidv4 } from 'uuid'
import './book-row.less'
interface LibgenRowItemProps {
  items: Array<any>
  grid: number
}

export default class LibgenRow extends React.Component<LibgenRowItemProps> {
  constructor(props: LibgenRowItemProps) {
    super(props)
  }
  render() {
    let fillCol
    const { items } = this.props
    const span = Math.floor(24 / this.props.grid)
    const bookarea = items.map(item => (
      <Col key={uuidv4()} span={span}>
        <LibgenBook item={item} key={uuidv4()}></LibgenBook>
      </Col>
    ))
    if (items.length % 2 != 0) {
      fillCol = <Col key={uuidv4()} flex="auto"></Col>
    } else {
      fillCol = ''
    }

    return (
      <div className="book-row-container">
        <Row className="book-row" gutter={[24, 16]}>
          {bookarea}
          {fillCol}
        </Row>
      </div>
    )
  }
}
