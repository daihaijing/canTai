import { sysClient } from "@/clients/hprose-client";
import * as TYPES from "./mutation-types";
const state = {};
const getters = {};
const mutations = {};
const actions = {
  [TYPES.getMarketByTime]:(context,args) =>
    sysClient.getData('http://localhost:8081/menu/getMarketByTime',args),
};
export default {
  state,
  mutations,
  getters,
  actions
};