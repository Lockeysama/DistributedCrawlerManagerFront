import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

// axios.defaults.baseURL = "http://127.0.0.1:5001"
Vue.prototype.$http = axios

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      status: '',
      token: '',
      user: null
    }
  },
  mutations: {
    auth_request(state) {
      state.status = 'loading';
    },
    auth_success(state, token, user) {
      state.status = 'success';
      state.token = token;
      state.user = user;
    },
    auth_error(state) {
      state.status = 'error';
    },
    logout(state) {
      state.status = ''; 
      state.token = '';
    }
  },
  actions: {
    Login({commit}, user) {
      return new Promise((resolve, reject) => {
        commit('auth_request')
        console.log(user)
        axios.post('/auth/login', user)
          .then(resp => {
            const token = resp.data.data[0].token
            const user = resp.data.data[0].user
            axios.defaults.headers.common['Authorization'] = token
            commit('auth_success', token, user)
            resolve(resp)
          })
          .catch(err => {
            commit('auth_error')
            reject(err)
          })
      })
    },
    Logout({ commit, state }) {
      return new Promise((resolve, reject) => {
        axios.get('/auth/logout')
          .then(response => {
            delete axios.defaults.headers.common['Authorization'];
            commit('logout')
            resolve(response)
           })
          .catch(error => {
            reject(error)
          })
      })
    }
  },
  getters: {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status
  }
})
