export default Tool = {
  /**
   * @method 定位函数
   */
  getLocation() {
    var geolocation = new BMap.Geolocation();
    return new Promise(function (resolve, reject) {
      geolocation.getCurrentPosition(function (r) {
        if (this.getStatus() == BMAP_STATUS_SUCCESS) {
          resolve(r);
        } else {
          reject({
            msg: '定位失败',
            status: -1
          });
        }
      });
    });
  },

  /**
   * @method 请求出错处理函数
   * @param {Object} err 错误对象
   * @param {Object} vm vue实例
   */
  errorFnc(err, vm) {
    if (err && err.response) {
      switch (err.response.status) {
        case 400:
          err.Msg = '请求错误(400)';
          break;
        case 401:
          err.Msg = '未授权，请重新登录(401)';
          break;
        case 403:
          err.Msg = '拒绝访问(403)';
          break;
        case 404:
          err.Msg = '请求出错(404)';
          break;
        case 408:
          err.Msg = '请求超时(408)';
          break;
        case 500:
          err.Msg = '服务器错误(500)';
          break;
        case 501:
          err.Msg = '服务未实现(501)';
          break;
        case 502:
          err.Msg = '网络错误(502)';
          break;
        case 503:
          err.Msg = '服务不可用(503)';
          break;
        case 504:
          err.Msg = '网络超时(504)';
          break;
        case 505:
          err.Msg = 'HTTP版本不受支持(505)';
          break;
        default:
          err.Msg = `连接出错(${err.response.status})!`;
      }
    } else if (!err.Msg) {
      err.Msg = '请链接互联网！';
    }
    setTimeout(() => {
      vm.uPop.close();
      setTimeout(() => {
        vm.uPop.msg(err.Msg);
      }, 0);
    }, 500);
    //return Promise.reject(err);
  },
  /**
   * @method 将一个多维数组合并成一个一维数组
   * @param {Array} arr 要处理的数组
   */
  flattenDeep(list) {
    return [].concat(...list.map((x) => (Array.isArray(x) ? flattenDeep(x) : x)));
  },
  /**
   * @method 数组去重
   * @param {Array} arr 传入的原数组
   * @param {Bollean}  deep 是否为深度去重
   * @param {undefined}  recursiveArr 调用者不传，递归使用
   */
  deleteRepeat(arr, deep = false, recursiveArr) {
    // 高级写法
    if (!recursiveArr) {
      try {
        if (deep) return [...new Set(arr.flat(Infinity))]; // es10
        return [...new Set(arr)]; // es6
      } catch (e) {
        console.log('浏览器不支持es10，使用兼容写法');
      }
    }
    // 兼容写法
    let tempArr;
    if (recursiveArr) {
      tempArr = recursiveArr;
    } else {
      tempArr = [];
    }
    for (let i = 0; i < arr.length; i++) {
      let type = getType(arr[i]);
      if (type === 'number') {
        if (tempArr.indexOf(arr[i]) === -1) {
          tempArr.push(arr[i]);
        }
      } else if (type == 'array') {
        if (deep) {
          this.deleteRepeat(arr[i], true, tempArr);
        } else {
          tempArr.push(arr[i]);
        }
      } else {
        tempArr.push(arr[i]);
      }
    }
    return tempArr;
  },
  /**
   * @method 获取视口尺寸
   */
  getViewportSize() {
    return {
      width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
      height:
        window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
    };
  },
  /**
   * @method 转换日期到指定格式
   * @param date 日期
   * @param fmt  需要转换的格式 比如 'YYYY-MM-dd hh:mm:ss'
   */
  dateFormat(date, fmt) {
    if (null == date || undefined == date) return '';
    var o = {
      'Y+': date.getFullYear(), //年份
      'M+': date.getMonth() + 1, //月份
      'd+': date.getDate(), //日
      'h+': date.getHours(), //小时
      'm+': date.getMinutes(), //分
      's+': date.getSeconds() //秒
    };
    if (/(Y+)/.test(fmt))
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    for (var k in o)
      if (new RegExp('(' + k + ')').test(fmt))
        fmt = fmt.replace(
          RegExp.$1,
          RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
        );
    return fmt;
  },
  /**
   * @method 格式化日期
   * @param {String} str 要格式化的日期字符串
   */
  UTCtoBeijing(str) {
    let hasT = str.indexOf('T');
    let hasDot = str.indexOf('.');
    let strArr = [];
    if (hasT > -1) {
      str = str.replace('T', ' ');
    }
    strArr = str.split('.');
    if (hasDot > -1) {
      strArr.splice(1, strArr.length - 1);
    }
    str = strArr.join('');
    return str;
  },
  /**
   * @method 分钟转化为小时
   * @param {Number} time 单位分钟
   */
  toHourMinute(time) {
    let minute = '';
    let hour = '';
    let day = '';
    if (time >= 60 && time < 60 * 24) {
      minute = time % 60 == 0 ? '' : (time % 60) + '分钟';
      hour = parseInt(time / 60) + '小时';
    } else if (time >= 60 * 24) {
      minute = time % 60 == 0 ? '' : (time % 60) + '分钟';
      hour =
        parseInt(parseInt(time % 1440) / 60) == 0
          ? ''
          : parseInt(parseInt(time % 1440) / 60) + '小时';
      day = parseInt(time / 1440) + '天';
    } else {
      minute = time + '分钟';
    }
    return day + hour + minute;
  },
  /**
   * @method 将一个字符串以空格分割
   * @param {String} str 要分割的字符串
   * @param {Number} num num个字符一组
   */
  sliceString(str, num) {
    let arr = str.split('');
    let resArr = [];
    let sum = Math.ceil(arr.length / num);
    for (let i = 0; i < sum; i++) {
      resArr.push(arr.splice(0, num).join(''));
    }

    return resArr.join(' ');
  },
  // 数组去重，用于一维数组和对象数组
  uniqueArr(arr, key = '') {
    let result = [];
    let obj = {};
    arr.forEach((e) => {
      let flag = key ? e[key] : e;
      if (!obj[flag]) {
        result.push(e);
        obj[flag] = 1;
      }
    });
    return result;
  },
  // 处理手机号码 为 182****6666
  hidePhoneNum(iphone) {
    return iphone.substr(0, 3) + '****' + iphone.substr(7);
  },
  // 判断值是否为空
  isEmpty(val) {
    // null or undefined
    if (val == null) return true;
    if (typeof val === 'boolean') return false;
    if (typeof val === 'number') return !val;
    if (val instanceof Error) return;
    val.message === '';
    switch (Object.prototype.toString.call(val)) {
      // String or Array
      case '[object String]':
      case '[object Array]':
        return !val.length;
      // Map or Set or File
      case '[object File]':
      case '[object Map]':
      case '[object Set]': {
        return !val.size;
      }
      // Plain Object
      case '[object Object]': {
        return !Object.keys(val).length;
      }
    }
    return false;
  },
  /**
   * 查找字符串的字节数
   * @param {String} str: 要查找的字符串
   */
  getCharLength(str) {
    var len = 0;
    for (var i = 0, strLen = str.length; i < strLen; i++) {
      var c = str.charCodeAt(i);
      // 单字节加1
      if ((c >= 0x0001 && c <= 0x007e) || (c >= 0xff60 && c <= 0xff9f)) {
        len++;
      } else {
        len += 2;
      }
    }
    return len;
  },
  /**
   * 动态插入script标签，返回promise
   * @param {*} url: 要加载的代码url
   */
  loadScript(url) {
    return new Promise((resolve, reject) => {
      var script = document.createElement('script');
      script.className = 'dynamic-script';
      script.type = 'text/javascript';
      if (script.readyState) {
        // IE
        script.onreadystatechange = function () {
          if (script.readyState === 'loaded' || script.readyState === 'complete') {
            script.onreadystatechange = null;
            resolve();
          }
        };
      } else {
        // Others
        script.onload = function () {
          return resolve();
        };
      }
      script.onerror = function () {
        return reject(Error('script onerror'));
      };
      script.src = url;
      document.getElementsByTagName('script')[0].parentNode.appendChild(script);
    });
  },
  // 获取数据类型
  getType(obj) {
    if (obj instanceof Element) {
      return 'element';
    }
    return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
  },
  //获取查询参数
  getQueryStringArgs(key) {
    var qs = location.search.length > 0 ? location.search.substring(1) : '',
      hashStr = location.hash.length > 0 ? location.hash.split('?')[1] : '';
    (args = {}),
      //取得每一项
      (items = qs.length ? qs.split('&') : []), //split(separator,howmany) 方法用于把一个字符串分割成字符串数组
      (items1 = hashStr.length ? hashStr.split('&') : []),
      (items = items.concat(items1)),
      (item = null),
      (name = null),
      (value = null),
      //在 for 循环中使用
      (i = 0),
      (len = items.length);
    //逐个将每一项添加到 args 对象中
    for (i = 0; i < len; i++) {
      item = items[i].split('=');
      name = decodeURIComponent(item[0]);
      value = decodeURIComponent(item[1]);
      if (name.length) {
        args[name] = value;
      }
    }
    return args[key];
  },
  //获取或者设置ele自定义data
  customEleData(ele, key, value) {
    if (!key) {
      return '';
    }
    if (!value) {
      if (!ele.dataset.id) return '';
      return ele.dataset[key];
    } else {
      ele.dataset[key] = value;
    }
  },
  // 存储session 或者获取session
  session(key, value) {
    if (typeof value === 'number' || typeof value === 'boolean') {
      sessionStorage.setItem(key, value);
      return;
    }
    if (value) {
      if (typeof value == 'object') {
        value = JSON.stringify(value);
      }
      sessionStorage.setItem(key, value);
      return;
    }

    let session = sessionStorage.getItem(key);
    if (session) {
      try {
        session = JSON.parse(session);
      } catch (e) {
        session = session;
      }
    } else {
      session = null;
    }
    return session;
  },
  // 验证正整数
  validNumber(value) {
    if (value === '') return;
    let num = Number(value);
    if (num != num) return;
    if (value < 0) return;
    if (parseInt(value) === num) {
      return true;
    }
  },
  // 验证数字
  validNumber(value) {
    value = value.toString();
    let ex = /^([1-9](\d+)?)$|^\d$/;
    return ex.test(value);
  },
  // 验证最多两位的小数
  validFloat(value) {
    value = value.toString();
    let ex = /^(([1-9]([\d]+)?)|[\d])(\.[\d]{1,2})?$/;
    return ex.test(value);
  },
  /**
   * @method 判断小数点后有几位
   * @param any
   */
  getDecimalLength: function (arg1) {
    let type = this.getType(arg1); // 函数在上面~~~~
    if (!(type === 'number' || type === 'string')) return 0;
    if (String(arg1).indexOf('.') < 0) return 0;
    if (type === 'number') return (arg1 + '').replace(/^\d+\./, '').replace(/-/, '').length;
    if (/\D/.test(arg1.replace(/\./, ''))) return 0;
    return (arg1 + '').replace(/^\d+\./, '').replace(/-/, '').length;
  },
  //获取公里
  getKm(Distance = 0) {
    if (!Distance && Distance != 0) {
      return Distance;
    }
    if (Distance <= 100) {
      return '小于100米';
    }
    if (Distance > 100 && Distance <= 1000) {
      return Distance + '米';
    }
    return (Number(Distance) / 1000).toFixed(2) + '公里';
  },
  //计算坐标距离
  getDistance(lat1, lng1, lat2, lng2) {
    lat1 = lat1 || 0;
    lng1 = lng1 || 0;
    lat2 = lat2 || 0;
    lng2 = lng2 || 0;
    let rad1 = (lat1 * Math.PI) / 180.0;
    let rad2 = (lat2 * Math.PI) / 180.0;
    let a = rad1 - rad2;
    let b = (lng1 * Math.PI) / 180.0 - (lng2 * Math.PI) / 180.0;
    let r = 6378137;
    return (
      r *
      2 *
      Math.asin(
        Math.sqrt(
          Math.pow(Math.sin(a / 2), 2) +
            Math.cos(rad1) * Math.cos(rad2) * Math.pow(Math.sin(b / 2), 2)
        )
      )
    ).toFixed(0);
  },
  /**
   @description 页面垂直平滑滚动到指定滚动高度
   @author zhangxinxu(.com)
  */
  scrollSmoothTo(position) {
    if (!window.requestAnimationFrame) {
      window.requestAnimationFrame = function (callback, element) {
        return setTimeout(callback, 17);
      };
    }
    // 当前滚动高度
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    // 滚动step方法
    var step = function () {
      // 距离目标滚动距离
      var distance = position - scrollTop;
      // 目标滚动位置
      scrollTop = scrollTop + distance / 5;
      if (Math.abs(distance) < 1) {
        window.scrollTo(0, position);
      } else {
        window.scrollTo(0, scrollTop);
        requestAnimationFrame(step);
      }
    };
    step();
  },
  // 复制到粘贴板
  copyToClipboard(str) {
    const el = document.createElement('textarea');
    el.value = str;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    const selected =
      document.getSelection().rangeCount > 0 ? document.getSelection().getRangeAt(0) : false;
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    if (selected) {
      document.getSelection().removeAllRanges();
      document.getSelection().addRange(selected);
    }
  },
  //每个单词首字母大写
  capitalizeEveryWord(str) {
    return str.replace(/\b[a-z]/g, (char) => char.toUpperCase());
  },
  /*
   * 节流
   * options的默认值
   *  表示首次调用返回值方法时，会马上调用func；否则仅会记录当前时刻，当第二次调用的时间间隔超过wait时，才调用func。
   *  options.leading = true;
   * 表示当调用方法时，未到达wait指定的时间间隔，则启动计时器延迟调用func函数，若后续在既未达到wait指定的时间间隔和func函数又未被调用的情况下调用返回值方法，则被调用请求将被丢弃。
   *  options.trailing = true;
   * 注意：当options.trailing = false时，效果与上面的简单实现效果相同
   */
  throttle: function (func, wait, options) {
    var context, args, result;
    var timeout = null;
    var previous = 0;
    if (!options) options = {};
    var later = function () {
      previous = options.leading === false ? 0 : Date.now();
      timeout = null;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    };
    return function () {
      var now = Date.now();
      if (!previous && options.leading === false) previous = now;
      // 计算剩余时间
      var remaining = wait - (now - previous);
      context = this;
      args = arguments;
      // 当到达wait指定的时间间隔，则调用func函数
      // 精彩之处：按理来说remaining <= 0已经足够证明已经到达wait的时间间隔，但这里还考虑到假如客户端修改了系统时间则马上执行func函数。
      if (remaining <= 0 || remaining > wait) {
        // 由于setTimeout存在最小时间精度问题，因此会存在到达wait的时间间隔，但之前设置的setTimeout操作还没被执行，因此为保险起见，这里先清理setTimeout操作
        if (timeout) {
          clearTimeout(timeout);
          timeout = null;
        }
        previous = now;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      } else if (!timeout && options.trailing !== false) {
        // options.trailing=true时，延时执行func函数
        timeout = setTimeout(later, remaining);
      }
      return result;
    };
  },
  // 防抖
  debounce: function (func, wait, immediate) {
    // immediate默认为false
    var timeout, args, context, timestamp, result;

    var later = function () {
      // 当wait指定的时间间隔期间多次调用debounce返回的函数，则会不断更新timestamp的值，导致last < wait && last >= 0一直为true，从而不断启动新的计时器延时执行func
      var last = Date.now() - timestamp;

      if (last < wait && last >= 0) {
        timeout = setTimeout(later, wait - last);
      } else {
        timeout = null;
        if (!immediate) {
          result = func.apply(context, args);
          if (!timeout) context = args = null;
        }
      }
    };

    return function () {
      context = this;
      args = arguments;
      timestamp = Date.now();
      // 第一次调用该方法时，且immediate为true，则调用func函数
      var callNow = immediate && !timeout;
      // 在wait指定的时间间隔内首次调用该方法，则启动计时器定时调用func函数
      if (!timeout) timeout = setTimeout(later, wait);
      if (callNow) {
        result = func.apply(context, args);
        context = args = null;
      }
      return result;
    };
  },
  //生成唯一的id
  uniqueId() {
    return Number(Math.random().toString().substr(3) + Date.now()).toString(16);
  },
  // 生成id
  uuid(len = 8, radix = 16) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
    const value = [];
    let i = 0;
    radix = radix || chars.length;
    if (len) {
      for (i = 0; i < len; i++) value[i] = chars[0 | (Math.random() * radix)];
    } else {
      let r;
      value[8] = value[13] = value[18] = value[23] = '-';
      value[14] = '4';
      for (i = 0; i < 36; i++) {
        if (!value[i]) {
          r = 0 | (Math.random() * 16);
          value[i] = chars[i === 19 ? (r & 0x3) | 0x8 : r];
        }
      }
    }
    return value.join('');
  },
  //RGB到十六进制
  rgbToHex(r, g, b) {
    return ((r << 16) + (g << 8) + b).toString(16).padStart(6, '0');
  },
  /**
   * @method 比较两个对象或值是否完全相等
   * @param {Any}
   * @param {Any}
   * @returns {Boolean} 是否相等
   */
  equals(a, b) {
    if (a === b) return true;
    if (a instanceof Date && b instanceof Date) return a.getTime() === b.getTime();
    if (!a || !b || (typeof a != 'object' && typeof b !== 'object')) return a === b;
    if (a === null || a === undefined || b === null || b === undefined) return false;
    if (a.prototype !== b.prototype) return false;
    let keys = Object.keys(a);
    if (keys.length !== Object.keys(b).length) return false;
    return keys.every((k) => equals(a[k], b[k]));
  },
  /**
   * @method 处理排队时间
   * @param {min}  最小时长，分钟
   * @param {max}  最大时长，分钟
   * @param {step} 时间间隔
   * 输出结构为树形结构数据，具体展现可参考微信小程序
   */
  coverTime(min, max, step) {
    let arr = [];
    for (let i = min; i <= max; i = i + step) {
      let day = parseInt(i / 60 / 24) % 24;
      let h = parseInt(i / 60) % 24;
      let m = i % 60;
      if (!arr.length) {
        arr.push({
          value: day,
          label: day + '天',
          children: [
            {
              value: h,
              label: h + '小时',
              children: [
                {
                  value: m,
                  label: m + '分钟'
                }
              ]
            }
          ]
        });
        continue;
      }
      let lastDay = arr[arr.length - 1];
      let lastH = lastDay.children[lastDay.children.length - 1];
      let lastM = lastH.children[lastH.children.length - 1];
      if (lastDay.value === day) {
        if (lastH.value === h) {
          lastH.children.push({
            value: m,
            label: m + '分钟'
          });
        } else {
          lastDay.children.push({
            value: h,
            label: h + '小时',
            children: [
              {
                value: m,
                label: m + '分钟'
              }
            ]
          });
        }
      } else {
        arr.push({
          value: day,
          label: day + '天',
          children: [
            {
              value: h,
              label: h + '小时',
              children: [
                {
                  value: m,
                  label: m + '分钟'
                }
              ]
            }
          ]
        });
      }
    }
    return arr;
  },
  /**
   * @method 预约时间组件
   * @param {MINTIME}  最小时长
   * @param {MAXTIME}  最大时长
   * @param {nowText}  当前时间的替代文本
   * 输出结构为树形结构数据，具体展现可参考微信小程序
   */

  initDate(MAXTIME, MINTIME, nowText) {
    function dealWithMin(num) {
      const nums = [0, 10, 20, 30, 40, 50, 60];
      for (var i = 0; i < nums.length; i++) {
        if (num > nums[i] && num < nums[i + 1]) {
          num = nums[i + 1];
        } else if (num == num[i]) {
          num = nums[i];
        }
      }
      return num;
    }

    function getCurDate(date) {
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const nowYear = new Date().getFullYear();
      const nowMonth = new Date().getMonth() + 1;
      const nowDay = new Date().getDate();
      if (nowYear != year) {
        return year + '年' + month + '月' + day + '日';
      } else {
        if (month == nowMonth && nowDay == day) {
          return '今天';
        }
        if (month == nowMonth && day - nowDay == 1) {
          return '明天';
        }
        return month + '月' + day + '日';
      }
    }
    const INTERVAL = 10;
    let arr = [];
    let now = new Date();
    let nowHour = now.getHours();
    let nowMinutes = now.getMinutes();
    let nowYear = now.getFullYear();
    let roundMinutes = dealWithMin(nowMinutes);
    let end = Date.parse(new Date(MAXTIME * 1000 * 60 + Date.parse(now)));
    let leftSeconds = MAXTIME * 60;
    let days = Math.ceil(leftSeconds / (60 * 24 * 60));
    let minDay = Math.floor(MINTIME / 60 / 24);
    let minLength = Math.floor((MINTIME - minDay * 24 * 60) / 60);
    let minLeftMin = Math.ceil(MINTIME % 60);
    let endHour = new Date(end).getHours();
    let endMinutes = new Date(end).getMinutes();
    days =
      nowHour + Math.floor(leftSeconds / 3600) >= 24 && days == 1
        ? days + Math.ceil((Math.floor(leftSeconds / 3600) - (24 - nowHour)) / 24)
        : days + 1;
    for (let i = 1; i <= days; i++) {
      let curDate = new Date(
        Date.parse(now) + (i - 1 + (i == 1 ? 0 : minDay)) * 60 * 60 * 24 * 1000
      );
      let that = this;
      arr[i - 1] = {
        label: getCurDate(curDate),
        value: curDate.getFullYear() + '/' + (curDate.getMonth() + 1) + '/' + curDate.getDate(),
        children: (function () {
          let minutes = [];
          let hourEnd = i == days ? endHour + 1 : 24;
          for (
            let m1 = 0,
              m =
                i == 1
                  ? minLeftMin + roundMinutes >= 60
                    ? nowHour + minLength + 1
                    : nowHour + minLength
                  : i == 2 && minDay >= 1
                  ? minLength
                  : i == 2 && minLength + nowHour > 24
                  ? Math.abs(24 - (minLength + nowHour))
                  : 0;
            m < hourEnd;
            m1++, m++
          ) {
            minutes[m1] = {
              label: m + '时',
              value: m,
              children: (function () {
                let seconds = [];
                for (
                  let s1 = 0,
                    s =
                      s1 == 0 && m1 == 0 && i == 1
                        ? dealWithMin(nowMinutes) > 50
                          ? 0
                          : dealWithMin(nowMinutes)
                        : 0;
                  s < 60;
                  s += INTERVAL, s1++
                ) {
                  seconds[s1] = {
                    label: s + '分',
                    value: s
                  };
                }
                return seconds;
              })()
            };
          }
          return minutes;
        })()
      };
    }
    arr[0].children.unshift({
      label: nowText,
      value: Tool.dateFormat(new Date(), 'YYYY/MM/dd  hh:mm:ss'),
      children: [
        {
          label: '',
          value: ''
        }
      ]
    });
    return arr;
  }
};
