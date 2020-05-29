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
  handleDetail(data: any, s4books: any) {
    console.log(data)
    // store.set('pkvalue', pk)
    store.set('detail', data)
    store.set('s4books', s4books)
    $tools.createWindow('Details', {
      windowOptions: { title: 'Details', transparent: false },
    })
  }
  render() {
    const carouselItem = {
      bookAuthor: this.props.item.data.author,
      bookTitle: this.props.item.data.title,
      bookRating: Math.floor(this.props.item.data.rating.average / 2),
      bookPic: this.props.item.data.image,
      bookInfos: this.props.item.data.summary,
      bookOrigin: this.props.item.data.alt,
      bookCategory: this.props.item.data.tags,
    }
    return (
      <div
        className="item-layer"
        onClick={this.handleDetail.bind(this, this.props.item.data, this.props.item.s4books)}
      >
        <img src={carouselItem.bookPic} alt="" className="item-image" />
        <p className="item-text">{carouselItem.bookTitle}</p>
        <span className="rating-text">评分: </span>
        <Rate disabled defaultValue={carouselItem.bookRating} className="rate" />
      </div>
    )
  }
}
