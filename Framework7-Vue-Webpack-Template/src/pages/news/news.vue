<template>
   <f7-page pull-to-refresh @ptr:refresh="onRefresh" @page:init="getData">
    <f7-navbar>
      <f7-nav-left back-link="Back">
      </f7-nav-left>
      <f7-nav-center sliding>
         新闻 
      </f7-nav-center>
    </f7-navbar>
    <f7-list>
      <f7-list-item v-for="item in show_items" 
                    :title="item.NEWS_TITLE"
                    :after="item.NEWS_TIME"
                    @click="$router.load({ url : '/news_content?title='+item.NEWS_TITLE})"
      ></f7-list-item> 
     </f7-list>
     <p style="text-align:center">下拉刷新</p>
   </f7-page>
</template>
<script>
export default {
  data () {
    return {
       show_counter: 0,
       total_counter:0,
       show_items: [],
       total_items:[]
    }
  },
  methods: {
    getData: function() {
       this.$http.get('http://172.31.0.31:8081/cat/getNews').then(function(response){
          for(this.show_counter;this.show_counter < 5;this.show_counter++)
          {
                 if(response.data[this.show_counter] != null ){
                  console.log('show_items: '+response.data[this.show_counter]);
                  this.show_items.push(response.data[this.show_counter]);
                 }
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
//      self.show_items.push(self.total_items[this.show_counter++]);
      setTimeout(function () {
        self_show_items.push(self_total_items[self_show_counter]);
        done();
      },1000);
      this.show_counter++;
    }
  }
}
</script>
