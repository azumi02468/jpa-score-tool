import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    player1: {
      name: '',
      ball: 0,
      goal: 0,
      safety: 0,
      ace: 0,
      breakrun: 0
    },
    player2: {
      name: '',
      ball: 0,
      goal: 0,
      safety: 0,
      ace: 0,
      breakrun: 0
    },
    inning: 0,
    dead: 0
  },
  getters: {
    getScoreForm: (state, getters) => {
      return state;
    }
  },
  mutations: {
    save(state, score){
      console.log("before:"+localStorage.getItem('store'));
      
      localStorage.setItem('store', JSON.stringify(score));
      console.log("after:"+localStorage.getItem('store'));
    },
    load(state){
      if(localStorage.getItem('store')) {
        const store = JSON.parse(localStorage.getItem('store') as string);
        this.replaceState(Object.assign(state, store));
      }
      
    }
  },
  actions: {
    doSave({commit}, payload) {
      console.log("doSave before:"+JSON.stringify(this.state));
      commit('save', payload)
      console.log("doSave after:"+JSON.stringify(this.state));
    },
    doLoad({commit}) {
      commit('load')
    }
  },
  modules: {
  }
})
