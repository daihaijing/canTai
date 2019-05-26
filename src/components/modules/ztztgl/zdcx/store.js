import { sysClient } from "@/clients/hprose-client";
import * as TYPES from "./mutation-types";
const state = {};
const getters = {};
const mutations = {};
const actions = {
  [TYPES.getAllBill]:(context,args) =>
    sysClient.getData('http://localhost:8081/bill/getAllBill',args),
//   [TYPES.addOneBill]:(context,args) =>
//     sysClient.getData('http://localhost:8081/bill/addOneBill',args),
//   [TYPES.updateTableState]:(context,args) =>
//     sysClient.getData('http://localhost:8081/table/updateTableState',args),
//   [TYPES.getAllOrderItemByOnumber]:(context,args) =>
//     sysClient.getData('http://localhost:8081/order/getAllOrderItemByOnumber',args),
//   [TYPES.getOneOrderByOnumber]:(context,args) =>
//     sysClient.getData('http://localhost:8081/order/getOneOrderByOnumber',args),
//   [TYPES.addOneBill]:(context,args) =>
//     sysClient.getData('http://localhost:8081/bill/addOneBill',args),
};
export default {
  state,
  mutations,
  getters,
  actions
};