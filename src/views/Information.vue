<template>
    <div class="layout-page">
        <TreeTable :menu-data="menuData"></TreeTable>
    </div>
</template>
<script>
    import LMenu from '../components/Tree'
    import TreeTable from '../components/TreeTable'
    export default {
        name: 'Information',
        components: {
            LMenu,
            TreeTable
        },
        data () {
            return {
                menus: [
                    {
                        name: '首页',
                        link: '/',
                        icon: 'ios-home',
                        children: []
                    },
                    {
                        name: '资讯系统',
                        link: 'information',
                        icon: 'ios-images',
                        children: [
                            {
                                name: '查看咨讯',
                                link: '',
                                icon: 'ios-images',
                                children: []
                            },
                            {
                                name: '修改咨讯',
                                link: '',
                                icon: 'ios-images',
                                children: []
                            }
                        ]
                    },
                    {
                        name: '用户中心',
                        link: '/usercenter',
                        icon: 'ios-contact',
                        children: []
                    },
                    {
                        name: '菜单中心',
                        link: '/menucenter',
                        icon: 'md-menu',
                        children: []
                    }
                ],
                itemName: '',
                menuData: []
            }
        },
        created () {
          this.handleSearch()
        },
        methods: {
            handleSearch(page = 1) {
                this.$http.get('menus', {currentPage: page}).then((res) => {
                    if (res.state === 0) {
                        this.menuData = [...res.data]
                    } else {
                        this.$Message.warning(res.message)
                    }
                }).catch((err) => {
                    this.$Message.error(err.message)
                })
            },
            patchTree (item) {
                this.itemName = item.name
            }
        }
    }
</script>
