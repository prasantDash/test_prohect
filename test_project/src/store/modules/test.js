import axios from 'axios'
const state = {
	products: []
};
const mutations = {
	setProducts: (state, products) => (state.products = products) 
};

const actions = {
	async getAllUser({commit}){
		let liveDataUrl = 'http://devapi.trackervigil.com/getvehiclelivedata.php'
		let  options = {
			headers: {
				Authorization: localStorage.getItem('tocken')
			}			
		};
		const responce = await axios.post(liveDataUrl,{},options);
		commit('setProducts',responce.data.data);
	}
};

const getters = {
	products: state => state.products	
};


export default {
	state,
	getters,
	actions,
	mutations
}