<template>



  <div
  id="landing"
  :class="{hovering:isHover}"
  >

    <el-container


    >

      <el-aside
      width="280px"
      style=
      "
      padding-top:20px;
      overflow-y: hidden;
      background-color:transparent!;
      "
      >

      <div style="-webkit-app-region: drag;height: 30%;">

      </div>

      <div
      class = "sidebar-item"
      @click="searchCate('国学')"
      >
        <md-icon
          md-src="static/guoxue.svg"
          class="sidebar-icon">
        </md-icon>
        <span class="side-bar-text">  culture </span>
      </div>


      <div
      class = "sidebar-item"
      @click="searchCate('知乎')"
      >
        <md-icon
          md-src="static/zhihu.svg"
          class="sidebar-icon">
        </md-icon>
        <span class="side-bar-text">  zhihu </span>
      </div>

      <div
      class = "sidebar-item"
      @click="searchCate('漫画')"
      >
        <md-icon
          md-src="static/manhua.svg"
          class="sidebar-icon">
        </md-icon>
        <span class="side-bar-text">  comic </span>
      </div>


      <div
      class = "sidebar-item"
      @click="searchCate('计算机')"
      >
        <md-icon
          md-src="static/jisuanji.svg"
          class="sidebar-icon">
        </md-icon>
        <span class="side-bar-text">  computer </span>
      </div>

      <div
      class = "sidebar-item"
      @click="searchCate('小说')"
      >
        <md-icon
          md-src="static/novel.svg"
          class="sidebar-icon">
        </md-icon>
        <span class="side-bar-text">  novels </span>
      </div>

      <div
      class = "sidebar-item"
      @click="searchCate('文化')"
      >
        <md-icon
          md-src="static/wenxue.svg"
          class="sidebar-icon"
          />
          <span class="side-bar-text">  literature </span>
      </div>

      <div
      class = "sidebar-item"
      @click="searchCate('生活')"
      >
        <md-icon
          md-src="static/shenghuo.svg"
          class="sidebar-icon"
          />
          <span class="side-bar-text">  life </span>
      </div>

      <div
      class = "sidebar-item"
      @click="searchCate('科技')"
      >
        <md-icon
          md-src="static/keji.svg"
          class="sidebar-icon"
          />
          <span class="side-bar-text">  technology </span>
      </div>

      <div
      class = "sidebar-item"
      @click="searchCate('金融')"
      >
        <md-icon
          md-src="static/jinrong.svg"
          class="sidebar-icon"
          />
          <span class="side-bar-text">  economic </span>
      </div>

      <div style="height:30%">
        <span
        class="fixed-bottom"
        style=
        "
        font-family:'Baloo 2', cursive;
        font-size: 15px;
        font-bold:400;
        "
        >
        <img
        src="static/kitty-opt-1.gif"
        alt=""
        style="background-color:transparent!important;width:60px;height:auto;"

        >

        version 0.0.1 &copy; 2020 Jiacheng
         </span>

      </div>
      </el-aside>

      <el-main>
        <md-content
        id="scrollBar"
        class="md-scrollbar"
        :class=" tmp.length>0 ? 'with-bar':'not-with-bar'"

        >

        <div
        class="md-layout md-gutter"
        style="-webkit-app-region: drag;"
        >

          <div class="md-layout-item md-size-5"></div>

          <div class="md-layout-item">

            <md-icon
            class="md-size-4x"
            md-src="static/index.svg"
            style="padding-top:20px;margin-bottom:30px;"/>

          </div>

          <div class="md-layout-item md-size-5"></div>

        </div>

        <div class="md-layout md-gutter" style="padding-top:10px;">

          <div class="md-layout-item md-size-5"></div>

          <div class="md-layout-item" >

            <el-input
            v-model="input"
            placeholder="Please input searching keyword"
            draggable="false"
            >

              <i
                ref="bubble"
                slot="prefix"
                class="el-input__icon el-icon-search bubble-wrapper"
                @click="
                  jumpOver()
                  searchCate(input)
                "
                @keyup.enter="searchWord"
              ></i>

            </el-input>
          </div>

          <div class="md-layout-item md-size-5"></div>

        </div>

        <div class="md-layout md-gutter" style="padding-top:10px;">

          <div class="md-layout-item md-size-1"></div>

          <div class="md-layout-item" >

            <b-form-radio-group
              v-model="selected"
              :options="options"
              class="mb-3"
              value-field="item"
              text-field="name"
              disabled-field="notEnabled"
            ></b-form-radio-group>
            <!-- <div class="mt-3">Selected: <strong>{{ selected }}</strong></div> -->
          </div>

          <div class="md-layout-item md-size-1"></div>

        </div>
            
        <template v-if="totalPage!=0">
          <div style="display:inline-block;padding-left:10px;padding-top:15px;padding-bottom:5px;z-index:100;" @click=" searchState=='cate' ?  searchCate(cate):searchWord()">

            <b-pagination v-model="counter" :total-rows="totalPage" :per-page="1" :limit="10" align="center"></b-pagination>

          </div>

        </template>

        <template v-if="loading">

          <vue-loading
            type="bars"
            color="#B3C0D1"
            :size="{ width: '50px', height: '50px' }"
          ></vue-loading>

        </template>




        <template v-else-if="tmp.length > 0 && !nothing">

          <div
            v-for="(books, index) in tmp"
            :key="index"
            style="padding:30px;"
            class="md-layout md-gutter md-alignment-center"
          >

            <div
              v-for="book in books"
              :key="book.md5"
              class="card-container md-layout-item md-medium-size-33 md-small-size-50 md-xsmall-size-100"
              @click="
              shake($event);
              doCopy(book.pan,book.patch)
              "
              @mouseover="isHover=true"
              @mouseleave="isHover=false"
            >
            <notifications group="foo" />
            <md-card
            md-with-hover
            class = "rounded-lg"
            style="backgroundColor:transparent;height:260px;!important"
            >

              <md-card-media-actions
              style="padding-left:0!important;padding-right:0!important;"
              >

                <md-card-media
                style="padding-left:0!important;padding-right:0!important;max-width:250px!important;"

                >

                  <img
                  :src="book.coverurl"
                  rel="noreferrer"
                  style="max-width:180px;height:228px!important;width:150px!important;"
                  @error="imgUrlAlt"/>

                    <div slot="error" class="image-slot">

                      <img src="static/image-holder.png" style="max-height:300px;">

                    </div>

                </md-card-media>

                <md-card-media style="width:50%;overflow-y:auto;max-height:232px;">

                  <md-card-content>

                    <div style="font-size:0.8rem;text-align: left;font-weight:400;">{{book.title}}</div>

                    <div class="md-subhead" style="font-size:0.6rem;">{{book.author}}</div>


                    <template v-if="book.rating!='1'">
                      <star-rating :increment="0.1"
                                  :rating="book.rating/2"
                                  :max-rating="5"
                                  inactive-color="#000"
                                  active-color="#f00"
                                  :read-only = 'true'
                                  :text-class = "'rate-text'"
                                  :star-size="10">
                      </star-rating>
                    </template>

                    <div class="md-subhead" style="font-size:0.6rem;">{{book.infos}}</div>

                    <template v-if='bouncing'>
                      <div>bouncing</div>
                    </template>

                  </md-card-content>

                </md-card-media>

              </md-card-media-actions>

            </md-card>

            </div>


          </div>

        </template>

        <template v-else-if="!nothing">
          <div class ="fixed-bottom" style="margin-left:20%;margin-bottom:100px;">
            <img src="static/background.png" width='400px;' class="back-img" alt="">
          </div>
        </template>

        <template v-else>
          <div class ="fixed-bottom" style="margin-left:17%;margin-bottom:100px;">
            <img src="static/NothingFound.png" width='100px;' class="back-img" alt="">
            <div class='nothing-text'>Nothing Found</div>
          </div>
        </template>



        <template v-if="bottomloading">

          <div class="fixed-bottom">

            <vue-loading
              type="bars"
              color="#B3C0D1"
              :size="{ width: '50px', height: '50px' }"
            ></vue-loading>

          </div>

        </template>

        </md-content>

      </el-main>

    </el-container>

  </div>

