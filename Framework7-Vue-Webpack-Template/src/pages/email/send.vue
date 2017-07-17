<template>
   <f7-page pull-to-refresh @ptr:refresh="onRefresh" @page:init="getData">
      <f7-navbar>
        <f7-nav-left back-link="Back">
        </f7-nav-left>
        <f7-nav-center sliding>
          发件箱 
        </f7-nav-center>
        <f7-nav-right>
          <f7-link open-popover="#popover-send">编辑</f7-link>
        </f7-nav-right>
      </f7-navbar>
      
       <f7-popover id="popover-send">
         <f7-list>
           <f7-list-item @click="_popover()">写邮件</f7-list-item>
           <f7-list-item>OP1</f7-list-item>
           <f7-list-item>OP2</f7-list-item>
         </f7-list>
       </f7-popover>
      <f7-list>
         <f7-list-item
          v-for="item in show_items"
          :title="item.EMAIL_TITLE"
          :after="item.EMAIL_DATE"
          @click="$router.load({ url : '/content?title='+item.EMAIL_TITLE})"
          ></f7-list-item>
      </f7-list>
   </f7-page>
</template>
<script>
export default {
  data () {
    return {
       show_counter: 0,
       total_counter: 0,
       show_items: [],
       total_items:[]
    }
  },
  methods: {
    getData: function() {
      this.$http.get('http://172.31.0.31:8081/cat/getAllEmail').then(function(response){
          for(this.show_counter;this.show_counter < 5;this.show_counter++)
          {
                 console.log('show_items: '+response.data[this.show_counter]);
                 this.show_items.push(response.data[this.show_counter]);
          }
          console.log('json length: '+response.data.length)
          for(this.total_counter;this.total_counter < response.data.length; this.total_counter++)
          {
                 this.total_items.push(response.data[this.total_counter])
          }
       })
    },
    onRefresh: function (event, done) {
      console.log('show_counter: '+this.show_counter);
      var self = this;
      var self_show_items = this.show_items;
      var self_show_counter = this.show_counter;
      var self_total_items = this.total_items;
      var self_total_counter = this.total_counter;
      setTimeout(function () {
        self_show_items.push(self_total_items[self_show_counter]);
        done();
      },1000);
      this.show_counter++;
    },
     get_timp: function (){
        var myDate = new Date();
        var timp = myDate.getFullYear()+'-'+myDate.getMonth()+'-'+myDate.getDate()+' '+myDate.getHours()+':'+myDate.getMinutes()+':'+myDate.getSeconds();
        console.log(timp);
        return timp;
   },
    _popover: function () {
       this.$f7.closeModal()       
       this.$router.load({url: '/send_content?time='+this.get_timp()})
    }
  }
}
</script>
