<template>
  <f7-page @page:init="getData">
   <f7-navbar>
     <f7-nav-left back-link="Back">
     </f7-nav-left>
     <f7-nav-center sliding>
        新闻
     </f7-nav-center>
   </f7-navbar>
   <f7-list form>
    <f7-list-item>
     <f7-label>新闻标题</f7-label>
     <f7-label>{{news_title}}</f7-label>
    </f7-list-item>
    <f7-list-item>
     <f7-label>发布时间</f7-label>
     <f7-label>{{news_time}}</f7-label>
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
       news_title: '',
       news_time: '',
       content:''
     }
  },
  methods: {
    getData: function() {
       this.$http.get('http://172.31.0.31:8081/cat/getNewsByTitle?title='+this.$route.query.title).then(function(response){
          console.log('title: '+response.data.newsTitle);
          this.news_title = response.data.newsTitle;
          this.news_time = response.data.newsTime;
          this.content = response.data.newsContent;
       })
    }
  }
}
</script>
