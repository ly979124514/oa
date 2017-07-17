<template>
 <f7-view>
  <f7-pages>
   <f7-page>
      <f7-navbar>
       <f7-nav-left>
         <f7-link href='/email/'>Back</f7-link>
       </f7-nav-left>
       <f7-nav-center sliding>
        收件箱
       </f7-nav-center> 
      </f7-navbar>
      <f7-list>
         <f7-list-item
          v-for="item in items"
          :title=item.title
          badge="3"
          badge-color="red"
          @click="$router.load({ url : '/content?title='+item.title})"
          ></f7-list-item>
      </f7-list>
   </f7-page>
  </f7-pages>
 </f7-view>
</template>
<script>
export default {
  data () {
    return {
      items : [
        {
           title : '123',
           author : 'li1',
           content : '11111111111111111111111112222222222222222'
        },
        {
           title : '1uit',
           author : 'yangerdan',
           content : '学习学习11112222222222222222'
        },
        {
           title : '123',
           author : 'li1',
           content : '11111111111111111111111112222222222222222'
        },
        {
           title : '123',
           author : 'li1',
           content : '11111111111111111111111112222222222222222'
        }
      ]
    }
}

}
</script>