</template>

<script>
import Vue from 'vue'
// import $ from 'jquery'
import { TimelineLite, Back, Elastic, Power3 } from 'gsap'
import StarRating from 'vue-star-rating'
export default Vue.extend({
  name: 'Home',
  components :{
    'star-rating': StarRating,
    // 'notifications': Notifications,
  },
  // eslint-disable-next-line vue/require-prop-types
  props: [{
    page: '1',
  }],
  data() {
    this.tableConfig = [
      { prop: 'title', label: 'Title' },
      { prop: 'author', label: 'Author' },
      // {prop:"downLink",label:"Download"}
    ]
    return {
      booklist: [],
      tmp: [],
      input: '',
      fit: 'fill',
      rowNumber: 0,
      isHover: false,
      isScroll: true,
      preViewPdf: '',
      loading: false,
      bottomloading: false,
      nothing: false,
      srcFallback: 'static/image-holder.png',
      bouncing: false,
      counter: 1,
      cate: "知乎",
      searchState: 'cate',
      totalPage: 0,
      readOnly: true,
      selected: 'A',
      options: [
        { item: 'A', name: '中文' },
        { item: 'B', name: 'English' },
      ]

    }
  },
  computed:{
    computedCounter(){
      return this.counter
    }
  },
  mounted () {
    const img = this.$refs;
    img.onerror = () => {
      this.imageSrc = this.srcFallback
    }
    window.addEventListener("keypress", function(e) {
      if(e.key === 'Enter'){
        this.searchWord()
        this.jumpOver()
      }
    }.bind(this));
  },
  methods: {
    getData(val){
      this.counter = val;
    },
    imgUrlAlt(event) {
        event.target.src = this.srcFallback
    },
    doCopy(link,code) {
      const THIS = this
      this.$copyText(link).then(function (e) {
        // alert('The passward is '+ code)
        THIS.$notify({
          group: 'foo',
          title: 'Baidu netdisk url has been copied to clipboard, password is ' + code,
          type: 'success'
        });
        console.log(e)
      }, function (e) {
        alert('Can not copy')
        console.log(e)
      })
    },
    open(link) {
      this.$electron.shell.openExternal(link)
    },
    changeActive(e) {
      e.currentTarget.classList.add('hovering')
    },
    removeActive(e) {
      var classList = e.currentTarget.classList.remove('hovering')
      console.log(classList)
    },
    shake(e){

      var book = e.currentTarget;
      const timeline = new TimelineLite()
      timeline.to(book,0.15,{
        // rotation: 16,
        scale:1.2,
        ease: Power3.easeOut,
      })
      timeline.to(book,0.15,{
        // rotation: 16,
        scale:1,
        ease: Power3.easeOut,
      })
      // if(THIS.bouncing==false){
      //   this.bouncing = true;
      //   const timeline = new TimelineLite()
      //   timeline.to(book,0.3,{
      //     // rotation: 16,
      //     scale:1.2,
      //     ease: Power4.easeOut,
      //   })
      // }else{
      //   this.bouncing = false;
      //   const timeline = new TimelineLite()
      //   timeline.to(book,0.3,{
      //     // rotation: 16,
      //     scale:1,
      //     ease: Elastic.easeOut.config(1,.8),
      //   })
      // }
    },
    jumpOver() {
      const { bubble } = this.$refs
      const timeline = new TimelineLite()
      timeline.to(bubble, 0.4, {
        scale: 0.5,
        rotation: 16,
        ease: Back.easeOut.config(1.7),
      })
      timeline.to(bubble, 1.0, {
        scale: 1,
        rotation: '-=16',
        ease: Elastic.easeOut.config(2.5, 0.5),
      })
    },
    quadratic(e) {
      var target = e.currentTarget
      const timeline = new TimelineLite()
      for (var i = 1; i < 100; i = i + 5) {
        var j = 0.1 * Math.pow(i, 2) + 0.05 * i
        timeline.to(target, 0.1, {
          scale: 1,
          x: i,
          y: j,
          opacity: (150 - i) / 100,
        })
      }
    },
    // Search Category books
    searchCate(cate) {
      console.log(cate + "is called")
      this.loading = true
      this.nothing = false
      this.booklist = []
      this.tmp = []
      this.cate = cate
      this.$http
        .get(
          'https://vue-aplayer-django.herokuapp.com/index/dbdlp/' + 'cate/' +
          cate + "/" + this.counter

        )
        .then(response => {
          console.log(response)
          if (response.status === 200) {
            var books = response.data.data
            this.totalPage = response.data.totalPage
            if(books.length == 0){
              this.nothing = true;
              this.counter = 1
            }else{
              for (var i = 0; i < books.length; i++) {
                this.booklist.push({
                  title: books[i].book_title,
                  author: books[i].book_author,
                  pageLink: books[i].links,
                  coverurl: books[i].book_pic,
                  downLink: books[i].downLink,
                  publisher: books[i].book_publisher,
                  year: books[i].book_year,
                  issn: books[i].issn,
                  id: books[i].bookID,
                  rating: books[i].book_rating,
                  pan: books[i].book_pan_1,
                  patch: books[i].book_pan_pass,
                  infos: books[i].book_infos,
                })
                if ((i + 1) % 3 == 0) {
                  this.tmp.push(this.booklist)
                  this.booklist = []
                }
              }
            }
          }
          else{
            this.counter = 1
          }
          this.loading = false
        })
      .catch(error => {
        if (error.response) {
          this.loading = false;
          this.nothing = true;
          this.counter = 1
        }
      })
      this.searchState = 'cate'
    },
    // Searchbook: call search API display books
    searchWord() {

      this.loading = true
      this.nothing = false
      this.booklist = []
      this.tmp = []
      var BASE_URL = ''
      if(this.selected=="A"){
        BASE_URL = 'https://vue-aplayer-django.herokuapp.com/index/dbdlp/' + 'name/'
      }else{
        BASE_URL = 'https://vue-aplayer-django.herokuapp.com/index/searchBook/'
      }
      this.$http
        .get(
          BASE_URL + 
          this.input + "/" + this.counter
        )
        .then(response => {
          console.log(response)
          if (response.status === 200) {
            var books = response.data.data
            this.totalPage = response.data.totalPage
            if(books.length == 0){
              this.nothing = true;
              this.counter = 1
            }else{
              for (var i = 0; i < books.length; i++) {
                this.booklist.push({
                  title: books[i].book_title,
                  author: books[i].book_author,
                  pageLink: books[i].links,
                  coverurl: books[i].book_pic,
                  downLink: books[i].downLink,
                  publisher: books[i].book_publisher,
                  year: books[i].book_year,
                  issn: books[i].issn,
                  id: books[i].bookID,
                  rating: books[i].book_rating,
                  pan: books[i].book_pan_1,
                  patch: books[i].book_pan_pass
                })
                if ((i + 1) % 3 == 0) {
                  this.tmp.push(this.booklist)
                  this.booklist = []
                }
              }
            }
          }
          else{
            this.counter = 1
          }
          this.loading = false
        })
      .catch(error => {
        if (error.response) {
          this.loading = false;
          this.nothing = true;
          this.counter = 1
        }
      })
      this.searchState = 'name'
    },

    downloadBook(e) {
      this.$http
        .get('https://vue-aplayer-django.herokuapp.com/index/downloadBook/' + e )
        .then(response => {
          this.preViewPdf = response.data
          console.log(this.preViewPdf)
          window.open(this.preViewPdf)
          return response.data
        })
    },

    slide() {
      const { bubble } = this.$refs['test']
      const timeline = new TimelineLite()
      timeline.to(bubble, 0.4, {
        scale: 0.5,
        rotation: 16,
        ease: Back.easeOut.config(1.7),
      })
      timeline.to(bubble, 1.0, {
        scale: 1,
        rotation: '-=16',
        ease: Elastic.easeOut.config(2.5, 0.5),
      })
    },

    // for svg animation
    //
    myscroll() {
      const THIS = this;
      let isLoading = false
      let scrollTop = document.getElementById("scrollBar").scrollTop;
      // windowHeight 可视区的高度
      let windowHeight = window.pageXOffset;
      // scrollHeight 滚动条的总高度
      let scrollHeight =  document.documentElement.scrollHeight;
      let bottomOfWindow = scrollTop
      console.log(windowHeight)
      console.log(scrollTop)
      console.log(scrollHeight)
      console.log(bottomOfWindow)
      let page = this.page
      if(bottomOfWindow == scrollHeight && isLoading == false){
        if(this.page<10){
          THIS.bottomloading = true
          this.$http.get('https://vue-aplayer-django.herokuapp.com/index/searchBook/' +
            this.input + "/"+ page).then(response => {
              if (response.status === 200) {
                var books = response.data
                for (var i = 0; i < books.length; i++) {
                  this.booklist.push({
                    title: books[i].book_title,
                    author: books[i].book_author,
                    pageLink: books[i].links,
                    coverurl: books[i].book_pic,
                    downLink: books[i].downLink,
                    publisher: books[i].book_publisher,
                    rating: books[i].book_rating,
                    year: books[i].book_year,
                    issn: books[i].issn,
                    id: books[i].bookID,
                    pan: books[i].book_pan_1,
                    patch: books[i].book_pan_pass,
                  })
                  if ((i + 1) % 3 == 0) {
                    this.tmp.push(this.booklist)
                    this.booklist = []
                  }
                }
                THIS.bottomloading = false
              }else{
                isLoading = false;
                this.page = 1;
              }
              this.page = page + 1
              console.log(this.page)
            })
          }else{
            return
          }

      }


    }

  },
})
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Lato&display=swap');
@import url('https://fonts.googleapis.com/css?family=Baloo+2&display=swap');
// @import url('bootstrap.min.css');
html{
  background-color: transparent!important;
}
body{
  overflow-y:hidden!important;
  overflow-x:hidden!important;
}
.md-content {
  height: 100vh;
  // background-color: transparent!important;
  overflow-x:hidden;
}

