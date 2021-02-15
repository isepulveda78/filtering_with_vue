import Vue from 'vue'
import App from './App.vue'


import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap'

import { library } from "@fortawesome/fontawesome-svg-core"

import {
  faPlus, faMinus, faTrash, faCheck
} from "@fortawesome/free-solid-svg-icons"

library.add(faPlus, faMinus, faTrash, faCheck);

Vue.config.productionTip = false

new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
