import { sysClient } from "@/clients/hprose-client";
import * as TYPES from "./mutation-types";
const state = {};
const getters = {};
const mutations = {};
const actions = {
<<<<<<< HEAD
  [TYPES.addOneTable]:(context,args) => sysClient.getData('http://localhost:8081/getAllTable/addOneTable',args),
  [TYPES.deleteOneTable]:(context,args) => sysClient.getData('http://localhost:8081/getAllTable/deleteOneTable',args),
  [TYPES.getAllTable]:(context,args) => sysClient.getData('http://localhost:8081/getAllTable/getAllTable',args),
=======
  [TYPES.getAllTable]:(context,args) =>
     sysClient.getData('http://localhost:8081/table/getAllTable',args),
  [TYPES.deleteOneTable]:(context,args) =>
     sysClient.getData('http://localhost:8081/table/deleteOneTable',args),  
  [TYPES.addOneTable]:(context,args) =>
     sysClient.getData('http://localhost:8081/table/addOneTable',args), 
  [TYPES.updateOneTable]:(context,args) =>
     sysClient.getData('http://localhost:8081/table/updateOneTable',args), 
>>>>>>> master
};
export default {
  state,
  mutations,
  getters,
  actions
};

