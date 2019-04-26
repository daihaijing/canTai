import { sysClient } from "@/clients/hprose-client";
import * as TYPES from "./mutation-types";
const state = {};
const getters = {};
const mutations = {};
const actions = {
  [TYPES.getCpckData]:(context,args) => sysClient.getData('',args),
};
export default {
  state,
  mutations,
  getters,
  actions
};
