<template>
  <f7-page @page:init="pageInit">
   <f7-navbar back-link="Back" title="写邮件" sliding></f7-navbar>
   <f7-list form>
     <f7-list-item>
       <f7-label>收件人</f7-label>
       <f7-input style="text-align: center" @click="test" ref="reciever" type="text" v-model="reciever"/>
       <!--<f7-input open-popup="#popover-list"/>-->
     </f7-list-item>
     <f7-list-item>
        <f7-label>时间</f7-label>
        <!--<f7-input value=this.timeInit v-model="date" type="text" />-->
        <f7-label>{{ this.time }}</f7-label>
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
        <f7-button @click="sendMessage">发送</f7-button>
        <f7-button @click="sendMessage">保存到草稿箱</f7-button>
        <f7-button @click="test">test</f7-button>
     </f7-list-item>
   </f7-list>
   <f7-popup id="popover-list">
      <f7-list contacts>
        <f7-list-group v-for="(group,key) in this.contracts">
          <f7-list-item :title="key" group-title></f7-list-item>
          <f7-list-item v-for="object in group" :title="object.USER_NAME" @click="getEaddress(object)"></f7-list-item>
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
      reci_name : '',
      time : '',
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
    }),
    reciever: {
       get: function () {
          return this.reci_name;
       }
    }
  },
  methods : {
    sendMessage: function(){
        console.log(this.title);
        console.log(this.reciever);
        console.log(this.mydate);
        console.log(this.content);
        this.jsonMail.emailContent=this.content;
        this.jsonMail.emailDate=this.get_timp();
        this.jsonMail.emailTitle=this.title;
        this.jsonMail.emailSender=this.logUser.mailAddress;
        this.json2String=JSON.stringify(this.jsonMail);
        console.log('json2String:'+ this.json2String);
        this.$http.post(this.apiUri,this.json2String).then(function (response){
             console.log("**************----------------*******************");
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
    getEaddress: function (object) {
      //   this.$refs.reciever = object.USER_NAME;
         this.reci_name = object.USER_NAME;
         this.jsonMail.emailReciever= object.MAIL_ADDRESS;
         this.$f7.closeModal();
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
         this.time = this.get_timp();
   }
  }
}
</script>
