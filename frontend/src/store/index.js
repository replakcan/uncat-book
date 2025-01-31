import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state: {
    questions: []
  },
  getters: {
  },
  mutations: {
    setQuestions (state, payload) {
      state.questions = payload
    }
  },
  actions: {
    async submitQuestion ({ commit, dispatch }, { question, name }) {
      await axios.post('http://localhost:3000/api/events/679d4214310bc1d217b29661/questions', { text: question, user: name })
      dispatch('fetchQuestions')
    },
    async fetchQuestions ({ commit }) {
      const req = await axios.get('http://localhost:3000/api/events/679d4214310bc1d217b29661/questions')
      console.log(req.data)
      commit('setQuestions', req.data)
    }
  },
  modules: {
  }
})
