<template>
    <div class="layout">
        <Row class="mt-10">
            <Table :loading="loading" :columns="columns" :data="commonData" style="width: 100%;"></Table>
        </Row>
        <Row class="mt-10 text-center">
            <Page :total="pageInfo.totalRow" :page-size="pageInfo.pageSize" :current="pageInfo.currentPage" show-total @on-change="handleSearch" />
        </Row>
    </div>
</template>
<script>
    export default {
        name: 'CommonTable',
        data () {
            return {
                pageInfo: {
                    currentPage: null,
                    pageSize: null,
                    totalPage: null,
                    totalRow: null
                }
            }
        },
        props: {
            columns: {
                type: Array,
                default: function () {
                    return []
                }
            },
            commonData: {
                type: Array,
                default: function () {
                    return []
                }
            },
            pageObject: {
                type: Object,
                default: function () {
                    return {}
                }
            },
            loading: {
                type: Boolean,
                default: false
            }
        },
        created () {
            this.pageInfo = Object.assign({}, this.pageInfo, this.pageObject)
        },
        methods: {
            handleSearch (page) {
                this.$emit('handle-search', page)
            }
        }
    }
</script>
