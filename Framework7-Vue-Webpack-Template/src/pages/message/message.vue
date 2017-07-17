<template>
<div>
 <f7-panel right cover layout="white" theme="theme-pink">
            <f7-navbar title="名单"></f7-navbar>
            <f7-list>
              <f7-list-button v-for="item in userList"
                                   :title="item.userName"
                                   @click="getRecv(item.userName,item.Id)">
                                  </f7-list-button>
            </f7-list>
         <!--   <f7-label v-else>
              Log On First
            </f7-label>-->
 </f7-panel>
 <f7-page>
   <f7-navbar tooler-fixed>
     <f7-nav-left back-link="Back">
     </f7-nav-left>
     <f7-nav-center>{{ this.title_name }}</f7-nav-center>
     <f7-nav-right>
       <f7-link open-panel="right">联系人列表</f7-link>
     </f7-nav-right>
   </f7-navbar>
    <f7-messages v-show="userStatus">
     <f7-message v-for="message in messages"
      :text="message.text"
      :label="message.label"
      :date="message.date"
      :name="this.logUser"
      :avatar="message.avatar"
      :type="message.type"
      :day="message.day"
      :time="message.time"
      @click="onClick"
      @click:text="onTextClick"
      @click:name="onNameClick"
      @click:avatar="onAvatarClick"
      ></f7-message>
    </f7-messages>
    <f7-messagebar placeholder="Message" send-link="Send" @submit="onSubmit" v-show="userStatus"></f7-messagebar>
    <h1 v-show="!userStatus">请先登陆!!</h1>
 </f7-page>
</div>
</template>
<script>
import { mapGetters,mapActions } from 'vuex'
import io from '../../../node_modules/socket.io-client/dist/socket.io' 
export default {
   data: function () {
    return {
      Id: '',
      name: '',
      avatar: '',
      title_name: '',
      connectState: false,
      onlineUserList: [],
      userList: [],
      reqest_pkg: {},
      toUserSocketId: '',
      messages: [
          
      ]
    }
   },
   mounted () {
      this.connectEvent();
   },
   computed: {
     ...mapGetters({
       userStatus: 'logOn',
       logUser: 'logUser',
       HttpServer: 'HttpServer'
     })
   },
   methods: {
      connectEvent () {
         console.log('this is connectEvent');
         var me = this;
         console.log('before emit login');
   //      console.log(this.userStatus);
    
//         this.HttpServer.emit('login',this.reqest_pkg);
         this.HttpServer.on('login', function (obj) {
               console.log('sign login');
               me.onlineUserList = obj.onlineUserList;
               me.UserList = obj.UserList;
         });
         this.HttpServer.on('loginSuccess',function (obj) {
             if (obj.sign === 1) {
                 me.connectState = true;
                 console.log('连接好了');
             }
         });
         this.HttpServer.on('confirmId', function (obj) {
            console.log('obj from confirmId');
            console.log(obj);
            me.toUserSocketId = obj.toUserSocketId;
         });
         this.HttpServer.emit('getAllUserList');
         this.HttpServer.on('getAllUserList', function (obj) {
             console.log('getAlluserList');
             me.userList = obj.UserList;
         });
         this.HttpServer.on('message', function (obj) {
             console.log('sign message ');
             console.log(obj.user);
             me.messages.push({
                name: obj.user.userName,
                avatar: this.avatar,
                type: 'recieved',
                text: obj.msg,
                date: (function () {
                 var now = new Date();
                 var hours = now.getHours();
                 var minutes = now.getMinutes();
                 return hours + ':' + minutes;
                })() 
             })
         })
      },
     onClick: function (event) {
       console.log('message click');
     },
     onAvatarClick: function () {
       console.log('avatar-click');
     },
     onTextClick: function () {
       console.log('text-click');
     },
     onNameClick: function() {
       console.log('name-click');
     },
     sendEvent: function( text ) {
       if (this.connectState) {
          console.log('Send Message');
          this.HttpServer.emit('message', {msg: text,user: this.toUserSocketId,username: this.reqest_pkg.userName, tousername: this.reqest_pkg.toUserName});
       } else {
          console.log('ERROR');
       }
     },
     getRecv: function(toUserName,toUserId) {
       this.reqest_pkg.userId = this.logUser.userId;
       this.reqest_pkg.userName = this.logUser.username;
       this.reqest_pkg.toUserId = toUserId;
       this.reqest_pkg.toUserName = toUserName;
       this.title_name = toUserName;
       this.HttpServer.emit('login', this.reqest_pkg);
       this.$f7.closePanel();
       console.log(this.reqest_pkg);
     },
     onSubmit: function (text,clear) {
       if (text.trim().length === 0) return;
       this.messages.push({
         name: this.logUser.username,
         avatar: this.avatar,
         text: text,
         date: (function () {
           var now = new Date();
           var hours = now.getHours();
           var minutes = now.getMinutes();
           return hours + ':' + minutes;
         })()
       });
       this.sendEvent(text);
       clear();
       
     }
   }
 }
</script>
