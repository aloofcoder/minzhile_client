<template>
    <div class="layout-page">
        <component :is="currentComponent" :managerInfo="managerInfo" @switch-page="switchPage" @back="back"></component>
    </div>
</template>
<script>
    export default {
        name: 'UserCenter',
        data () {
            return {
                currentComponent: 'user-list',
                componentTabs: [],
                managerInfo: {}
            }
        },
        methods: {
            switchPage(param = {}) {
                this.componentTabs.push(this.currentComponent)
                this.currentComponent = param.page
                param.managerInfo && (this.managerInfo = {... param.managerInfo})
            },
            back () {
                this. componentTabs.length > 0 && (this.currentComponent = this.componentTabs[this.componentTabs.length - 1])
            }
        }
    }
</script>
