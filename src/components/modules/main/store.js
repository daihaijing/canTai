//jcxxgl
import ctsz from '../jcxxgl/ctsz/store';
import fwydj from '../jcxxgl/fwydj/store';
import sfxmsz from '../jcxxgl/sfxmsz/store';
//ztztgl
import kt from '../ztztgl/kt/store';
import diancan from '../ztztgl/diancan/store';
import ctyd from '../ztztgl/ctyd/store';
import qtsy from '../ztztgl/qtsy/store';
import hbct from '../ztztgl/hbct/store';
import zdcx from '../ztztgl/zdcx/store';
//kcgl
import cprk from '../kcgl/cprk/store';
//xtsz

//xxcxgl
import mbjzmxcx from '../xxcxgl/mbjzmxcx/store';
import sfxmxsfx from '../xxcxgl/sfxmxsfx/store';
import {
    sysClient
  } from '@/clients/hprose-client'
  import * as TYPES from './mutation-types'

  const state = {
  }
  const getters = {
  }
  const mutations = {
  }
  const actions = {
      [TYPES.getWeatherata]:(context,args) => 
        sysClient.getData('http://wthrcdn.etouch.cn/weather_mini',args),
      [TYPES.getLogin]:(context,args) => 
        sysClient.getData('http://localhost:8081/staff/getOneStaffByIdAndPsw',args),
      [TYPES.getOneStaffByNameAndPsw]:(context,args) => 
        sysClient.getData('http://localhost:8081/staff/getOneStaffByNameAndPsw',args),
      [TYPES.updateStaffPassword]:(context,args) => 
        sysClient.getData('http://localhost:8081/staff/updateStaffPassword',args),
  }
  export default {
    modules:{
      //基础信息管理 axios
      ctsz,
      fwydj,
      sfxmsz,

      //桌台状态管理 axios
      kt,
      diancan,
      ctyd,
      qtsy,
      hbct,
      zdcx,

      //库存管理
      cprk,

      //系统设置
      

      //信息查询管理
      mbjzmxcx,
      sfxmxsfx,
      
    },
    state,
      mutations,
      getters,
      actions,
  };