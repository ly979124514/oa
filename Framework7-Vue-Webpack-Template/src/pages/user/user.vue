<template>
 <f7-page navbar-fixed>
  <f7-navbar back-link="Back" title="我的" sliding></f7-navbar>
    <f7-list form v-if="!userStatus">
      <f7-list-item>
        <f7-label>编号</f7-label>
        <f7-input type="text" placeholder="编号" v-model="number" />
      </f7-list-item>
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
   this.getAllUser();
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
      write2json: 'write2json'
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
   getAllUser: function () {
     this.$http.get('http://172.31.0.31:8081/oa/getAllUser').then(function(response){
         this.$store.dispatch('write2json', response.data);
     })
   },
   Logon: function () {
     this.$http.get('http://172.31.0.31:8081/oa/selectUserByName?name='+this.username+'&&yhid='+this.number).then(function(response){
    // this.$http.get('http://192.168.1.10:8081/cat/selectByUserName?name='+this.username+'&&passwd='+this.passwd).then(function(response){
           //console.log(response.data);
           //if(this.username == response.data.userName && this.passwd == response.data.userPasswd)
           if(this.username == response.data[0].NAME && this.number == response.data[0].YHID)
           {
               // preState = true;
               // state.setState({flag:preState})
                console.log(this.username);
                //console.log(response.data);
                this.hostInfo.username = this.username;
                this.hostInfo.userId = this.number
         //       this.hostInfo.mailAddress = response.data[0].mailAddress;
                this.checkout(); 
                this.$store.dispatch('checkUserName', this.hostInfo);
                this.connectEvent(this.hostInfo);
                //this.$store.dispatch('checkUserName',this.username, response.data.id);
           }
           else{
                console.log('username = '+this.username+' user_name = '+ response.data[0].NAME);
                console.log(response.data);
                console.log(response.data[0].NAME);
                console.log('passwd = '+this.number+' number  = '+response.data[0].YHID);
                f7.alert('用户名或密码错误！！','登录信息！');             
           }
     })
   }
 }
}
</script>
