import * as types from '../mutation-types'

var dept_a = [];
var dept_b = [];
var dept_c = [];
var dept_d = [];

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
       for ( var index = 0; index < response_data.length; index++)
       {
          if(response_data[index].Dept == '科室1')
          {
             dept_a.push(response_data[index].username);
          }
          if(response_data[index].Dept == '科室2')
          {
             dept_a.push(response_data[index].username);
          }
          if(response_data[index].Dept == '科室3')
          {
             dept_a.push(response_data[index].username);
          }
          if(response_data[index].Dept == '科室4')
          {
             dept_a.push(response_data[index].username);
          }
       }
       contracts.dept_a = dept_a;
       contracts.dept_b = dept_b;
       contracts.dept_c = dept_c;
       contracts.dept_d = dept_d;
       console.log(contracts);
  } 
}

export default {
  state,
  actions,
  getters,
  mutations
}

