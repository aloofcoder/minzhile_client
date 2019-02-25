<template>
    <ul class="mzl-menu">
        <li class="mzl-tree-item" v-for="menu in menus" :key="menu.name" @click.stop="closeTag(menu)">
            <a href="javascript:void(0);" :style="{paddingLeft: plValue * index + 'px'}">
                <Icon :type="getIcon(menu)"/>
                <span>&nbsp; {{menu.name}}</span>
            </a>
            <LeftTree @patch-tree="patchTree" v-if="menu.open && menu.children.length > 0" :menus="menu.children" :index="index + 1"></LeftTree>
        </li>
    </ul>
</template>
<script>
    import LeftTree from './Tree'
    export default {
        name: 'LeftTree',
        component: {
            LeftTree
        },
        data () {
            return {
                plValue: 16,
                currentMenuName: ''
            }
        },
        props: {
            menus: {
                type: Array,
                default: function () {
                    return []
                }
            },
            index: {
                type: Number,
                default: 1
            }
        },
        methods: {
            closeTag (menu) {
                let menuOpen = menu.open
                this.menus.forEach((item) => {
                    item.open = false
                    item.artive = false
                })
                menu.artive = true
                // 记录点击的菜单
                if (menu.children.length > 0) {
                    menu.open = !menuOpen
                } else {
                    this.$emit('patch-tree', menu)
                }
            },
            getIcon(menu) {
                return menu.open ? 'ios-folder-open-outline' : menu.children.length <= 0 ? 'ios-paper-outline' : 'ios-folder-outline'
            },
            patchTree (menu) {
                this.$emit('patch-tree', menu)
            }
        },
        mounted () {
            this.menus.length > 0 && this.menus.forEach((item) => {
                this.$set(item, 'artive', false)
                if (item.children.length > 0) {
                    this.$set(item, 'open', false)
                }
            })
        },
        computed: {
            getPadding () {
                return `${24 * (this.index + 1)}px`
            }
        }
    }
</script>
<style>
    .mzl-tree-item {
        list-style-type: none;
    }
</style>
