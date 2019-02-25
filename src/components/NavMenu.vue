<template>
    <div class="layout-nav">
        <div class="layout-nav-next br-f6">
            <Icon type="ios-rewind"/>
        </div>
        <div class="layout-nav-content">
            <ul class="layout-nav-select">
                <!--<li class="layout-nav-item">-->
                    <!--<Icon type="md-home" />-->
                <!--</li>-->
                <li class="layout-nav-item" :class="[item.name ? '': 'layout-nav-home',item.artive ? 'layout-nav-item-artive' : '']" v-for="(item, index) of tabs" :key="index" @click="toPage(item)">
                    <span>{{item.name}}</span>
                    <Icon v-if="item.onlyIcon" type="md-home"></Icon>
                    <Icon v-else type="md-close" class="layout-nav-item-close" @click.stop="removeTab(index, item)" />
                </li>
            </ul>
        </div>
        <div class="layout-nav-next bl-f6">
            <Icon type="md-fastforward" />
        </div>
    </div>
</template>
<script>
    export default {
        name: 'tab',
        data () {
            return {
                homeArtive: false
            }
        },
        props: {
          tabs: {
              type: Array,
              default: function () {
                  return []
              }
          }
        },
        mounted () {
            let info = {
                artive: false,
                link: '/',
                name: '',
                onlyIcon: 'md-home'
            }
            this.tabs.push(info)
        },
        methods: {
            removeTab($index) {
                this.tabs.splice($index, 1)
            },
            toPage(menuInfo) {
                this.tabs.forEach((item) => {
                    item.artive = false
                })
                this.$set(menuInfo, 'artive', true)
                this.$router.push(menuInfo.link)
            }
        }
    }
</script>
<style>

    .layout-nav {
        display: flex;
        box-sizing: border-box;
        height: 40px;
        line-height: 40px;
        box-shadow: 0 1px 2px 0 rgba(0, 0, 0, .1);
        background-color: white;
    }

    .bl-f6 {
        border-left: 1px solid #f6f6f6;
    }
    .br-f6 {
        border-right: 1px solid #f6f6f6;
    }

    .layout-nav-next {
        width: 50px;
        display: inline-block;
        text-align: center;
        box-sizing: border-box;
        font-size: 18px;
    }

    .layout-nav-next:hover {
        background-color: #F2F2F2;
    }

    .layout-nav-home {
        font-size: 18px !important;
        padding: 0 15px !important;
    }

    .layout-nav-content {
        display: inline-block;
        width: calc(100% - 100px);
    }

    .layout-nav-select {
        list-style-type: none;
        width: 100%;
        height: 40px;
        display: inline-block;
        overflow: hidden;
    }
    .layout-nav-item {
        position: relative;
        left: 0;
        font-size: 14px;
        float: left;
        display: list-item;
        box-sizing: border-box;
        min-width: 0;
        padding: 0 15px;
        height: 40px;
        line-height: 40px;
        max-width: 160px;
        text-overflow: ellipsis;
        padding-right: 40px;
        border-right: 1px solid #f6f6f6;
        vertical-align: top;
        overflow: hidden;
        cursor: pointer;
    }

    .layout-nav-item::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 0;
        height: 100%;
        border-bottom: 2px solid #000;
    }

    .layout-nav-item:hover::before {
        width: 100%;
    }

    .layout-nav-item-artive::before {
        width: 100%;
    }

    /*.layout-nav-item:hover {*/
        /*background-color: #F6F6F6;*/
        /*box-sizing: border-box;*/
        /*transition: 1s border-top-width cubic-bezier(.46, 1, .23, 1.52);*/
    /*}*/

    /*.layout-nav-item span {*/
        /*cursor: pointer;*/
    /*}*/

    .layout-nav-item-close {
        display: inline-block;
        width: 14px;
        text-align: center;
        position: absolute;
        right: 8px;
        top: 50%;
        margin: -7px 0 0;
        border-radius: 500rem;
        cursor: pointer;
    }

    .layout-nav-item-close:hover {
        background-color: #ff5722;
    }
</style>
