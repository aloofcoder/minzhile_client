import Vue from 'vue'
import App from './App.vue'
import router from './router'
import http from './plugins/axios'
import iView from 'iview'
import 'iview/dist/styles/iview.css';    // 使用 CSS
import './less/minzhile.less'
Vue.prototype.$http = http
Vue.config.productionTip = false
Vue.use(iView)

// 组件注册
// 基础查询组件
Vue.component('common-table', (resolve) => { require(['./components/CommonTable'], resolve)})
// 管理员信息列表
Vue.component('user-list', (resolve) => { require(['./views/users/UserList'], resolve)})
// 添加管理员信息
Vue.component('add-user', (resolve) => { require(['./views/users/AddUser'], resolve)})
// 角色信息列表
Vue.component('role-list', (resolve) => { require(['./views/roles/RoleList'], resolve)})
// 添加角色信息
Vue.component('add-role', (resolve) => { require(['./views/roles/AddRole'], resolve)})
// 菜单信息列表
Vue.component('menu-list', (resolve) => { require(['./views/menus/MenuList'], resolve)})
new Vue({
    router,
    render: h => h(App),
}).$mount('#app')
