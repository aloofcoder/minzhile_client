<template>
    <ul class="mzl-menu">
        <li v-for="menu in menus" :key="menu.name" class="mzl-menu-item" @click.stop="closeTag(menu)">
            <router-link :to="menu.link" :style="{paddingLeft: plValue * index + 'px'}" :class="['mzl-menu-pd', menu.artive && menu.children.length <= 0 ? 'mzl-menu-item-artive': '']">
                <Icon :type="menu.icon" class="mzl-menu-icon" />
                <span>&nbsp; {{menu.name}}</span>
            </router-link>
            <LMenu v-if="menu.open && menu.children.length > 0" @pitch-menu="pitchMenu" :menus="menu.children" :index="index + 1"></LMenu>
        </li>
    </ul>
</template>
<script>
    import LMenu from './Menu'
    export default {
        name: 'LMenu',
        component: {
            LMenu
        },
        data () {
            return {
                plValue: 16
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
            pitchMenu (menu) {
                this.$emit('pitch-menu', menu)
            },
            closeTag (menu) {
                if (menu.children.length <= 0) {
                    this.menus.length > 0 && this.menus.forEach((item) => {
                        this.$set(item, 'artive', false)
                        this.$set(item, 'open', false)
                    })
                }
                let menuOpen = menu.open
                // 记录点击的菜单
                if (menu.children.length > 0) {
                    menu.open = !menuOpen
                } else {
                    this.$emit('pitch-menu', menu)
                }
            }
        },
        mounted () {
            this.menus.length > 0 && this.menus.forEach((item) => {
                this.$set(item, 'artive', false)
                this.$set(item, 'open', false)
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
    .mzl-menu {
        width: 100%;
        position: relative;
    }

    .mzl-menu-item {
        font-size: 14px;
        border-top: 1px solid #1C2B36;
    }

    .mzl-menu-item a {
        display: inline-block;
        width: 100%;
        box-sizing: border-box;
        color: white;
        text-decoration: none;
        border-left: 4px solid #1C2B36;
    }

    .mzl-menu-item a:hover {
        border-left: 4px solid #009688;
        text-decoration: none;
    }

    .mzl-menu-icon {
        font-size: 18px;
        color: white;
    }

    .mzl-menu-pd {
        padding: 10px;
        /*border-bottom: 1px solid #DBE2E7;*/
    }

    .mzl-menu-item-artive {
        background-color: #080808;
        border-left: 4px solid #080808 !important;
    }

</style>
