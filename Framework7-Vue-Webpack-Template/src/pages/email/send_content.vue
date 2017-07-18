<template>
  <f7-page @page:init="pageInit">
   <f7-navbar back-link="Back" title="写邮件" sliding></f7-navbar>
   <f7-list form>
     <f7-list-item>
       <f7-label>收件人</f7-label>
       <f7-input @click="test" ref="reciever" type="text" v-model="reciever"/>
       <!--<f7-input open-popup="#popover-list" />-->
     </f7-list-item>
     <f7-list-item>
       <f7-label>时间</f7-label>
       <f7-input ref="date_input" v-model="date" type="text" disabled="true"/>
     </f7-list-item>
     <f7-list-item>
       <f7-label>标题</f7-label>
       <f7-input type="text" v-model="title"/>
     </f7-list-item>
     <f7-list-item>
       <f7-label>内容</f7-label>
       <f7-input type="textarea" v-model="content"/>
     </f7-list-item>
     <f7-list-item>
        <f7-button @click="sendMessage">发送</f7-button><f7-button>返回</f7-button><f7-button @click="test">test</f7-button>
     </f7-list-item>
   </f7-list>
   <f7-popup id="popover-list">
      <f7-list contacts>
        <f7-list-group v-for="(group,key) in this.contracts">
          <f7-list-item :title="key" group-title></f7-list-item>
          <f7-list-item v-for="name in group" :title="name" @click=""></f7-list-item>
        </f7-list-group>
      </f7-list>
   </f7-popup>
  </f7-page>
</template>
<script>
import { mapGetters,mapActions } from 'vuex'
export default {
  data () {
    return {
      myDate : new Date(),
      apiUri:'http://172.31.0.31:8081/cat/sendMail',
      jsonMail:{"emailContent":"","emailReciever":"","emailSender":"ly979124514@163.com","emailDate":"","emailTitle":""},
      json2String:'',
    }
  },
  computed: {
    ...mapGetters({
        logUser: 'logUser',
        contracts: 'contracts'
    })
  },
  methods : {
    sendMessage: function(){
        console.log(this.title);
        console.log(this.reciever);
        console.log(this.mydate);
        console.log(this.content);
        this.jsonMail.emailContent=this.content;
        this.jsonMail.emailReciever=this.reciever;
        this.jsonMail.emailDate=this.get_timp();
        this.jsonMail.emailTitle=this.title;
        this.jsonMail.emailSender=logUser.mailAddress;
        this.json2String=JSON.stringify(this.jsonMail);
        console.log('json2String:'+ this.json2String);
        this.$http.post(this.apiUri,this.json2String).then(function (response){
             if(this.reciever == null)
             { 
                f7.alert("请填写收件人地址","发送箱");
             } else if( this.title == null) {
                f7.alert("请填写题目","发送箱")
             } else 
             {
                if (response.bodyText == 'SUCCESS')
                {
                   console.log(response.bodyText);
                   f7.alert("发送成功","邮箱");
                } else {
                   console.log(response.bodyText);
                   console.log("reponse body");
                   f7.alert("发送失败"+response.bodyText,"邮箱");
                }  
             }
        })
    },
    test: function () {
         this.$f7.popup("#popover-list");
    },
    getEaddress: function (name) {
         this.$refs.reciever = name;
    },
    getUserList: function () {
       this.$http.get('http://172.31.0.31:8081/cat/getAllUser').then(function(response){
          console.log(response.data);
       })
    },
   get_timp: function (){
        var myDate = new Date();
        var timp = myDate.getFullYear()+'-'+myDate.getMonth()+'-'+myDate.getDate()+' '+myDate.getHours()+':'+myDate.getMinutes()+':'+myDate.getSeconds();
        return timp;
   },
   pageInit: function() {
        this.$refs.date_input.value=this.get_timp();
   }
  }
}
</script>
