<template>
    <div class="layout-page">
        <Row>
            <Col :xs="24" :sm="8" :md="5" :lg="4" class-name="mt-5">
                <Input v-model="model.managerNum" size="large" class="pr-5" placeholder="管理员账号"/>
            </Col>
            <Col :xs="24" :sm="8" :md="5" :lg="4" class-name="mt-5">
                <Input v-model="model.managerName" size="large" class="pr-5" placeholder="管理员姓名" />
            </Col>
            <Col :xs="24" :sm="8" :md="5" :lg="4" class-name="mt-5">
                <Input v-model="model.managerMobile" size="large" class="pr-5" placeholder="管理员电话" />
            </Col>
        </Row>
        <Row class="mt-10">
            <Button type="warning" icon="ios-trash-outline" @click="handleBatchDel()">批量删除</Button>&nbsp;
            <Button type="success" icon="ios-search" @click="handleSearch()">查询</Button>&nbsp;
            <Button type="primary" icon="md-add" @click="handleAddManager()">添加</Button>&nbsp;
        </Row>
        <Row class="mt-10">
            <Table :loading="loading" :columns="columns" :data="userData" style="width: 100%;" @on-selection-change="handleSelectAll"></Table>
        </Row>
        <Row class="mt-10 text-center">
            <Page :total="pageObject.totalRow" :page-size="pageObject.pageSize" :current="pageObject.currentPage" show-total @on-change="handleSearch" />
        </Row>
    </div>
</template>
<script>
    export default {
        name: 'UserCenter',
        data () {
            return {
                model: {
                    managerNum: '',
                    managerName: '',
                    managerMobile: ''
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
                        title: '账号',
                        key: 'managerNum'
                    },
                    {
                        title: '姓名',
                        key: 'managerName'
                    },
                    {
                        title: '密码',
                        key: 'managerPwd'
                    },
                    {
                        title: '电话',
                        key: 'managerMobile'
                    },
                    {
                        title: '邮箱',
                        key: 'managerEmail'
                    },
                    {
                        title: '状态',
                        key: 'valid',
                        render: (h, params) => {
                            return h('p', {}, params.row.valid === 0 ? '有效' : '无效')
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
                                        type: 'success',
                                        size: 'small',
                                        ghost: 'ghost'
                                    },
                                    on: {
                                        click: () => {
                                            this.handleEditManager(params.row)
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
                                            this.handleDelManager(params.row)
                                        }
                                    }
                                }, '删除')
                            ]);
                        }
                    }
                ],
                userData: []
            }
        },
        created() {
            this.handleSearch()
        },
        methods: {
            handleSearch(page = 1) {
                this.$http.get('managers', {currentPage: page, ... this.model}).then((res) => {
                    if (res.state === 0) {
                        this.loading = false
                        this.userData = [...res.data.list]
                        this.pageObject = {...res.data.pageObject}
                    } else {
                        this.$Message.warning(res.message)
                    }
                }).catch((err) => {
                    this.$Message.error(err.message)
                })
            },
            handleAddManager () {
                this.$emit('switch-page', {page: 'add-user', managerInfo: {}})
            },
            handleEditManager (param) {
                this.$emit('switch-page', {page: 'add-user', managerInfo: param})
            },
            handleDelManager (param) {
                this.$Modal.confirm({
                    title: '提醒',
                    content: `<p>您将要删除管理员${param.managerName}, 请确认！</p>`,
                    onOk: () => {
                        this.$http.delete('managers', {id: param.id}).then((res) => {
                            if (res.state === 0) {
                                this.handleSearch()
                                this.$Message.success('删除管理员信息成功！')
                            } else {
                                this.$Message.error(res.message)
                            }
                        }).catch(() => {
                            this.$Message.error('服务异常，请稍后重试！')
                        })
                    }
                });
            },
            handleBatchDel () {
                // 批量删除管理员信息
                if (this.selectedArr.length === 0) {
                    this.$Message.error('请选择您要删除的用户信息！')
                    return
                }
                this.$Modal.confirm({
                    title: '提醒',
                    content: `<p>您将要删除${this.selectedArr.length}条管理员, 请确认！</p>`,
                    onOk: () => {
                        let selectedStr = ''
                        this.selectedArr.forEach((item, $index) => {
                            if ($index === 0) {
                                selectedStr += item.id
                            } else {
                                selectedStr += `,${item.id}`
                            }
                        })
                        this.$http.delete('managers/batch', {ids: selectedStr}).then((res) => {
                            if (res.state === 0) {
                                this.handleSearch()
                                this.$Message.success('批量删除管理员信息成功！')
                            } else {
                                this.$Message.error(res.message)
                            }
                        }).catch(() => {
                            this.$Message.error('服务异常，请稍后重试！')
                        })
                    }
                })
            },
            handleSelectAll (selection) {
                this.selectedArr = [... selection]
            }
        }
    }
</script>
