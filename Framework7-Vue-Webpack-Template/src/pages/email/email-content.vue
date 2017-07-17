<template>
  <f7-page navbar-fixed>
      <f7-navbar back-link="Back" title="邮箱" sliding></f7-navbar>
<!--         <f7-block tabs>
           <f7-tab route-tab-id="tabReci" />
           <f7-tab route-tab-id="tabSend" />
           <f7-tab route-tab-id="tabGara" />
           <f7-tab route-tab-id="tabDraf" />
         </f7-block>-->
         <p v-if="!userStatus" style="text-align:center">
             <f7-label>您还没有登陆，请先登陆</f7-label>
             <f7-button round color  @click="$router.load({ url: '/user/'})">登陆</f7-button>
         </p>
       <!--  <f7-toolbar tabbar labels v-else>
           <f7-link href="/reci" text="收件箱"></f7-link>
           <f7-link href="/send" text="发件箱"></f7-link>
           <f7-link href="/gara" text="垃圾箱"></f7-link>
           <f7-link href="/draf" text="草稿箱"></f7-link>
           <f7-link @click="$router.load({url: '/content/'})" text="测试"></f7-link>
         </f7-toolbar>-->
         <p style="padding:5px">
           <f7-button big round style="margin:10px" @click="$router.load({url: '/reci/'})">收件箱</f7-button>
           <f7-button big round style="margin: 10px" @click="$router.load({url: '/send/'})">发件箱</f7-button>
           <f7-button big round style="margin: 10px" @click="$router.load({url: '/gara/'})">垃圾箱</f7-button>
           <f7-button big round style="margin: 10px" @click="$router.load({url: '/draf/'})">草稿箱</f7-button>
        </p>
   </f7-page>
 </f7-pages>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
data () {
    return {
      columnStyle: 'border: 1px solid #e5e5e5; padding:5px; text-align: center'
    }
 },
 computed: {
  ...mapGetters({
     userStatus: 'logOn'
  })
 }
}
</script>
