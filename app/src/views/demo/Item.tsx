import React from 'react'
import './item.less'
import { Rate } from 'antd'
import Store from 'electron-store'

interface CarouselItemProps {
  item: CarouselItem
}
interface CarouselItemState {
  resData: Array<any> | any
}
const store = new Store<any>()
export default class Item extends React.Component<CarouselItemProps, CarouselItemState> {
  constructor(props: CarouselItemProps) {
    super(props)
  }
  state: CarouselItemState = {
    resData: [{}],
  }
  handleDetail(pk: any) {
    this.props.item
    store.set('pkvalue', pk)
    $tools.createWindow('Details', {
      windowOptions: { title: 'Details', transparent: false },
    })
  }
  render() {
    const carouselItem = {
      bookAuthor: this.props.item.book_author,
      bookTitle: this.props.item.book_title.substring(0, 20),
      bookRating: Math.floor(Math.random() * Math.floor(5)),
      bookPic: this.props.item.book_pic,
      bookInfos: this.props.item.book_infos,
      bookOrigin: this.props.item.book_origin,
      bookPanPass: this.props.item.book_pan_pass,
      bookCategory: this.props.item.book_category,
      bookPk: this.props.item.book_pk_value,
    }
    return (
      <div className="item-layer" onClick={this.handleDetail.bind(this, carouselItem.bookPk)}>
        <img src={carouselItem.bookPic} alt="" className="item-image" />
        <p className="item-text">{carouselItem.bookTitle}</p>
        <span className="rating-text">评分: </span>
        <Rate disabled defaultValue={carouselItem.bookRating} className="rate" />
      </div>
    )
  }
}
