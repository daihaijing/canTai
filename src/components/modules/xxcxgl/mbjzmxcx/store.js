import { sysClient } from "@/clients/hprose-client";
import * as TYPES from "./mutation-types";
const state = {};
const getters = {};
const mutations = {};
const actions = {
  [TYPES.getAllOrder]:(context,args) =>
    sysClient.getData('http://localhost:8081/order/getAllOrder',args),
  [TYPES.getAllOrderItemByOnumber]:(context,args) =>
    sysClient.getData('http://localhost:8081/order/getAllOrderItemByOnumber',args),
//   [TYPES.addOneNewOrder]:(context,args) =>
//     sysClient.getData('http://localhost:8081/order/addOneNewOrder',args),
//   [TYPES.getAllOrderItemByOnumber]:(context,args) =>
//     sysClient.getData('http://localhost:8081/order/getAllOrderItemByOnumber',args),
//   [TYPES.getOneOrderByOnumber]:(context,args) =>
//     sysClient.getData('http://localhost:8081/order/getOneOrderByOnumber',args),
//   [TYPES.addOneBill]:(context,args) =>
//     sysClient.getData('http://localhost:8081/bill/addOneBill',args),
//   [TYPES.deleteOneOrderItemByOInumber]:(context,args) =>
//     sysClient.getData('http://localhost:8081/order/deleteOneOrderItemByOInumber',args),
};
export default {
  state,
  mutations,
  getters,
  actions
};