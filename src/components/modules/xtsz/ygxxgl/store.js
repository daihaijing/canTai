import { sysClient } from "@/clients/hprose-client";
import * as TYPES from "./mutation-types";
const state = {};
const getters = {};
const mutations = {};
const actions = {
  [TYPES.getAllStaff]:(context,args) =>
     sysClient.getData('http://localhost:8081/staff/getAllStaff',args),
};
export default {
  state,
  mutations,
  getters,
  actions
};