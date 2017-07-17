<template>
 <f7-page navbar-fixed>
  <f7-navbar back-link="Back" title="工作站" sliding></f7-navbar>
  <f7-block inner>
   <p>
    <f7-grid>
      <f7-col :style="columnStyle" width="33" tablet-width="33">
          <f7-link href="/email/"><img src="../../../static/icon/png/010-close-envelope.png"></f7-link><br/>
          <span>邮件</span>
      </f7-col>
      <f7-col :style="columnStyle" width="33" tablet-width="33">
          <f7-link href="/notice/"><img src="../../../static/icon/png/012-coding.png"></f7-link><br/>
          <span>公告</span>
      </f7-col>
      <f7-col :style="columnStyle" width="33" tablet-width="33">
          <f7-link href="/news/"><img src="../../../static/icon/png/009-newspaper.png"></f7-link><br/>
          <span>新闻</span>
      </f7-col>
    </f7-grid>
   </p>
   <p>
    <f7-grid>
      <f7-col :style="columnStyle" width="33" tablet-width="33">
          <f7-link href="/message/"><img src="../../../static/icon/png/008-paper-plane.png"></f7-link><br/>
          <span>短消息</span>
      </f7-col>
      <f7-col :style="columnStyle" width="33" tablet-width="33">
          <f7-link href="/schedule/"><img src="../../../static/icon/png/007-calendar.png"></f7-link><br/>
          <span>日程</span>
      </f7-col>
      <f7-col :style="columnStyle" width="33" tablet-width="33">
          <f7-link href="/address/"><img src="../../../static/icon/png/006-notebook.png"></f7-link><br/>
          <span>通讯簿</span>
      </f7-col>
    </f7-grid>
   </p>
   <p>
    <f7-grid>  
      <f7-col :style="columnStyle" width="33" tablet-width="33">
          <f7-link href="/workflow/"><img src="../../../static/icon/png/005-workflow.png"></f7-link><br/>
          <span>工作流程</span>
      </f7-col>
      <f7-col :style="columnStyle" width="33" tablet-width="33">
          <f7-link href="/report/"><img src="../../../static/icon/png/004-form.png"></f7-link><br/>
          <span>报表</span>
      </f7-col>
      <f7-col :style="columnStyle" width="33" tablet-width="33">
          <f7-link href="/manager/"><img src="../../../static/icon/png/003-manager.png"></f7-link><br/>
          <span>系统管理</span>
      </f7-col>
    </f7-grid>
   </p>
  </f7-block>
 </f7-page>
</template>
<script>
  export default {
    data: function () {
      return {
        columnStyle: 'border: 1px solid #e5e5e5; padding:5px; text-align: center'
      }
    }
  }
</script>
