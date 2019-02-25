<template>
    <div class="layout-header">
        <div class="layout-header-menu">
            <Icon type="ios-menu" class="layout-menu-check" @click="hideMenu()"></Icon>
        </div>
        <div class="layout-admin">
            <div class="layout-admin-info">
                <img :src="getAvatar(data.managerAvatar)" width="30" style="vertical-align: middle;border-radius: 500rem;" alt="">&nbsp;
                <a href="#">{{data.managerName}}</a> <Icon type="md-arrow-dropdown" />
                <div class="layout-admin-detail">
                    <a href="javascript:void(0);" @click.stop="editPwd(data)">
                        <Icon type="ios-settings" /> &nbsp;
                        修改密码
                    </a>
                    <a href="javascript:void(0);" @click.stop="loginOut">
                        <Icon type="md-power" /> &nbsp;
                        退出
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'Header',
        data () {
            return {
                model: {
                    managerName: null,
                    managerAvatar: null
                }
            }
        },
        props: {
          data: {
              type: Object,
              default: function () {
                  return {}
              }
          }
        },
        created () {
            this.model = Object.assign({}, this.model, this.data)
        },
        methods: {
            getAvatar (param) {
                let avatarInfo = param ? param : 'me.jpeg'
                return require(`../assets/${avatarInfo}`)
            },
            hideMenu () {
                this.$emit('hideMenu')
            },
            editPwd () {
                let menu = {
                    artive: true,
                    icon: '',
                    link: '/editpwd',
                    name: '修改密码',
                    open: false
                }
                this.$emit('pitch-menu', menu)
                this.$router.push({name: 'editpwd', params: {managerInfo: this.data}})
            },
            loginOut() {
                window.localStorage.setItem("authorization", "")
                this.$router.push("/login")
                this.$Message.success("登出成功！")
            }
        }
    }
</script>
