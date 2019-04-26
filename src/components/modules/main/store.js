import czsqgl from '../xtsz/czsqgl/store';
import ctsz from '../jcxxgl/ctsz/store';
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
      [TYPES.getWeatherata]:(context,args) => sysClient.getData('http://wthrcdn.etouch.cn/weather_mini',args),
  }
  export default {
    modules:{
      //基础信息管理 axios
      ctsz,

      //系统设置 axios
      czsqgl,
      
    },
    state,
      mutations,
      getters,
      actions,
  };