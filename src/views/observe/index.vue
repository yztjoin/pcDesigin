<template>
  <div class="observe">
    <!-- <div class="show_txt">{{ txt }}</div>
    <div class="box" ref="box"></div> -->
    <main>
      <section class="section" v-for="(item, index) in arrImg" :key="index">
        <figure class="image-container">
          <img :src="item" alt="" />
        </figure>
        <article class="content">
          <h2 class="section-title">Let's Get to Know One Another</h2>
          <span class="byline"
            >Content provided by
            <a
              href="https://laurenhallden.com/datingipsum/"
              target="_blank"
              rel="noreferrer"
              >the online dating ipsum generator →</a
            ></span
          >
          <p>
            If I make fun of you it's because I like you someone to provide for you
            documentary filmmaker everything destructive that I do. But I only smoke when
            drinking Think about it! heyyy I despise you should message me, my last
            partner told me really only soft drugs friendzone looking for a third if you
            dress up like a pin-up doll for me. Full-contact Ayn Rand Libertarian
            full-contact full-contact wildly attractive doesn't hurt.
          </p>
          <p>
            P90X you should be clean and intelligent but I only smoke when drinking that
            means I am wonderful. MFA I love the smell of The Game I am currently addicted
            to shooting, lol making others feel good very successsful entrepreneur I'm a
            big fan of I starred in my own reality show. Bald is sexy P90X beekeeping I am
            currently addicted to I don't really keep a budget I did a lot of modeling
            work in the mid-80s.
          </p>
          <p>
            No robots posing as real people P90X you need a real man working on my
            screenplay. That just proves my point clubbing I will love you forever
            shooting laughing hysterically, females performance art or so I've been told
            there's no such thing as a typical Friday night I'm a nice guy. I am extremely
            experienced and talented Juggalo with lots of self-respect you need a real man
            it depends on the night dive bars.
          </p>
          <p>
            That's what she said heyyy everything destructive that I do my lizard tongue.
            Complete lack of shame unworthy of serious consideration if you like I know
            shirtless pics are a no-no, but beekeeping, unworthy of serious consideration
            I know shirtless pics are a no-no, but my last partner told me well-built
            Think about it!. I don't really keep a budget I did a lot of modeling work in
            the mid-80s well-built I am oddly aroused by for real though unworthy of
            serious consideration.
          </p>
          <p>
            There's no such thing as a typical Friday night I starred in my own reality
            show I enjoy I'm a big fan of. See, I told you if I make fun of you it's
            because I like you dive bars because I am a paradox my deep, manly voice,
            complete lack of shame if you have an innie belly button with lots of
            self-respect years ago I discovered living on sailboats. Motorcycle collection
            when I get drunk I am extremely experienced and talented working on my
            screenplay everything destructive that I do blackjack.
          </p>
          <p>
            If that paragraph above turned you off I did a lot of modeling work in the
            mid-80s it's huge females. I am oddly aroused by documentary filmmaker you
            could say I'm old-fashioned I have an IQ of 140, which means there's no such
            thing as a typical Friday night, I am currently addicted to for real though
            most cats eventually love me I'm a nice guy Juggalo. I hope there are good
            girls left P90X I do well dating living on sailboats I hope there are good
            girls left I grow a creepy mustache every February.
          </p>
        </article>
      </section>
    </main>
    <!-- <main >
      <section class="img_box">
        
      </section>
    </main> -->
  </div>
</template>

<script>
// import storage from 'store'
export default {
  name: "observe",
  data() {
    return {
      txt: "可见",
      arrImg: [require("../img/06.jpg"),require("../img/07.jpg"),require("../img/08.jpg")],
    }
  },
  components: {},
  created() {},
  mounted() {
    console.log('测试：',storage)
    let _this = this
    // var intersectionObserver = new IntersectionObserver(function (entries) {
    //   console.log("!!!!!!", entries[0])
    //   let { intersectionRatio } = entries[0]
    //   console.log(intersectionRatio)
    //   if (intersectionRatio > 0) {
    //     _this.txt = "可见"
    //   } else {
    //     _this.txt = "不可见"
    //   }
    // })
    // intersectionObserver.observe(this.$refs.box)
   
  },
  methods: {},
  computed: {},
  watch: {},
}
</script>

<style lang="less" scoped>
.observe {
  --scale: 0.1;
    --space: 8vmin;
  --font-primary: 'Lato', sans-serif;
  --font-heading: 'Playfair Display', serif;
  color: #fff;
  font-size: 26px;
  background-color: hsl(5, 15%, 5%);
}
.show_txt {
  position: fixed;
  top: 100px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 30px;
}
.observe {
  padding-top: 400px;
}
.box {
  margin: auto;
  width: 100px;
  height: 100px;
  background: fuchsia;
}
.section {
  transform-origin: center top;
  transform: scaleY(calc(1 - var(--scale)));
}
.section > * {
  transform-origin: center top;
  transform: scaleY(calc(1 / (1 - var(--scale))));
}
.image-container {
  position: sticky;
  top: 0px;
  height: 100vh;
  z-index: -2;
  img {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    -o-object-fit: cover;
    object-fit: cover;
  }
}
.content {
  position: relative;
  margin: -50vh auto 0;
  padding: var(--space);
  max-width: 55ch;
  width: calc(100% - var(--space));
  background: hsla(5, 15%, 5%, 0.9);
}

.content > * + * {
  margin-top: 2rem;
}
.section-title {
  font-family: var(--font-heading);
  font-size: clamp(2.5rem, 6vw, 4.5rem);
  font-weight: bold;
  line-height: 1.125;
}
.byline {
  display: block;
  font-size: 0.6em;
  margin: calc(var(--space) / 1.35) 0;
}
</style>
