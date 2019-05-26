import { sysClient } from "@/clients/hprose-client";
import * as TYPES from "./mutation-types";
const state = {};
const getters = {};
const mutations = {};
const actions = {
  [TYPES.getAllOrderItemByOnumber]:(context,args) =>
    sysClient.getData('http://localhost:8081/order/getAllOrderItemByOnumber',args),
  [TYPES.addOneBill]:(context,args) =>
    sysClient.getData('http://localhost:8081/bill/addOneBill',args),
  [TYPES.updateTableState]:(context,args) =>
    sysClient.getData('http://localhost:8081/table/updateTableState',args),
  [TYPES.deleteOneOrder]:(context,args) =>
    sysClient.getData('http://localhost:8081/order/deleteOneOrder',args),
  [TYPES.deleteOneOrderItemByOTnumber]:(context,args) =>
    sysClient.getData('http://localhost:8081/order/deleteOneOrderItemByOTnumber',args),
//   [TYPES.addOneBill]:(context,args) =>
//     sysClient.getData('http://localhost:8081/bill/addOneBill',args),
};
export default {
  state,
  mutations,
  getters,
  actions
};