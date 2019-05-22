import { sysClient } from "@/clients/hprose-client";
import * as TYPES from "./mutation-types";
const state = {};
const getters = {};
const mutations = {};
const actions = {
  [TYPES.getSomeDepositoryByDtype]:(context,args) => 
    sysClient.getData('http://localhost:8081/depository/getSomeDepositoryByDtype',args),
  [TYPES.getOneDepository]:(context,args) =>
    sysClient.getData('http://localhost:8081/depository/getOneDepository',args),
  [TYPES.updateOneDepositoryDcount]:(context,args) =>
    sysClient.getData('http://localhost:8081/depository/updateOneDepositoryDcount',args),
  [TYPES.reduceOneDepositoryDcount]:(context,args) =>
    sysClient.getData('http://localhost:8081/depository/reduceOneDepositoryDcount',args),
};
export default {
  state,
  mutations,
  getters,
  actions
};
