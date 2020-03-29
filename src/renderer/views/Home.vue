<template>



  <div 
  id="landing"
  :class="{hovering:isHover}"
  >

    <el-container>

      <el-aside 
      width="280px"
      style=
      "
      padding-top:20px
      "
      >

      <div style="height:30%">

      </div>
      <div class = "sidebar-item"> 
        <md-icon
          md-src="static/wenhua.svg" 
          class="sidebar-icon">
        </md-icon>
        <span class="side-bar-text">  culture </span>
      </div>
      <div class = "sidebar-item"> 
        <md-icon 
          md-src="static/wenxue.svg" 
          class="sidebar-icon"
          />
          <span class="side-bar-text">  literature </span>
      </div>
      <div class = "sidebar-item"> 
        <md-icon 
          md-src="static/shenghuo.svg" 
          class="sidebar-icon"
          />
          <span class="side-bar-text">  life </span>
      </div>

      <div class = "sidebar-item"> 
        <md-icon 
          md-src="static/keji.svg" 
          class="sidebar-icon"
          />
          <span class="side-bar-text">  technology </span>
      </div>

      <div class = "sidebar-item"> 
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
        @scroll="myscroll()"
        >

        <div 
        class="md-layout md-gutter"
        style="-webkit-app-region: drag;"
        >

          <div class="md-layout-item md-size-5"></div>

          <div class="md-layout-item">

            <md-icon 
            class="md-size-5x" 
            md-src="static/index.svg" 
            style="padding-top:20px;padding-bottom:20px;"/>

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
                  searchWord()
                "
                @keyup.enter="searchWord"
              ></i>

            </el-input>

          </div>

          <div class="md-layout-item md-size-5"></div>

        </div>

        <template v-if="loading">

          <vue-loading
            type="bars"
            color="#B3C0D1"
            :size="{ width: '50px', height: '50px' }"
          ></vue-loading>

        </template>

        <template v-if="tmp.length > 0">
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
              "
              
              @mouseover="isHover=true"
              @mouseleave="isHover=false"
            >

            <md-card 
            md-with-hover 
            style="backgroundColor:transparent;height:260px;!important">

              <md-card-media-actions>

                <md-card-media>

                  <img
                  :src="book.coverurl" 
                  @click="downloadBook(book.id)"
                  style="height:228px!important;width:200px!important;"/>

                    <div slot="error" class="image-slot">

                      <img src="static/image-holder.png" style="max-height:300px;">

                    </div>

                </md-card-media>

                <md-card-media style="width:50%;overflow-y:auto">

                  <md-card-content>

                    <div style="font-size:0.8rem;">{{book.author}}</div>

                    <div class="md-subhead" style="font-size:0.8rem;"><i>{{book.year}}</i></div>

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


        <template v-else>
          <div class ="fixed-bottom" style="margin-left:20%;margin-bottom:100px;">
            <img src="static/background.png" width='400px;' class="back-img" alt="">
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
import { TimelineLite, TimelineMax, Back, Elastic, Bounce, Power4, TweenMax, Linear, Circ, Sine, Draggable } from 'gsap'

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
      isScroll: true,
      preViewPdf: '',
      loading: false,
      bottomloading: false,
      nothing: false,
      page: '1',
      srcFallback: 'static/image-holder.png',
      bouncing: false,
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
      const THIS = this;
      if(THIS.bouncing==false){
        this.bouncing = true;
        const timeline = new TimelineLite()
        timeline.to(book,0.3,{
          // rotation: 16,
          scale:1.5,
          ease: Power4.easeOut,
        })
      }else{
        this.bouncing = false;
        const timeline = new TimelineLite()
        timeline.to(book,0.3,{
          // rotation: 16,
          scale:1,
          ease: Elastic.easeOut.config(1,.8),
        })
      }
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
      this.nothing = false
      this.booklist = []
      this.tmp = []
      this.page = 1
      this.$http
        .get(
          'https://vue-aplayer-django.herokuapp.com/index/searchBook/' +
            this.input + "/"+ this.page
        )
        .then(response => {
          console.log(response)
          if (response.status === 200) {
            var books = response.data
            if(books.length == 0){
              this.nothing = true;
            }else{
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
          }
          this.page = parseInt(this.page) + 1
          this.loading = false
        })
      .catch(error => {
        if (error.response) {
          this.loading = false;
          this.nothing = true;
        }
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
  mounted () {
    
// var sun = $("#sun_3_"), 
//     cloud1 = $("#cloud1"),
//     cloud2 = $("#cloud2"),
//     cloud3 = $("#cloud3"),
//     gauge = $("#gauge"),
//     wheel = $("#wheel"),
//     city = $(".city path"),
//     tTog = $("#top-toggle"),
//     sTog = $("#side-toggle"),
//     bkFar = $("#bk-far"),
//     bkMid = $("#bk-mid"),
//     but1 = $("#button1"),
//     but2 = $("#button2"),
//     controls = $("#controls path"),
//     mult = [controls, bkFar, bkMid, city, extras],
//     body = $("body"),
//     extras = $(".extras path");

// TweenMax.set(wheel, {
//   transformOrigin: "50% 50%"
// });

// TweenMax.set(city, {
//   visibility: "visible"
// });

// //animation that's repeated for all of the sections
// function revolve() {
//   var tl = new TimelineMax({
//     repeat1: -1
//   });

//   tl.add("begin");
//   tl.to(sun, 15, {
//       transformOrigin: "50% 50%",
//       rotation: 360,
//       repeat: -1,
//       ease: Linear.easeNone
//     }, "begin");
//   tl.to(cloud1, 10, {
//       x: -110,
//       repeat: -1,
//       yoyo: true,
//       ease: Linear.easeNone
//     }, "begin");
//   tl.to(cloud2, 10, {
//       x: -70,
//       repeat: -1,
//       yoyo: true,
//       ease: Linear.easeNone
//     }, "begin");
//   tl.to(cloud3, 10, {
//       x: -50,
//       repeat: -1,
//       yoyo: true,
//       ease: Linear.easeNone
//     }, "begin");

//   return tl;
// }

// var repeat = revolve();

// //bring it in
// function cityIn() {
//   var tl = new TimelineMax({
//     paused: true
//   });

//   tl.add("in");
//   tl.from(tTog, 3, {
//       rotation: -30,
//       transformOrigin: "50% 100%",
//       ease: Circ.easeInOut
//     }, "in");
//   tl.staggerFrom(city, 0.75, {
//       y: -50,
//       scale: 0,
//       cycle:{
//         x:[300, 100, 200],
//         opacity:[0.5, 0.3, 0.2, 0.8],
//         rotation:[50, 100, 150],
//       }, 
//       transformOrigin: "50% 50%",
//       ease: Back.easeOut
//     }, 0.02, "in");
//   tl.staggerFrom(extras, 2.5, {
//       x: 300,
//       scale: 0,
//       transformOrigin: "50% 50%",
//       rotation: -30,
//       ease: Elastic.easeOut
//     }, 0.1, "in");
//   tl.from(bkFar, 2.5, {
//       scaleY: 0,
//       opacity: 0.7,
//       transformOrigin: "50% 100%",
//       ease: Circ.easeOut
//     }, "in");
//   tl.from(bkMid, 2.5, {
//       scaleY: 0,
//       opacity: 0.7,
//       transformOrigin: "50% 100%",
//       ease: Circ.easeOut
//     }, "in+=1");
//   tl.from(gauge, 2, {
//       rotation: 180,
//       transformOrigin: "50% 50%",
//       ease: Bounce.easeInOut
//     }, "in");
//   tl.from(gauge, 1, {
//       rotation: 0,
//       transformOrigin: "50% 50%",
//       ease: Sine.easeIn
//     }, "in+=3");

//   return tl;
// }

// var fullIn = cityIn();

// //side toggle perspective
// function perspective() {
//   var tl = new TimelineMax({
//     paused: true
//   });

//   tl.add("per");
//   tl.from(sTog, 1, {
//       rotation: -30,
//       transformOrigin: "100% 50%",
//       ease: Circ.easeInOut
//     }, "per");
//   tl.to(bkFar, 1, {
//       y: -30,
//       scaleY: 0.8,
//       opacity: 0.4,
//       transformOrigin: "50% 100%",
//       ease: Circ.easeInOut
//     }, "per");
//   tl.to(bkMid, 1, {
//       scaleY: 1.6,
//       transformOrigin: "50% 100%",
//       ease: Circ.easeInOut
//     }, "per");
//   tl.from(gauge, 0.5, {
//       rotation: 60,
//       transformOrigin: "50% 50%",
//       ease: Bounce.easeInOut
//     }, "per");
//   tl.from(gauge, 1, {
//       rotation: 0,
//       transformOrigin: "50% 50%",
//       ease: Sine.easeIn
//     }, "per+=0.5");

//   return tl;
// }

// var side = perspective();

// //button hue
// function hued() {
//   var ch1 = "hsl(+=110%, +=0%, +=0%)", 
//   tl = new TimelineMax({
//     paused: true
//   });

//   tl.add("hu");
//   tl.to(mult, 1.25, {
//       fill: ch1
//     }, "hu");
//   tl.from(gauge, 2, {
//       rotation: "-=70",
//       transformOrigin: "50% 50%",
//       ease: Bounce.easeOut
//     }, "hu");
//   tl.to(body, 1.25, {
//       backgroundColor: ch1
//     }, "hu");

//   return tl;
// }

// var hue = hued();

// //button saturation
// function saturation() {
//   var ch2 = "hsl(+=5%, +=2%, -=10%)",
//   tl = new TimelineMax({
//     paused: true
//   });

//   tl.add("sated");
//   tl.to(body, 1, {
//       backgroundColor:ch2
//     }, "sated");
//   tl.from(gauge, 2, {
//       rotation: "-=100",
//       transformOrigin: "50% 50%",
//       ease: Bounce.easeOut
//     }, "sated");
//   tl.to(mult, 2, {
//       fill:ch2
//     }, "sated");

//   return tl;
// }

// var sat = saturation();

// $(document).ready(function() {
//   Draggable.create(wheel, {
//     type: "rotation",
//     bounds: {
//       minRotation: 0,
//       maxRotation: 360
//     },
//     onDrag: function() {
//       fullIn.progress((this.rotation)/360 );
//       fullIn.pause();
//     }
//   });

//   $(tTog).on('click', function(e) {
//     e.preventDefault();
//     $(this).toggleClass('inTo');
//     if ($(this).hasClass('inTo')) {
//       fullIn.progress(0);
//       fullIn.restart();
//     } else {
//       fullIn.reverse();
//     }
//   });

//   $(sTog).on('click', function(e) {
//     e.preventDefault();
//     $(this).toggleClass('s-pers');
//     if ($(this).hasClass('s-pers')) {
//       side.restart();
//     } else {
//       side.reverse();
//     }
//   });

//   $(but1).on('click', function(e) {
//     e.preventDefault();
//     $(this).toggleClass('a-s');
//     if ($(this).hasClass('a-s')) {
//       sat.restart();
//     } else {
//       sat.reverse();
//     }
//   });

//   $(but2).on('click', function(e) {
//     e.preventDefault();
//     $(this).toggleClass('a-h');
//     if ($(this).hasClass('a-h')) {
//       hue.restart();
//     } else {
//       hue.reverse();
//     }
//   });
// });

      // const img = this.$refs;
    // img.onerror = () => {
    //   this.imageSrc = this.srcFallback
    // }
    window.addEventListener("keypress", function(e) {
      if(e.key === 'Enter'){
        this.searchWord()
        this.jumpOver()
      }
    }.bind(this));
  },
})
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Lobster&display=swap');
@import url('https://fonts.googleapis.com/css?family=Baloo+2&display=swap');
@import url('bootstrap.min.css');
html{
  background-color: transparent!important;
}
.md-content {
  height: 100vh;
  // background-color: transparent!important;
  overflow-x:hidden;
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
  line-height: 60px;
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
  font-family: 'Lobster', cursive;
  letter-spacing: 2px;;
}
.nothing-text{
  font-weight:500;
  font-size:20px;
  font-family:'Baloo 2', cursive;

}


</style>
