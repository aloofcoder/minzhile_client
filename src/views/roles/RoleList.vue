<template>
    <div class="layout-page">
        <Row>
            <Form :model="roleCondition" inline>
                <FormItem>
                    <Input v-model="roleCondition.roleName" placeholder="请输入角色名"></Input>
                </FormItem>
            </Form>
        </Row>
        <Row>
            <Button type="error" icon="ios-trash-outline" @click="handleBatchDel()">批量删除</Button>&nbsp;
            <Button type="success" icon="ios-search" @click="handleSearch()">查询</Button>&nbsp;
            <Button type="primary" icon="md-add" @click="handleAddRole()">添加</Button>&nbsp;
        </Row>
        <Row class="mt-10">
            <Table :loading="loading" :columns="columns" :data="roleData" style="width: 100%;" @on-selection-change="handleSelectAll"></Table>
        </Row>
        <Row class="mt-10">
            <Page :total="pageObject.totalRow" :page-size="pageObject.pageSize" :current="pageObject.currentPage" show-total @on-change="handleSearch" />
        </Row>
    </div>
</template>
<script>
    export default {
        name: 'RoleList',
        data () {
            return {
                roleCondition: {
                    roleName: ''
                },
                pageObject: {
                    currentPage: null,
                    pageSize: null,
                    totalPage: null,
                    totalRow: null
                },
                loading: true,
                selectedArr: [],
                columns: [
                    {
                        type: 'selection',
                        width: 50,
                        align: 'center'
                    },
                    {
                        title: '角色名称',
                        key: 'roleName'
                    },
                    {
                        title: '状态',
                        key: 'valid',
                        render: (h, params) => {
                            return h('p', {}, params.row.valid === 0 ? '有效': '无效')
                        }
                    },
                    {
                        title: '备注',
                        key: 'remark',
                        render: (h, params) => {
                            return h('p', {}, params.row.remark ? params.row.remark : '无')
                        }
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 160,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small',
                                        ghost: 'ghost'
                                    },
                                    on: {
                                        click: () => {
                                            this.handleEditRole(params.row)
                                        }
                                    }
                                }, '授权'),
                                h('Button', {
                                    props: {
                                        type: 'success',
                                        size: 'small',
                                        ghost: 'ghost'
                                    },
                                    on: {
                                        click: () => {
                                            this.handleEditRole(params.row)
                                        }
                                    }
                                }, '修改'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small',
                                        ghost: 'ghost'
                                    },
                                    on: {
                                        click: () => {
                                            this.handleDelRole(params.row)
                                        }
                                    }
                                }, '删除')
                            ]);
                        }
                    }
                ],
                roleData: []
            }
        },
        created () {
          this.handleSearch()
        },
        methods: {
            handleBatchDel () {
                // 批量删除角色信息
                if (this.selectedArr.length === 0) {
                    this.$Message.error('请选择您要删除的用户信息！')
                    return
                }
            },
            handleSearch(page = 1) {
                this.$http.get('roles', {currentPage: page, ... this.roleCondition}).then((res) => {
                    if (res.state === 0) {
                        this.loading = false
                        this.roleData = [...res.data.list]
                        this.pageObject = {...res.data.pageObject}
                    } else {
                        this.$Message.warning(res.message)
                    }
                }).catch((err) => {
                    this.$Message.error(err.message)
                })
            },
            handleAddRole () {
                this.$emit('switch-page', {page: 'add-role', roleInfo: {}})
            },
            handleEditRole (param) {
                this.$emit('switch-page', {page: 'add-role', roleInfo: param})
            },
            handleDelRole (param) {
                this.$Modal.confirm({
                    title: '提醒',
                    content: `<p>您将要删除角色${param.managerName}, 请确认！</p>`,
                    onOk: () => {
                    }
                });
            },
            handleSelectAll (selection) {
                this.selectedArr = [... selection]
            }
        }
    }
</script>
