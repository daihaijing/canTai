import { sysClient } from "@/clients/hprose-client";
import * as TYPES from "./mutation-types";
const state = {};
const getters = {};
const mutations = {};
const actions = {
  [TYPES.updateStaffPassword]:(context,args) =>
    sysClient.getData('http://localhost:8081/staff/updateStaffPassword',args),
//   [TYPES.addOneStaff]:(context,args) =>
//     sysClient.getData('http://localhost:8081/staff/addOneStaff',args),
//   [TYPES.deleteOneStaff]:(context,args) =>
//     sysClient.getData('http://localhost:8081/staff/deleteOneStaff',args),
//   [TYPES.updateOneStaff]:(context,args) =>
//     sysClient.getData('http://localhost:8081/staff/updateOneStaff',args),
//   [TYPES.getAdminPassword]:(context,args) =>
//     sysClient.getData('http://localhost:8081/staff/getAdminPassword',args),
};
export default {
  state,
  mutations,
  getters,
  actions
};