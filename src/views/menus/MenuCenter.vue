<template>
    <div class="layout-page">
        <component :is="currentComponent" :menuInfo="menuInfo" @switch-page="switchPage" @back="back"></component>
    </div>
</template>
<script>
    export default {
        name: 'MenuCenter',
        data () {
            return {
                currentComponent: 'menu-list',
                componentTabs: [],
                menuInfo: {}
            }
        },
        methods: {
            switchPage(param = {}) {
                this.componentTabs.push(this.currentComponent)
                this.currentComponent = param.page
                param.menuInfo && (this.menuInfo = {... param.menuInfo})
            },
            back () {
                this. componentTabs.length > 0 && (this.currentComponent = this.componentTabs[this.componentTabs.length - 1])
            }
        }
    }
</script>
