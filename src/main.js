import Vue from 'vue'
import ElementUI from 'element-ui';
import Router from 'vue-router'
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'

Vue.config.productionTip = false

Vue.use(ElementUI);
Vue.use(Router)

const Foo = { template: '<div>foo</div>' }
const Bar = { template: '<div>bar</div>' }

// 2. 定义路由
// 每个路由应该映射一个组件。 其中"component" 可以是
// 通过 Vue.extend() 创建的组件构造器，
// 或者，只是一个组件配置对象。
// 我们晚点再讨论嵌套路由。
const routes = [
  { path: '/foo', component: Foo },
  { path: '/bar', component: Bar }
]

new Vue({
  render: h => h(App),
  computed: {
    ViewComponent () {
      return routes[this.currentRoute] 
    }
  },

}).$mount('#app')
