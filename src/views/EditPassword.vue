<template>
    <div class="layout-page">
        <h2>修改密码 {{model.managerName}}</h2>
    </div>
</template>
<script>
    export default {
        name: 'EditPwd',
        data () {
            return {
                model: {
                    managerName: ''
                }
            }
        },
        created () {
            this.model = Object.assign({}, this.model, this.$route.params.managerInfo)
        }
    }
</script>
