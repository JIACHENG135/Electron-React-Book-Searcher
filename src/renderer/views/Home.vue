<template>
  <div id="landing">
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

    <vue-loading
      v-if="loading"
      type="bars"
      color="#B3C0D1"
      :size="{ width: '50px', height: '50px' }"
    ></vue-loading>

    <div
      v-for="(books, index) in tmp"
      :key="index"
      style="padding:30px;"
      class="md-layout md-gutter md-alignment-center"
    >
      <div
        v-for="book in books"
        :key="book.md5"
        class="md-layout-item md-medium-size-33 md-small-size-50 md-xsmall-size-100"
      >
        <md-card md-with-hover>
          <md-card-media-cover md-text-scrim>
            <md-card-media md-ratio="9:16">
              <img :src="book.coverurl" alt="Skyscraper" />
            </md-card-media>
            <md-card-area>
              <!-- <md-card-header>
              <span class="md-title">Author: <i>{{book.author}}</i></span>
              <span class="md-subhead">Year: <i>{{book.year}}</i></span>
            </md-card-header> -->

              <md-card-actions>
                <md-button @click="downloadBook(book.id)">Download</md-button>
                <md-button>Open</md-button>
              </md-card-actions>
            </md-card-area>
          </md-card-media-cover>
        </md-card>
      </div>
    </div>
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
      this.$http
        .get(
          'https://vue-aplayer-django.herokuapp.com/index/searchBook/' +
            this.input
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
          this.loading = false
        })
    },

    downloadBook(e) {
      this.$http
        .get('https://vue-aplayer-django.herokuapp.com/index/downloadBook/' + e)
        .then(response => {
          this.preViewPdf = response.data
          console.log(this.preViewPdf)
          window.open(this.preViewPdf, '_blank')
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
  },
})
</script>

<style>
body {
  overflow-x: hidden;
}
.hero-body {
  height: 100vh;
}
#landing {
  height: 100vh;
}
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  /* line-height: 60px; */
}

.el-main {
  background-color: transparent;
  color: #333;
  /* text-align: center; */
  /* line-height: 60px; */
}

body > .el-container {
  height: 100vh !important;
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
.el-card {
  padding: 10px;
  background-color: black;
}
.el-icon-download {
  font-size: 2em;
}

.el-row {
  margin-bottom: 40px;
  max-height: 100px;
  background-color: black;
  flex-wrap: wrap !important;
}

#particles {
  position: absolute;
  height: 100%;
  width: 100%;
}

.hovering {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

.col-md {
  font-size: 0.1rem;
}
</style>
