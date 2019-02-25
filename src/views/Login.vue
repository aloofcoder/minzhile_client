<template>
    <div class="layout login-container">
        <div class="login-header">
            <div class="login-logo">
                <img src="../assets/logo.png" width="45" style="vertical-align: middle;" alt="">
                &nbsp;
                <h1 style="display: inline-block;line-height: 50px;">民之乐权限管理系统</h1>
            </div>
        </div>
        <div class="login-content">
            <div class="login-form">
                <Form :model="model">
                    <h2>登录</h2>
                    <p v-if="error" class="mt-5 login-msg">{{errorMsg}}</p>
                    <FormItem style="margin: 0; margin-top: 5px;">
                        <Input v-model="model.managerNum" size="large" placeholder="请输入登录账号"></Input>
                    </FormItem>
                    <FormItem style="margin: 0; margin-top: 5px;">
                        <Input v-model="model.managerPwd" type="password" size="large" placeholder="请输入登录密码" @on-keyup.enter="handleLogin"></Input>
                    </FormItem>
                    <FormItem class="mt-10">
                        <Button type="primary" style="width: 200px;" size="large" @click="handleLogin">登录</Button>
                    </FormItem>
                    <div class="login-operate">
                        <a href="#">
                            <input id="rememberme" type="checkbox" style="width: 16px;height: 16px; display: inline-block;vertical-align: middle;margin-bottom: 2px;">
                            <label for="rememberme"> 记住我</label>
                        </a>
                        <a href="#">注册<span class="iconfont icon-right"></span></a>
                    </div>
                </Form>
            </div>
        </div>
        <div class="login-footer">
            <p class="text-center mt-20">Copyright <img src="../assets/copyright.png" width="12" style="vertical-align: middle;"/> 2019 民之乐权限管理系统</p>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'login',
        data () {
            return {
                model: {
                    managerNum: '',
                    managerPwd: '',
                    randomCode: ''
                },
                error: false,
                errorMsg: '',
                keyUp: false
            }
        },
        methods: {
            handleLogin () {
                if (!this.model.managerNum) {
                    this.error = true
                    this.errorMsg = '登录账号不能为空！'
                    return
                }
                if (!this.model.managerPwd) {
                    this.error = true
                    this.errorMsg = '登录密码不能为空！'
                    return
                }
                let param = {
                    managerNum: this.model.managerNum,
                    managerPwd: this.model.managerPwd
                }
                if (this.keyUp) {
                    return
                }
                this.keyUp = true
                this.$http.post('login', param).then((res) => {
                    this.keyUp = false
                    if (res.state === 0) {
                        this.$router.push('/')
                        this.$Message.success('登录成功！')
                    } else {
                        this.$Message.warning(res.message)
                    }
                }).catch((err) => {
                    this.keyUp = false
                    this.$Message.error(err.message)
                })
            }
        }
    }
</script>
