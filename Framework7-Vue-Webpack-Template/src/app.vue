<template>
<div id="app">
 <f7-statusbar></f7-statusbar>
 <f7-views navbar-through>
  <f7-view id="main-view" main navbar-through :dynamic-navbar="true">
   <f7-navbar>
      <f7-nav-center sliding>OA</f7-nav-center>
   </f7-navbar>
   <f7-pages>
    <f7-page>
      <p v-show="!userStatus">
        <f7-button big round  @click="$f7.mainView.router.load({url: '/user/'})">您还没有登录，请点此登录</f7-button>
      </p>
    <f7-block inner>
     <p>
      <f7-grid>
       <f7-col :style="columnStyle" width="33" tablet-width="33">
        <f7-link href="/work/"><img src="../static/icon/Business-Filled.png"></f7-link><br/>
           <span>工作站</span>
       </f7-col>
       <f7-col :style="columnStyle" width="33" tablet-width="33">
           <f7-link href="/schedule/"><img src="../static/icon/icons8-Schedule-64.png"></f7-link><br/>
           <span>日程</span>
       </f7-col>
       <f7-col :style="columnStyle" width="33" tablet-width="33">
          <f7-link href="/user/"><img src="../static/icon/User-Filled.png"></f7-link><br/>
           <span>用户</span>
       </f7-col>
      </f7-grid>
     </p>
     <p>
      <f7-grid>
       <f7-col :style="columnStyle" width="33" tablet-width="33">
        <f7-link href="/email/"><img src="../static/icon/Message-Filled.png"></f7-link><br/>
           <span>邮箱</span>
       </f7-col>
       <f7-col :style="columnStyle" width="33" tablet-width="33">
           <f7-link href="/notice/"><img src="../static/icon/icons8-File-50.png"></f7-link><br/>
           <span>公告</span>
       </f7-col>
       <f7-col :style="columnStyle" width="33" tablet-width="33">
<f7-link href="/message/"><img src="../static/icon/icons8-Chat-50.png"></f7-link><br/>
           <span>聊天</span>
       </f7-col>
      </f7-grid>
     </p>
    </f7-block>
    </f7-page>
   </f7-pages>
  </f7-view>
 </f7-views>
</div>
</template>
<script>
import { mapGetters,mapActions } from 'vuex'
export default {
  data: function(){
    return {
     //columnStyle: 'border: 1px solid #e5e5e5; padding:5px; text-align: center'
     columnStyle: 'padding:5px; text-align: center'
    }
  },
  computed: {
    ...mapGetters({
       userStatus: 'logOn',
       logUser: 'logUser'
    })
  }
}
</script>
