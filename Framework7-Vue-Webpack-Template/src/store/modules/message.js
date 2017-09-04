import * as types from '../mutation-types'

const state = {
  logUser: {}
}

const getters = {
  logUser: state => state.logUser
}

const actions = {
 // checkUserName ({commit}, username, id) {
 //    commit(types.CONFIRM_USERNAME, username, id)
  checkUserName ({commit},  hostInfo) {
     commit(types.CONFIRM_USERNAME, hostInfo)
  }
}

const mutations = {
   //[types.CONFIRM_USERNAME] (state,  username, id) {
   [types.CONFIRM_USERNAME] (state, hostInfo) {
        state.logUser.username = hostInfo.username;
        state.logUser.userId = hostInfo.userId;
//        state.logUser.mailAddress = hostInfo.mailAddress
   }
}

export default {
  state,
  getters,
  actions,
  mutations
}
