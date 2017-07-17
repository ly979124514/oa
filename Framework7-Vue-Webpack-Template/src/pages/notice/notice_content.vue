<template>
  <f7-page @page:init="getData">
   <f7-navbar>
     <f7-nav-left back-link="Back">
     </f7-nav-left>
     <f7-nav-center sliding>
        公告内容
     </f7-nav-center>
   </f7-navbar>
   <f7-list form>
    <f7-list-item>
     <f7-label>发布人</f7-label>
     <f7-label>{{publisher}}</f7-label>
    </f7-list-item>
    <f7-list-item>
     <f7-label>发布时间</f7-label>
     <f7-label>{{publish_time}}</f7-label>
    </f7-list-item>
    <f7-list-item>
     <f7-label>公告标题</f7-label>
     <f7-label>{{title}}</f7-label>
    </f7-list-item>
   <f7-block-title>内容</f7-block-title>
   <f7-block inner>
    <p>{{content}}</p>
   </f7-block>
  </f7-list>
  </f7-page>
</template>
<script>
export default {
  data() {
     return {
       publisher: '',
       publish_time: '',
       title: '',
       content:''
     }
  },
  methods: {
    getData: function() {
       this.$http.get('http://172.31.0.31:8081/cat/getNoticeByTitle?title='+this.$route.query.title).then(function(response){
          console.log('title: '+response.data.noticeTitle);
          this.publisher = response.data.noticePublisher;
          this.publish_time = response.data.noticePublishtime;
          this.title = response.data.noticeTitle;
          this.content = response.data.noticeContent;
       })
    },
    test: function() {
        console.log('title: ');
    }
  }
}
</script>
