import { createStore } from 'vuex'
import axios from 'axios'

const mutations = {
  SET_PROPERTY: 'setProperty'
}

export default createStore({
  state: {
    questions: [],
    loading: false,
    eventId: null
  },
  getters: {
  },
  mutations: {
    [mutations.SET_PROPERTY] (state, obj) {
      for (const key in obj) {
        state[key] = obj[key]
      }
    }
  },
  actions: {
    async submitQuestion ({ commit, dispatch, state }, { question, name }) {
      commit(mutations.SET_PROPERTY, { loading: true })
      try {
        await axios.post(`http://localhost:3000/api/events/${state.eventId}/questions`, { text: question, user: name })
      } catch (e) {
        console.log(e)
        throw e
      } finally {
        commit(mutations.SET_PROPERTY, { loading: false })
      }

      dispatch('fetchQuestions')
    },
    async fetchQuestions ({ commit, state }) {
      const req = await axios.get(`http://localhost:3000/api/events/${state.eventId}/questions`)
      commit(mutations.SET_PROPERTY, { questions: req.data })
    },
    async setProperty ({ commit }, obj) {
      commit(mutations.SET_PROPERTY, obj)
    }
  },
  modules: {
  }
})
