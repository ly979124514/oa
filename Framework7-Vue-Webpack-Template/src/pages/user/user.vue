<template>
 <f7-page navbar-fixed>
  <f7-navbar back-link="Back" title="我的" sliding></f7-navbar>
    <f7-list form v-if="!userStatus">
      <f7-list-item>
        <f7-label>姓名</f7-label>
        <f7-input type="text" placeholder="姓名" v-model="username" />
      </f7-list-item>
      <f7-list-item>
        <f7-label>密码</f7-label>
        <f7-input type="password" placeholder="密码" v-model="passwd"/>
      </f7-list-item>
      <f7-list-item>
          <f7-button @click="Logon()">登录</f7-button>
          <f7-button @click="test()">TEST</f7-button>
      </f7-list-item>
    </f7-list>
    <f7-list form v-else>
       <f7-list-item>
          <f7-label>姓名: </f7-label>
          <f7-label>{{ logUser.username }}</f7-label>
       </f7-list-item>
       <f7-list-item>
          <f7-label>ID: </f7-label>
          <f7-label>{{ logUser.userId }}</f7-label>
       </f7-list-item>
       <f7-list-item>
          <f7-label>科室: </f7-label>
          <f7-label>{{ logUser.username }}</f7-label>
       </f7-list-item>
       <f7-list-item>
          <f7-label>职称: </f7-label>
          <f7-label>{{ logUser.username }}</f7-label>
       </f7-list-item>
    </f7-list form>
    <p>LogState : {{ userStatus }}</p>
    <p>LogState : {{ logUser }}</p>
 </f7-page>
</template>
<script>
import { mapGetters,mapActions } from 'vuex'
import io from '../../../node_modules/socket.io-client/dist/socket.io'
export default {
data () {
  return {
     hostInfo: {},
  }
 },
 created () {
   console.log('create()'+this._username);
 },
 computed: {
   ...mapGetters({
      userStatus: 'logOn',
      logUser: 'logUser',
      HttpServer: 'HttpServer',
   })
 },
 methods: {
   ...mapActions({
      checkout: 'checkout',
      checkUserName: 'checkUserName',
      getHttpServer: 'getHttpServer',
      write_json: 'write_json'
   }),
   test: function() {
       console.log(this._username);
       console.log(this.username);
       this._username = this.username;
       console.log(this._username);
       console.log(this.username);
       this.checkout(); 
   },
   connectEvent: function ( hostInfo) {
       console.log('before io.connect');       
       this.httpServer = io.connect('http://172.31.0.125:3000');
       this.httpServer.emit('showLogin',hostInfo)
       this.$store.dispatch('getHttpServer',this.httpServer);
   },
   Logon: function () {
     this.$http.get('http://172.31.0.31:8081/cat/selectByUserName?name='+this.username+'&&passwd='+this.passwd).then(function(response){
    // this.$http.get('http://192.168.1.10:8081/cat/selectByUserName?name='+this.username+'&&passwd='+this.passwd).then(function(response){
           console.log(response.data);
           this.$store.dispatch('write_json',response.data);
           if(this.username == response.data.userName && this.passwd == response.data.userPasswd)
           {
               // preState = true;
               // state.setState({flag:preState})
                console.log(this.username);
                console.log(response.data);
                this.hostInfo.username = this.username;
                this.hostInfo.userId = response.data.id
                this.hostInfo.mailAddress = response.data.mailAddress;
                this.checkout(); 
                this.$store.dispatch('checkUserName', this.hostInfo);
                this.connectEvent(this.hostInfo);
                //this.$store.dispatch('checkUserName',this.username, response.data.id);
           }
           else{
                console.log('username = '+this.username+' user_name = '+response.data.userName);
                console.log('passwd = '+this.passwd+' userPasswd = '+response.data.userPasswd);
                f7.alert('用户名或密码错误！！','登录信息！');             
           }
     })
   }
 }
}
</script>
