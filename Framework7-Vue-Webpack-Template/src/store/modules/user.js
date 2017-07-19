import * as types from '../mutation-types'

var dept_a = [];
var dept_b = [];
var dept_c = [];
var dept_d = [];
var userMap = new Map();

const state = {
   logOn: false,
   HttpServer: null,
   contracts: {}
}

const getters = {
   logOn: state => state.logOn,
   HttpServer: state => state.HttpServer,
   contracts: state => state.contracts  
}

const actions = {
  checkout ({ commit }) {
      commit(types.FRESH_LOGSTATE)
  },
  getHttpServer ({ commit }, httpServer ) {
      commit(types.CONNECT_SERVER, httpServer)
  },
  write2json ({ commit }, response_data) {
      commit(types.WRITE_JSON, response_data)
  }
}


const mutations = {
     [types.FRESH_LOGSTATE] (state) {
        state.logOn = true
     },
     [types.CONNECT_SERVER] (state, httpServer) {
        state.HttpServer = httpServer
     },
     [types.WRITE_JSON] (state, response_data) {
       console.log(response_data);
       for ( var index = 0; index < response_data.length; index++)
       {
          if(response_data[index].USER_DEPT == "科室1")
          {
             dept_a.push(response_data[index]);
          }
          if(response_data[index].USER_DEPT == "科室2")
          {
             dept_b.push(response_data[index]);
          }
          if(response_data[index].USER_DEPT == "科室3")
          {
             dept_c.push(response_data[index]);
          }
          if(response_data[index].USER_DEPT == "科室4")
          {
             dept_d.push(response_data[index]);
          }
       }
       state.contracts.科室1 = dept_a;
       state.contracts.科室2 = dept_b;
       state.contracts.科室3 = dept_c;
       state.contracts.科室4 = dept_d;
       console.log("contracts list :")
       console.log(state.contracts);
  } 
}

export default {
  state,
  actions,
  getters,
  mutations
}

