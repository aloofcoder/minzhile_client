<template>
    <div class="layout-app">
        <transition name="menu-fade">
            <div class="layout-sider" v-if="showMenu">
                <div class="layout-logo">
                    <a href="javascript:void(0);" @click="patchLogo">
                        <!--<img src="../assets/logo.png" width="35" style="vertical-align: middle;" alt="">-->
                        民之乐权限系统
                    </a>
                </div>
                <div class="layout-menu">
                    <LMenu :menus="menus" @pitch-menu="addNav"></LMenu>
                </div>
            </div>
        </transition>
        <div class="layout-main">
            <LHeader @hideMenu="hideMenu" :data="managerInfo" @pitch-menu="addNav"></LHeader>
            <LNavMenu :tabs="tabs"></LNavMenu>
            <div class="layout-content">
                <div class="layout layout-sub-page">
                    <router-view></router-view>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import LMenu from '../components/Menu'
    import LHeader from '../components/Header'
    import LNavMenu from '../components/NavMenu'
    export default {
        name: 'Main',
        components: {
            LMenu,
            LHeader,
            LNavMenu
        },
        data () {
            return {
                showMenu: true,
                menus: [
                    {
                        name: '用户管理',
                        link: '/usercenter',
                        icon: 'ios-contact',
                        children: []
                    },
                    {
                        name: '资讯管理',
                        link: 'information',
                        icon: 'ios-images',
                        children: []
                    },
                    {
                        name: '菜单管理',
                        link: '/menucenter',
                        icon: 'md-menu',
                        children: []
                    },
                    {
                        name: '角色管理',
                        link: '/rolecenter',
                        icon: 'ios-people-outline',
                        children: []
                    },
                    {
                        name: '测试管理',
                        link: '/treetable',
                        icon: 'ios-people-outline',
                        children: []
                    }
                ],
                tabs: [],
                managerInfo: {}
            }
        },
        created () {
          // 检测是否已登录
            this.checkLogin()
        },
        methods: {
            checkLogin () {
                this.$http.get('login/check', {}).then((res) => {
                    if (res.state === 0) {
                        this.managerInfo = {... res.data}
                    }  else {
                        this.$Message.warning(res.message)
                    }
                }).catch((err) => {
                    this.$Message.error(err.message)
                })
            },
            patchLogo () {
              this.$router.push('/')
            },
            hideMenu () {
                this.showMenu = !this.showMenu
            },
            addNav(menuInfo) {
                !this.tabs.includes(menuInfo) && this.tabs.push(menuInfo)
                this.tabs.forEach((item) => {
                    this.$set(item, 'artive', false)
                })
                menuInfo.artive = true
            }
        }
    }
</script>
