<template>
   <f7-page pull-to-refresh @ptr:refresh="onRefresh" @page:init="getData">
    <f7-navbar>
      <f7-nav-left back-link="Back">
      </f7-nav-left>
      <f7-nav-center sliding>
         收件箱 
      </f7-nav-center>
    </f7-navbar>
    <f7-list form link>
<!--      <f7-list-item v-for="item in show_items" 
                    :title="item.EMAIL_TITLE"
                    :after="item.EMAIL_DATE"
                    @click="$router.load({ url : '/content?title='+item.EMAIL_TITLE})"
      >-->
      <f7-list-item v-for="item in show_items" 
                    :title="item.SUBJECT"
                    :after="item.SEND_TIME"
                    link='item.SUBJECT'
      ></f7-list-item> 
     </f7-list>
     <p style="text-align:center">下拉刷新</p>
   </f7-page>
</template>
<script>
export default {
  data () {
    return {
       limit: 20,
       show_counter: 0,
       total_counter:0,
       show_items: [],
       total_items:[],
       url:"content?title="
    }
  },
  methods: {
    getData: function() {
       this.$http.get('http://172.31.0.31:8081/oa/getAllMail').then(function(response){
          for(this.show_counter;this.show_counter < limit;this.show_counter++)
          {
                 console.log('show_items: ');
                 console.log(response.data[this.show_counter]);
                 this.show_items.push(response.data[this.show_counter]);
          }
          this.show_counter--;
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
//      self.show_items.push(self.total_items[this.show_counter++]);
      setTimeout(function () {
        self_show_items.push(self_total_items[self_show_counter+20]);
        done();
      },1000);
      this.show_counter+20;
    }
  }
}
</script>
