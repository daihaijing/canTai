import { sysClient } from "@/clients/hprose-client";
import * as TYPES from "./mutation-types";
const state = {};
const getters = {};
const mutations = {};
const actions = {
  //获取全部餐台信息
  [TYPES.getAllTable]:(context,args) =>
     sysClient.getData('http://localhost:8081/table/getAllTable',args),
  //添加预定信息   
  [TYPES.addOneReserve]:(context,args) =>
     sysClient.getData('http://localhost:8081/reserve/addOneReserve',args),
  
};
export default {
  state,
  mutations,
  getters,
  actions
};