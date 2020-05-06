import React from 'react'
import './item.less'
import { Rate } from 'antd'
interface CarouselItemProps {
  item: CarouselItem
}

export default class Item extends React.Component<CarouselItemProps> {
  constructor(props: CarouselItemProps) {
    super(props)
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
    }
    return (
      <div className="item-layer">
        {/* eslint-disable-line no-use-before-define */}
        <img src={carouselItem.bookPic} alt="" className="item-image" />
        <p className="item-text">{carouselItem.bookTitle}</p>
        <span className="rating-text">评分: </span>
        <Rate disabled defaultValue={carouselItem.bookRating} className="rate" />
      </div>
    )
  }
}
