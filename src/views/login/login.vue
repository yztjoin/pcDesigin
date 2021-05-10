<template>
  <div class="login_boxtop">
    <div class="login_box" :class="{ 'login_box--active': isShow }">
      <div class="login_box-t">
        <div class="login_box-t-left">
          <div class="txt">登录</div>
          <div class="input_box"><input type="text" placeholder="User" /></div>
          <button class="btn">登录</button>
        </div>
        <div class="login_box-t-right">
          <div class="txt">注册</div>
          <div class="input_box"><input type="text" placeholder="User" /></div>
          <div class="input_box"><input type="text" placeholder="Email" /></div>
          <button class="btn">注册</button>
        </div>
      </div>
      <!-- <div class="login_box-left">
        <div class="txt">登录</div>
        <div class="input_box"><input type="text" placeholder="User" /></div>
      </div>
      <div class="login_box-right">
        <div class="txt">注册</div>
        <div class="input_box"><input type="text" placeholder="User" /></div>
      </div> -->
      <div class="container__overlay">
        <div class="overlay">
          <div class="overlay_left" :class="{ 'overlay_left--active': isShow }">
            <button class="btn" @click="isShow = !isShow">login in</button>
          </div>
          <div class="overlay_right" :class="{ 'overlay_right--active': !isShow }">
            <button class="btn" @click="isShow = !isShow">sign in</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      isShow: false,
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
@import url(./login.less);
@a:123;
</style>
