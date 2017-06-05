import Vue from 'vue'
import App from './App.vue'

// importando o módulo
import VueResource from 'vue-resource';
import VueRouter from 'vue-router';
import {routes} from './routes';
import VeeValidate from 'vee-validate';
import msg from './pt_BR';

import 'bootstrap/dist/css/bootstrap.css';

import './directives/Transform';

import './assets/css/teste.css';
import './assets/js/teste.js';

import 'jquery/dist/jquery.js'
import 'bootstrap/dist/js/bootstrap.js';

// registrando o módulo/plugin no global view object
Vue.use(VueResource);
Vue.http.options.root='http://localhost:3000'; //centralizando domínio da api
Vue.use(VueRouter);

const router = new VueRouter({ 
  routes,
  mode: 'history' 
});

Vue.use(VeeValidate, {
  locale: 'pt_BR', //colocar traducao nas validações
  dictionary: {
    pt_BR: {
      messages: msg
    }
  }
});


new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
