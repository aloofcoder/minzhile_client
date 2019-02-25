<template>
    <div class="layout-app">
        <div class="layout-page">
            <LMenu :menus="menus" @patch-tree="patchTree"></LMenu>
        </div>
        <div class="layout-page">
            {{itemName}}
        </div>
    </div>
</template>
<script>
    import LMenu from '../components/Tree'
    export default {
        name: 'Information',
        components: {
            LMenu
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
                itemName: ''
            }
        },
        methods: {
            patchTree (item) {
                this.itemName = item.name
            }
        }
    }
</script>
