
import Vue from "vue"
import Vuex from "vuex"
Vue.use(Vuex);
//如需要增加模块，只需要在modules文件夹下新建js即可，如 user.js 则会生成user的模块
let moduleContext = require.context('./modules', false, /\.ts|js$/);
let modules = {};
moduleContext.keys().forEach((moduleName) => {
  let name = moduleName.split('/').pop().replace(/\.\w+$/, '');
  modules[name] = moduleContext(moduleName).default || moduleContext(moduleName)
})
export default new Vuex.Store({
  modules
});
