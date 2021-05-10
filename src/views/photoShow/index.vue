<template>
  <div class="photoShow_boxtop">
    <div
      class="image_box"
      v-for="(item, index) in imgArr"
      :key="index"
    >
      <div class="image_box-before" :style="{ backgroundImage: `url(${item})` }">
        
      </div>
      <div class="content">
        <div>这是标题</div>
        <p>我书写的内容是全世界最亮的</p>
        <button>这个是按钮</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "photoShow",
  data() {
    return {
      imgArr: [
        require("../img/01.jpg"),
        require("../img/02.jpg"),
        require("../img/03.jpg"),
        require("../img/04.jpg"),
      ],
    }
  },
  components: {},
  created() {},
  mounted() {},
  methods: {},
  computed: {},
  watch: {},
}
</script>

<style lang="less" scoped>
// @import url(./index.less);
.photoShow_boxtop {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: space-around;
  background: #fff;
  gap: 10px;

  .image_box {
    position: relative;
    --e: cubic-bezier(0.19, 1, 0.22, 1);
    --d: 700ms;
    height: 350px;
    max-width: 250px;
    min-width: 200px;
    flex: 1;
    overflow: hidden;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1),
      0 2px 2px rgba(0, 0, 0, 0.1),
      0 4px 4px rgba(0, 0, 0, 0.1),
      0 8px 8px rgba(0, 0, 0, 0.1),
      0 16px 16px rgba(0, 0, 0, 0.1);

    &:focus-within {
      .content {
        transition: 0s all;

      }
    }

    &:hover,
    &:focus-within {
      &::after {
        transform: translateY(-50%);
      }

      .image_box-before {
        transform: translateY(-10%);
      }

      .content {
        transform: translateY(0);

        p {
          transform: translateY(0);
          transition-delay: 50ms;
          opacity: 1;
        }
      }

    }

    &::after {
      content: "";
      display: block;
      position: absolute;
      top: 0px;
      // bottom: 0px;
      left: 0px;
      width: 100%;
      height: 200%;
      pointer-events: none;
      background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.009) 11.7%, rgba(0, 0, 0, 0.034) 22.1%, rgba(0, 0, 0, 0.072) 31.2%, rgba(0, 0, 0, 0.123) 39.4%, rgba(0, 0, 0, 0.182) 46.6%, rgba(0, 0, 0, 0.249) 53.1%, rgba(0, 0, 0, 0.32) 58.9%, rgba(0, 0, 0, 0.394) 64.3%, rgba(0, 0, 0, 0.468) 69.3%, rgba(0, 0, 0, 0.54) 74.1%, rgba(0, 0, 0, 0.607) 78.8%, rgba(0, 0, 0, 0.668) 83.6%, rgba(0, 0, 0, 0.721) 88.7%, rgba(0, 0, 0, 0.762) 94.1%, rgba(0, 0, 0, 0.79) 100%);
      transform: translateY(0);
      transition: transform calc(var(--d) * 2) var(--e);
    }

    .image_box-before {
      position: absolute;
      width: 100%;
      height: 100%;
      background-color: whitesmoke;
      height: 110%;
      transition: transform var(--d);
    }

    .content {
      padding: 80px 0;
      box-sizing: border-box;
      text-align: center;
      position: relative;
      font-size: 24px;
      font-weight: 500;
      width: 138px;
      margin: auto;
      height: 100%;
      color: #fff;
      transform: translateY(calc(100% - 130px));
      transition: transform var(--d) var(--e);
      z-index: 3;

      p {
        margin-top: 24px;
        font-family: "Cardo", serif;
        font-size: 20px;
        transform: translateY(35px);
        opacity: 0;
        transition: all var(--d) var(--e);

      }

      button {
        cursor: pointer;
        margin-top: 1.5rem;
        padding: 0.75rem 1.5rem;
        font-size: 0.65rem;
        font-weight: bold;
        letter-spacing: 0.025rem;
        text-transform: uppercase;
        color: white;
        background-color: black;
        border: none;
        border-radius: 10px;

        &:focus {
          outline: 1px dashed yellow;
          outline-offset: 3px;
        }
      }

      button:hover {
        background-color: #0d0d0d;
      }

      button:active {}
    }
  }
}

</style>
