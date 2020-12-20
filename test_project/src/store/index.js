import Vue from 'vue'
import Vuex from 'vuex'
import Test from './modules/test'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
	modules: {
		Test
	},
	//Plugin used to persist state data
	plugins: [createPersistedState()]
})
