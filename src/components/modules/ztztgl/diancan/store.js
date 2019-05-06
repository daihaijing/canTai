import { sysClient } from "@/clients/hprose-client";
import * as TYPES from "./mutation-types";
const state = {};
const getters = {};
const mutations = {};
const actions = {
  [TYPES.getAllMenuByMSname]:(context,args) =>
    sysClient.getData('http://localhost:8081/menu/getAllMenuByMSname',args),
//   [TYPES.addOneMenu]:(context,args) =>
//     sysClient.getData('http://localhost:8081/menu/addOneMenu',args),
//   [TYPES.deleteOneMenu]:(context,args) =>
//     sysClient.getData('http://localhost:8081/menu/deleteOneMenu',args),
//   [TYPES.updateOneMenu]:(context,args) =>
//     sysClient.getData('http://localhost:8081/menu/updateOneMenu',args),
};
export default {
  state,
  mutations,
  getters,
  actions
};