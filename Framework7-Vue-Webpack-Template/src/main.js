// Import Vue
import Vue from 'vue'
// Import F7
import Framework7 from 'framework7'

// Import F7 Vue Plugin
import Framework7Vue from 'framework7-vue'

// Import F7 iOS Theme Styles
import Framework7Theme from 'framework7/dist/css/framework7.ios.min.css'
import Framework7ThemeColors from 'framework7/dist/css/framework7.ios.colors.min.css'
// OR for Material Theme:
//import Framework7Theme from 'framework7/dist/css/framework7.material.min.css'
//import Framework7ThemeColors from 'framework7/dist/css/framework7.material.colors.min.css'

import http from 'vue-resource'
// Import App Custom Styles
import AppStyles from './css/app.css'

// Import Routes
import Routes from './routes.js'

// Import App Component
import App from './app'
import store from './store'

var bus = new Vue()
// Init F7 Vue Plugin
Vue.use(Framework7Vue)
Vue.use(http)

Vue.http.headers.common['Access-Control-Allow-Origin'] = 'http://192.168.1.18:8080'
Vue.http.headers.common['Access-Control-Request-Method'] = '*'
Vue.http.options.emulateJSON = true
Vue.http.options.emulateHTTP = true
var $$ = Dom7
// Init App
new Vue({
  el: '#app',
  template: '<app/>',
  store,
  // Init Framework7 by passing parameters here
  framework7: {
    root: '#app',
    /* Uncomment to enable Material theme: */
    // material: true,
    routes: Routes,
    domCache: true,
  },
  // Register App Component
  components: {
    app: App
  }
});
