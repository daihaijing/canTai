import { sysClient } from "@/clients/hprose-client";
import * as TYPES from "./mutation-types";
const state = {};
const getters = {};
const mutations = {};
const actions = {
  [TYPES.getAllTable]:(context,args) =>
     sysClient.getData('http://localhost:8081/table/getAllTable',args),
  [TYPES.updateOneTable]:(context,args) =>
     sysClient.getData('http://localhost:8081/table/updateOneTable',args),
  [TYPES.deleteOneReserve]:(context,args) =>
     sysClient.getData('http://localhost:8081/reserve/deleteOneReserve',args),
  [TYPES.updateTableState]:(context,args) =>
   sysClient.getData('http://localhost:8081/table/updateTableState',args),
  [TYPES.addOneNewOrder]:(context,args) =>
    sysClient.getData('http://localhost:8081/order/addOneNewOrder',args),
  [TYPES.deleteOneOrder]:(context,args) =>
    sysClient.getData('http://localhost:8081/order/deleteOneOrder',args),
  [TYPES.deleteOneOrderItemByOTnumber]:(context,args) =>
      sysClient.getData('http://localhost:8081/order/deleteOneOrderItemByOTnumber',args),
  [TYPES.getOneOrderByOnumber]:(context,args) =>
      sysClient.getData('http://localhost:8081/order/getOneOrderByOnumber',args),
  [TYPES.getAllStaff]:(context,args) =>
      sysClient.getData('http://localhost:8081/staff/getAllStaff',args),
  [TYPES.getReserveByNowTime]:(context,args) =>
      sysClient.getData('http://localhost:8081/reserve/getReserveByNowTime',args),
  // [TYPES.deleteOneReserve]:(context,args) =>
  //     sysClient.getData('http://localhost:8081/reserve/deleteOneReserve',args),      
};
export default {
  state,
  mutations,
  getters,
  actions
};