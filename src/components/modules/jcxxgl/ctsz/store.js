import { sysClient } from "@/clients/hprose-client";
import * as TYPES from "./mutation-types";
const state = {};
const getters = {};
const mutations = {};
const actions = {
  [TYPES.addOneTable]:(context,args) => sysClient.getData('/addOneTable',args),
  [TYPES.deleteOneTable]:(context,args) => sysClient.getData('/deleteOneTable',args),
  [TYPES.getAllTable]:(context,args) => sysClient.getData('/getAllTable',args),
};
export default {
  state,
  mutations,
  getters,
  actions
};
