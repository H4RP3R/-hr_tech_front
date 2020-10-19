import Vue from 'vue'
import App from './App.vue'
import router from './router'
import CKEditor from '@ckeditor/ckeditor5-vue'
import { store } from './store'

Vue.config.productionTip = false
Vue.use(CKEditor)

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
