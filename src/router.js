import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

export default new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: () => import('./views/Main.vue'),
            children: [
                {path: '', name: 'home', component: () => import('./views/Doshhome.vue')},
                {path: 'information', name: 'information', component: () => import('./views/Information.vue')},
                {path: 'usercenter', name: 'usercenter', component: () => import('./views/users/UserCenter.vue')},
                {path: 'menucenter', name: 'menucenter', component: () => import('./views/menus/MenuCenter.vue')},
                {path: 'rolecenter', name: 'rolecenter', component: () => import('./views/roles/RoleCenter.vue')},
                {path: 'editpwd', name: 'editpwd', component: () => import('./views/EditPassword.vue')},
                {path: 'treetable', name: 'treetable', component: () => import('./components/TreeTable.vue')}
            ]
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('./views/Login.vue'),
            children: []
        }
    ]
})
