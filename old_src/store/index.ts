import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    scoreForm: {
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
    }
  },
  getters: {
    getScoreForm: (state, getters) => () => {
      console.log("getされた:"+state.scoreForm);
      return state.scoreForm;
    }
  },
  mutations: {
    save(state, score){
      console.log("保存します。");
      localStorage.setItem('store', JSON.stringify(score));
    },
    load(state){
      console.log("ロードします");
      if(localStorage.getItem('store')) {
        const store = JSON.parse(localStorage.getItem('store') as string);
        this.replaceState(Object.assign(state, store));
      }
      
    }
  },
  actions: {
    doSave({commit}, payload) {
      console.log("save start.");
      commit('save', payload)
    },
    doLoad({commit}) {
      console.log("load start.");
      commit('load')
    }
  },
  modules: {
  }
})
