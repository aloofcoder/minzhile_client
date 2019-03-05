<template>
    <div class="layout-page">
        <Row>
            <Form :model="menuCondition" inline>
                <FormItem>
                    <Input v-model="menuCondition.menuName" placeholder="请输入菜单名称"></Input>
                </FormItem>
            </Form>
        </Row>
        <Row>
            <Button type="error" icon="ios-trash-outline" @click="handleBatchDel()">批量删除</Button>&nbsp;
            <Button type="success" icon="ios-search" @click="handleSearch()">查询</Button>&nbsp;
            <Button type="primary" icon="md-add" @click="handleAddRole()">添加</Button>&nbsp;
        </Row>
        <Row class="mt-10">
            <Table :loading="loading" :columns="columns" :data="menuData" style="width: 100%;" @on-selection-change="handleSelectAll"></Table>
        </Row>
    </div>
</template>
<script>
    export default {
        name: 'MenuList',
        data () {
            return {
                menuCondition: {
                    menuName: ''
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
                        type: 'expand',
                        width: 50,
                        render: (h, params) => {
                            return h('div', {
                                props: {
                                    row: params.row
                                }
                            })
                        }
                    },
                    {
                        title: '菜单名称',
                        key: 'menuName'
                    },
                    {
                        title: '请求路径',
                        key: 'menuUrl'
                    },
                    {
                        title: '类型',
                        key: 'menuType',
                        render: (h, params) => {
                            return h('p', {}, params.row.menuType === 0 ? '项目' : params.row.menuType === 1 ? '菜单' : '按钮')
                        }
                    },
                    {
                      title: '上级菜单',
                      key: 'parentName'
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
                menuData: []
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
                this.$http.get('menus', {currentPage: page}).then((res) => {
                    if (res.state === 0) {
                        this.loading = false
                        this.menuData = [...res.data]
                        this.menuData.forEach((item) => {
                            this.$set(item, 'showChildren', true)
                        })
                    } else {
                        this.$Message.warning(res.message)
                    }
                }).catch((err) => {
                    this.$Message.error(err.message)
                })
            },
            handleAddRole () {
                this.$emit('switch-page', {page: 'add-menu', menuInfo: {}})
            },
            handleEditRole (param) {
                this.$emit('switch-page', {page: 'add-menu', menuInfo: param})
            },
            handleDelRole (param) {
                this.$Modal.confirm({
                    title: '提醒',
                    content: `<p>您将要删除菜单${param.managerName}, 请确认！</p>`,
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
