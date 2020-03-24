<template>
  <div id="landing"
  :class="{hovering:isHover}"
  >

    <!-- <md-content id="scrollBar" class="md-scrollbar" @scroll="myscroll()"> -->
    <div class="md-layout md-gutter">
      <div class="md-layout-item md-size-15"></div>
      <div class="md-layout-item">
        <md-icon class="md-size-5x" md-src="static/index.svg" />
      </div>
      <div class="md-layout-item md-size-15"></div>
    </div>
    <div class="md-layout md-gutter">
      <div class="md-layout-item md-size-15"></div>
      <div class="md-layout-item">
        <el-input v-model="input" placeholder="Please input searching keyword">
          <i
            ref="bubble"
            slot="prefix"
            class="el-input__icon el-icon-search bubble-wrapper"
            @click="
              jumpOver()
              searchWord()
            "
          ></i>
        </el-input>
      </div>
      <div class="md-layout-item md-size-15"></div>
    </div>

    <template v-if="loading">
      <vue-loading
        type="bars"
        color="#B3C0D1"
        :size="{ width: '50px', height: '50px' }"
      ></vue-loading>
    </template>
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
        @click="downloadBook(book.id);shake($event)"
        @mouseover="isHover=true"
        @mouseleave="isHover=false"
      >
      <md-card md-with-hover 
      style="backgroundColor:transparent">
        <md-card-media-actions>
          <md-card-media>
            <el-image :src="book.coverurl" style="max-height:240px;">
              <div slot="error" class="image-slot">
                <img src="static/image-holder.png" style="max-height:300px;">
              </div>
            </el-image>


          </md-card-media>
          <md-card-media style="width:50%;">
            <md-card-content>
              <div style="font-size:0.8rem;">{{book.author}}</div>
              <div class="md-subhead" style="font-size:0.8rem;"><i>{{book.year}}</i></div>
            </md-card-content>
          </md-card-media>

        </md-card-media-actions>
      </md-card>

      </div>
    </div>

    <!-- </md-content> -->

  </div>
</template>

<script>
import Vue from 'vue'
import { TimelineLite, Back, Elastic } from 'gsap'
export default Vue.extend({
  name: 'Home',
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
      preViewPdf: '',
      loading: false,
      bottomloading: false,
      page: '1',
      srcFallback: 'static/image-holder.png' 
    }
  },

  methods: {
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
      timeline.to(book,0.2,{
        rotation: 16,
        ease: Back.easeOut.config(1.6),
      })
      timeline.to(book,0.2,{
        rotation:-16,
        
      })
      timeline.to(book,0.2,{
        rotation:0,
        
      })
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
    // Searchbook: call search API display books
    searchWord() {
      this.loading = true
      this.booklist = []
      this.tmp = []
      this.page = "1"
      this.$http
        .get(
          'https://vue-aplayer-django.herokuapp.com/index/searchBook/' +
            this.input + "/"+ this.page
        )
        .then(response => {
          if (response.status === 200) {
            var books = response.data
            for (var i = 0; i < books.length; i++) {
              this.booklist.push({
                title: books[i].title,
                author: books[i].author,
                pageLink: books[i].links,
                coverurl: books[i].coverurl,
                downLink: books[i].downLink,
                publisher: books[i].publisher,
                year: books[i].year,
                issn: books[i].issn,
                id: books[i].bookID,
              })
              if ((i + 1) % 3 == 0) {
                this.tmp.push(this.booklist)
                this.booklist = []
              }
            }
          }
          this.page = parseInt(this.page) + 1
          this.loading = false
        })
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

    myscroll() {
      const THIS = this;
      let isLoading = false
      let scrollTop = document.getElementById("scrollBar").scrollTop;
      // windowHeight 可视区的高度
      let windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
      // scrollHeight 滚动条的总高度
      let scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
      let bottomOfWindow = scrollTop + windowHeight
      if(bottomOfWindow == scrollHeight && isLoading == false){
          isLoading = true
          this.$http.get('https://vue-aplayer-django.herokuapp.com/index/searchBook/' +
            this.input + "/"+ this.page).then(response => {
              if (response.status === 200) {
                var books = response.data
                for (var i = 0; i < books.length; i++) {
                  this.booklist.push({
                    title: books[i].title,
                    author: books[i].author,
                    pageLink: books[i].links,
                    coverurl: books[i].coverurl,
                    downLink: books[i].downLink,
                    publisher: books[i].publisher,
                    year: books[i].year,
                    issn: books[i].issn,
                    id: books[i].bookID,
                  })
                  if ((i + 1) % 3 == 0) {
                    this.tmp.push(this.booklist)
                    this.booklist = []
                  }
                }
              }else{
                isLoading = false;
                this.page = "1";
              }
              this.page = parseInt(this.page) + 1
              console.log(this.page)
            })
      }

    }

  },
  mounted () {
    const img = this.$refs;
    console.log(img)
    img.onerror = () => {
      this.imageSrc = this.srcFallback
    }
  },
})
</script>

<style lang="scss">

.md-content {
  height: 100vh;
  overflow-x:hidden;

}
.hero-body {
  height: 100vh;
}
.card-container{
  background-color: transparent!important;
  border: none;
}
// ::-webkit-scrollbar-thumb{
//   background:#b3c0d1;
// }

// .hovering {
//   box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
// }

.col-md {
  font-size: 0.1rem;
}
</style>
