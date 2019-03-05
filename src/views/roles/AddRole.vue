<template>
    <div class="layout-page pl-20">
        <div style="padding: 5px 0 15px 0;">
            <h2>{{formItem.id ? '修改' : '添加'}}角色信息</h2>
        </div>
        <Form :model="formItem" :rules="ruleValidate" ref="ruleValidate" label-position="top">
            <Row>
                <Col span="8">
                    <FormItem label="角色名称" prop="roleName">
                        <Input style="width: 240px" v-model="formItem.roleName" placeholder="请输入角色名称"></Input>
                    </FormItem>
                </Col>
                <Col span="8">
                    <FormItem label="授权" prop="roleName">
                        <Input style="width: 240px" v-model="formItem.menuStr" placeholder="请选择角色权限"></Input>
                    </FormItem>
                </Col>
                <Col span="8">
                    <FormItem label="备注" prop="roleName">
                        <Input style="width: 240px" v-model="formItem.remark" placeholder="请输入备注"></Input>
                    </FormItem>
                </Col>
            </Row>
            <Row>
                <Button type="success" @click="ok"><Icon type="md-film" /> &nbsp;提交</Button>&nbsp;
                <Button type="default" @click="cancel"><Icon type="ios-backspace" /> &nbsp;返回</Button>
            </Row>
        </Form>
    </div>
</template>
<script>
    export default {
        name: 'AddRole',
        data () {
            return {
                formItem: {
                    roleName: null,
                    menuStr: null,
                    remark: null
                },
                ruleValidate: {
                    managerNum: [
                        { required: true, message: '角色名不能为空！', trigger: 'blur' }
                    ]
                },
            }
        },
        props: {
            roleInfo: {
                type: Object,
                default: function () {
                    return {}
                }
            }
        },
        created () {
            this.formItem = Object.assign({}, this.formItem, this.roleInfo)
        },
        methods: {
            ok () {
                this.$refs['ruleValidate'].validate((valid) => {
                    if (valid) {
                        console.log(valid)
                    }
                })
            },
            cancel () {
                this.$emit('back')
            }
        }
    }
</script>
