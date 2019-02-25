<template>
    <div class="layout-page pl-20">
        <div style="padding: 5px 0 15px 0;">
            <h2>{{formItem.id ? '修改' : '添加'}}管理员信息</h2>
        </div>
        <Form :model="formItem" :rules="ruleValidate" ref="ruleValidate" label-position="top">
        <Row>
            <Col span="16">
                <Row>
                    <Col span="12">
                        <FormItem label="管理员账号" prop="managerNum">
                            <Input style="width: 240px" :disabled="formItem.id ? true : false" v-model="formItem.managerNum" placeholder="请输入管理员账号"></Input>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="管理员姓名" prop="managerName">
                            <Input style="width: 240px" v-model="formItem.managerName" placeholder="请输入管理员姓名"></Input>
                        </FormItem>
                    </Col>
                </Row>

                <Row>
                    <Col span="12">
                        <FormItem v-if="!formItem.id" label="管理员密码" prop="managerPwd">
                            <Input style="width: 240px" type="password" v-model="formItem.managerPwd" placeholder="请输入管理员密码"></Input>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem v-if="!formItem.id" label="确认管理员密码" prop="checkPwd">
                            <Input style="width: 240px" type="password" v-model="formItem.checkPwd" placeholder="请确认管理员密码"></Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                        <FormItem label="管理员角色">
                            <Input style="width: 240px" v-model="formItem.managerRole" placeholder="请输入管理员角色"></Input>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="管理员电话">
                            <Input style="width: 240px" v-model="formItem.managerMobile" placeholder="请输入管理员电话"></Input>
                        </FormItem>
                    </Col>
                </Row>

                <Row>
                    <Col span="12">
                        <FormItem label="管理员邮箱">
                            <Input style="width: 240px" v-model="formItem.managerEmail" placeholder="请输入管理员邮箱"></Input>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="备注">
                            <Input style="width: 240px" v-model="formItem.remark" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入备注"></Input>
                        </FormItem>
                    </Col>
                </Row>
                <FormItem>
                    <Row>
                        <Button type="success" @click="ok"><Icon type="md-film" /> &nbsp;提交</Button>&nbsp;
                        <Button type="default" @click="cancel"><Icon type="ios-backspace" /> &nbsp;返回</Button>
                    </Row>
                </FormItem>
            </Col>
            <Col span="8">
                <FormItem label="头像">
                    <img :src="getAvatar" width="180" style="border-radius: 500rem;" alt="">
                </FormItem>
                <Button type="default" @click="handleChangeAvatar"><Icon type="ios-cloud-upload-outline" /> 更换头像</Button>
            </Col>
        </Row>
        </Form>
    </div>
</template>
<script>
    export default {
        name: 'AddUser',
        data () {
            return {
                formItem: {
                    managerNum: null,
                    managerName: null,
                    managerPwd: null,
                    checkPwd: null,
                    managerRole: null,
                    managerMobile: null,
                    managerEmail: null,
                    managerAvatar: null,
                    remark: null
                },
                ruleValidate: {
                    managerNum: [
                        { required: true, message: '管理员账号不能为空！', trigger: 'blur' }
                    ],
                    managerPwd: [
                        { required: true, message: '管理员密码不能为空！', trigger: 'blur' }
                    ],
                    checkPwd: [
                        { required: true, message: '请再输入一次管理员密码！', trigger: 'blur' },
                        {validator: (rule, value, callback) => {if(value !== this.formItem.managerPwd) {callback(new Error('两次密码不一致！'))} else {callback();}}, trigger: 'blur'}
                    ],
                    managerName: [
                        { required: true, message: '管理员姓名不能为空！', trigger: 'blur' }
                    ],
                    managerMobile: [
                        { required: true, message: '管理员电话不能为空！', trigger: 'blur' }
                    ],
                    managerEmail: [
                        { required: true, message: '管理员邮箱不能为空！', trigger: 'blur' }
                    ],
                },
            }
        },
        props: {
            managerInfo: {
                type: Object,
                default: function () {
                    return {}
                }
            }
        },
        created () {
            this.formItem = Object.assign({}, this.formItem, this.managerInfo)
        },
        methods: {
            ok () {
                this.$refs['ruleValidate'].validate((valid) => {
                    if (valid) {
                        if (this.formItem.id) {
                            this.$http.put('managers', this.formItem).then((res) => {
                                if (res.state === 0) {
                                    this.$Message.success('修改管理员信息成功！')
                                    this.$emit('switch-page', {page: 'user-list'})
                                } else {
                                    this.$Message.error(res.message)
                                }
                            }).catch(() => {
                                this.$Message.error('服务异常，请稍后重试！')
                            })
                        } else {
                            this.$http.post('managers', this.formItem).then((res) => {
                                if (res.state === 0) {
                                    this.$Message.success('添加管理员信息成功！')
                                    this.$emit('switch-page', {page: 'user-list'})
                                } else {
                                    this.$Message.error(res.message)
                                }
                            }).catch(() => {
                                this.$Message.error('服务异常，请稍后重试！')
                            })
                        }
                    }
                })
            },
            cancel () {
                this.$emit('back')
            },
            handleChangeAvatar () {
                this.$Message.info('敬请期待！')
            }
        },
        computed: {
            getAvatar () {
                let avatarImg = this.formItem.managerAvatar ? this.formItem.managerAvatar : 'me.jpeg'
                return require(`../../assets/${avatarImg}`)
            }
        }
    }
</script>
