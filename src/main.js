import Vue from 'vue'
import App from './App.vue'

import './assets/main.css'
import './assets/style.css'


// Font awesome start
import {library} from "@fortawesome/fontawesome-svg-core"
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome"

import {faShoppingCart, faTextHeight, faFloppyDisk, faTrash, faRotate, faPoundSign} from "@fortawesome/free-solid-svg-icons"
import {faUniregistry} from "@fortawesome/free-brands-svg-icons"

library.add(faShoppingCart, faTextHeight, faUniregistry, faFloppyDisk, faTrash, faRotate, faPoundSign)

Vue.component("font-awesome-icon", FontAwesomeIcon)
Vue.config.productionTip = false
// Font awesome end

new Vue({
  render: (h) => h(App)
}).$mount('#app')
