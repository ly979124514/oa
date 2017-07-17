export default [
  {
      path: '/content/',
      component: require('./pages/email/content.vue')
  },
  {
      path: '/notice_content/',
      component: require('./pages/notice/notice_content.vue')
  },
  {
      path: '/about/',
      component: require('./pages/test/about.vue')
  },
  {
      path: '/test/',
      component: require('./pages/test/form.vue')
  },
  {
      path: '/tabbar/',
      component: require('./pages/test/tabbar.vue'),
      tabs: [
        {
          path: '/',
          tabId: 'tab1',
          component: require('./pages/test/tab1.vue')
        },
        {
          path: '/tab2/',
          tabId: 'tab2',
          component: require('./pages/test/tab2.vue')
        },
        {
          path: '/tab3/',
          tabId: 'tab3',
          component: require('./pages/test/tab3.vue')
        }
      ]
  },
  {
      path: '/notice/',
      component: require('./pages/notice/notice.vue')
  },
  {
      path: '/news/',
      component: require('./pages/news/news.vue')
  },
  {
      path: '/news_content/',
      component: require('./pages/news/news_content.vue')
  },
  {
      path: '/message/',
      component: require('./pages/message/message.vue')
  },
  {
      path: '/address/',
      component: require('./pages/address/address.vue')
  },
  {
      path: '/workflow/',
      component: require('./pages/workflow/workflow.vue')
  },
  {
      path: '/report/',
      component: require('./pages/report/report.vue')
  },
  {
      path: '/manager/',
      component: require('./pages/manager/manager.vue')
  },
  {
      path: '/user/',
      component: require('./pages/user/user.vue')
  },
  {
      path: '/send_content/',
      component: require('./pages/email/send_content.vue')
  },
  {
      path: '/send/',
      component: require('./pages/email/send.vue')
  },
  {
      path: '/reci/',
      component: require('./pages/email/reci.vue')
  },
  {
      path: '/gara/',
      component: require('./pages/email/gara.vue')
  },
  {
      path: '/draf/',
      component: require('./pages/email/draf.vue')
  },
  {
      path: '/email/',
      component: require('./pages/email/email-content.vue'),
  },
  {
      path: '/schedule/',
      component: require('./pages/schedule/schedule.vue')
  },
  {
      path: '/',
      redirect: '/work/'
  },
  {
      path: '/work/',
      component: require('./pages/work/wstation.vue')
  }
]
