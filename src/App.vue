<template>
  <div id="app">
    <div class="nav">
      <button class="custom-btn btn-15" @click="$router.push('/photoShow')">照片</button>
      <button class="custom-btn btn-15" @click="$router.push('/login')">登录</button>
       <button class="custom-btn btn-15" @click="$router.push('/observe')">滑动效果</button>
    </div>
    <router-view />
  </div>
</template>

<style lang="less">
.nav {
  position: fixed;
  left: 0;
  right: 0;
  width: 100%;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  z-index: 99;
}
.custom-btn {
  width: 130px;
  height: 40px;
  color: #fff;
  border-radius: 5px;
  padding: 10px 25px;
  font-family: "Lato", sans-serif;
  font-weight: 500;
  background: transparent;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  display: inline-block;
  box-shadow: inset 2px 2px 2px 0px rgba(255 ,255 ,255 , 0.5),
    7px 7px 20px 0px rgba(0 ,0, 0 ,0.1), 4px 4px 5px 0px rgba(0 ,0, 0, 0.1);
  outline: none;
}
.btn-15 {
  background: #b621fe;
  border: none;
  z-index: 1;
}
.btn-15:after {
  position: absolute;
  content: "";
  width: 0;
  height: 100%;
  top: 0;
  right: 0;
  z-index: -1;
  background-color: #663dff;
  border-radius: 5px;
  box-shadow: inset 2px 2px 2px 0px rgba(255, 255, 255 ,0.5),
    7px 7px 20px 0px rgba(0 ,0, 0 ,0.1), 4px 4px 5px 0px rgba(0 ,0, 0, 0.1);
  transition: all 0.3s ease;
}
.btn-15:hover {
  color: #fff;
}
.btn-15:hover:after {
  left: 0;
  width: 100%;
}
.btn-15:active {
  top: 2px;
}
</style>
