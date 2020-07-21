import React from 'react'
import './libgen-book.less'

import Store from 'electron-store'
import { Timeline, Tween } from 'react-gsap'

interface CarouselItemProps {
  item: CarouselItem
}
interface CarouselItemState {
  resData: Array<any> | any
}
const store = new Store<any>()
export default class LibgenBook extends React.Component<CarouselItemProps, CarouselItemState> {
  constructor(props: CarouselItemProps) {
    super(props)
  }
  state: CarouselItemState = {
    resData: [{}],
  }
  handleDetail(data: any, s4books: any) {
    // console.log(data)
    // store.set('pkvalue', pk)
    store.set('detail', data)
    store.set('s4books', s4books)
    $tools.createWindow('Details', {
      windowOptions: { title: 'Details', transparent: false },
    })
  }
  render() {
    const carouselItem = {
      bookAuthor: this.props.item.Author,
      bookTitle: this.props.item.Title,
      bookPic: 'http://93.174.95.29/fictioncovers/' + this.props.item.Coverurl,
      bookInfos: this.props.item.Author,
      bookCategory: this.props.item.Series,
      bookYear: this.props.item.Year,
      md5: this.props.item.MD5,
      bookExtension: this.props.item.Extension,
    }
    const s4books = {
      files: this.props.item.MD5,
    }
    return (
      <div>
        <Timeline
          target={
            // <div className="item-layer" onClick={this.handleDetail.bind(this, this.props.item.data, s4books)}>
            <div
              className="item-layer"
              onClick={this.handleDetail.bind(
                this,
                {
                  title: carouselItem.bookTitle,
                  summary: '',
                  author_intro: '',
                  translator: [],
                  images: { large: carouselItem.bookPic },
                  rating: { average: 10, numRaters: 0 },
                  pubdate: carouselItem.bookYear,
                  publisher: '',
                  author: [carouselItem.bookAuthor],
                  md5: carouselItem.md5,
                  status: 2,
                  extension: carouselItem.bookExtension,
                },
                {
                  files: [],
                }
              )}
            >
              <img src={carouselItem.bookPic} alt="" className="item-image" />
              <p className="item-text">{carouselItem.bookTitle}</p>
            </div>
          }
        >
          <Tween from={{ opacity: 0, x: '-100px' }} to={{ opacity: 1, x: '0' }} duration={0.8} />
        </Timeline>
      </div>
    )
  }
}
