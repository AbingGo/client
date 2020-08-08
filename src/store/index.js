import Vue from 'vue';
import Vuex from 'vuex';
import manage from './modules/manage';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
    modules: {
        manage
    },
    strict: debug
});