.with-bar{
  overflow-y: scroll;
  padding-right:0!important;
}
.not-with-bar{
  overflow-y: hidden;
  padding-right:10px!important;
}
.scrolling::-webkit-scrollbar{
  color: transparent;
}
.card-container{
  background-color: transparent!important;
  border: none;
}
.el-main {
  background-color: #E9EEF3;
  color: #333;
  padding-top:0px!important;
  padding-left:0px!important;
  padding-right:0px!important;
  margin-top:0px;
  text-align: center;
  // line-height: 60px;
}

.col-md {
  font-size: 0.1rem;
}

.sidebar-icon{
  &:hover{
    fill:white!important;
  }
  margin-left:20px!important;
  margin-right:0px!important;
  padding-top:2px;
  padding-bottom:10px;
  height:30px!important;
}
.sidebar-item{
  display: flex;
  align-items: center;
  &:hover{
    background-color: gray!important;
  }
}
.side-bar-text{
  margin-left:0px;
  padding-left:5px;
  font-weight:500;
  font-family: 'Lato', sans-serif;
  letter-spacing: 2px;;
}
.nothing-text{
  font-weight:500;
  font-size:20px;
  font-family:'Baloo 2', cursive;

}
.md-subhead{
  text-align: left;
}
.p-pagination{
  padding-left:30%!important;
}
.hidden{
  display:none;
}
.disp{
  display:inline-block;
  padding-left:30px;
}

.rate-text{
  font-weight:500;
  font-size:0.6rem;
}
</style>
