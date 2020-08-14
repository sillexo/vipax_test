import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import users from './modules/users'
import repos from './modules/repos'

export default new Vuex.Store({
    modules: {
        users,
        repos,
    }
});
