<template>
  <f7-page @page:init="getData">
   <f7-navbar>
     <f7-nav-left back-link="Back">
     </f7-nav-left>
     <f7-nav-center sliding>
        内容
     </f7-nav-center>
   </f7-navbar>
   <f7-list form>
    <f7-list-item>
     <f7-label>标题</f7-label>
     <f7-label>{{title}}</f7-label>
    </f7-list-item>
    <f7-list-item>
     <f7-label>发件人</f7-label>
     <f7-label>{{sender}}</f7-label>
    </f7-list-item>
   </f7-list>
   <f7-block-title>内容</f7-block-title>
   <f7-block inner>
    <p>{{content}}</p>
   </f7-block>
  </f7-page>
</template>
<script>
export default {
  data() {
     return {
       title: '',
       sender: '',
       content: ''
     }
  },
  methods: {
    getData: function() {
       this.$http.get('http://172.31.0.31:8081/cat/getEmailByTitle?title='+this.$route.query.title).then(function(response){
          console.log(response.data);
          this.title = response.data.emailTitle;
          this.sender = response.data.emailSender;
          this.content = response.data.emailContent;
       })
    },
    test: function() {
        console.log('title: ');
    }
  }
}
</script>
