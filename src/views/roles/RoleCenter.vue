<template>
    <div class="layout-page">
        <component :is="currentComponent" :roleInfo="roleInfo" @switch-page="switchPage" @back="back"></component>
    </div>
</template>
<script>
    export default {
        name: 'RoleCenter',
        data () {
            return {
                currentComponent: 'role-list',
                componentTabs: [],
                roleInfo: {}
            }
        },
        methods: {
            switchPage(param = {}) {
                this.componentTabs.push(this.currentComponent)
                this.currentComponent = param.page
                param.roleInfo && (this.roleInfo = {... param.roleInfo})
            },
            back () {
                this. componentTabs.length > 0 && (this.currentComponent = this.componentTabs[this.componentTabs.length - 1])
            }
        }
    }
</script>
