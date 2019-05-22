import { sysClient } from "@/clients/hprose-client";
import * as TYPES from "./mutation-types";
const state = {};
const getters = {};
const mutations = {};
const actions = {
  [TYPES.getTableByNumber]:(context,args) =>
    sysClient.getData('http://localhost:8081/table/getTableByNumber',args),
  [TYPES.addOneOrderItem]:(context,args) =>
    sysClient.getData('http://localhost:8081/order/addOneOrderItem',args),
  [TYPES.updateOrderItemOTnumber]:(context,args) =>
    sysClient.getData('http://localhost:8081/order/updateOrderItemOTnumber',args),
  [TYPES.getAllOrderItemByOnumber]:(context,args) =>
    sysClient.getData('http://localhost:8081/order/getAllOrderItemByOnumber',args),
  [TYPES.updateTableState]:(context,args) =>
    sysClient.getData('http://localhost:8081/table/updateTableState',args),
  [TYPES.deleteOneOrder]:(context,args) =>
    sysClient.getData('http://localhost:8081/order/deleteOneOrder',args),
  [TYPES.updateOrderOTnumber]:(context,args) =>
    sysClient.getData('http://localhost:8081/order/updateOrderOTnumber',args),
};
export default {
  state,
  mutations,
  getters,
  actions
};