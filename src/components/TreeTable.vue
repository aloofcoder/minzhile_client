<template>
    <Table :columns="columns" :data="menuData" :show-header=hasheader></Table>
</template>
<script>
    import TreeTable from './TreeTable'
    export default {
        name: 'TreeTable',
        component: {
          TreeTable
        },
        props: {
            hasheader: {
                type: Boolean,
                default: true
            },
            menuData: {
                type: Array,
                default: function () {
                    return []
                }
            }
        },
        data () {
            return {
                columns: [
                    {
                        type: 'selection',
                        width: 50,
                        align: 'center'
                    },
                    {
                        type: 'expand',
                        width: 10,
                        render: (h, params) => {
                            return h(TreeTable, {
                                props: {
                                    hasheader: false,
                                    menuData: params.row.children
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

                                        }
                                    }
                                }, '删除')
                            ]);
                        }
                    }
                ]
            }
        }
    }
</script>
<style>
    .ivu-table-expanded-cell {
        padding: 0 !important;
    }

    .ivu-table-expanded-cell div {
        border: 0 !important;
    }
</style>
