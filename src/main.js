import Vue from 'vue';
import ElementUI from 'element-ui';
import './assets/css/commons/var.scss';
import './assets/css/theme/index.scss';
import codes from './conf/codes';
import env from './conf/env';
import store from './store';
import router from './router';
import mixins from '@/mixins';
import App from './App.vue';

Vue.prototype.ENV = env;
Vue.prototype.CODES = codes;

Vue.use(ElementUI);
Vue.config.productionTip = false;

window.eventHub = new Vue();

Vue.mixin(mixins);

new Vue({
    render: h => h(App),
    store,
    router
}).$mount('#app');
