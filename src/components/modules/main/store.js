//xtsz
import czsqgl from '../xtsz/czsqgl/store';
import ygxxgl from '../xtsz/ygxxgl/store';
//jcxxgl
import ctsz from '../jcxxgl/ctsz/store';
import fwydj from '../jcxxgl/fwydj/store';
import sfxmsz from '../jcxxgl/sfxmsz/store';
//ztztgl
import kt from '../ztztgl/kt/store';
import diancan from '../ztztgl/diancan/store';
import ctyd from '../ztztgl/ctyd/store';
import qtsy from '../ztztgl/qtsy/store';
//kcgl
import cprk from '../kcgl/cprk/store';
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
      [TYPES.getLogin]:(context,args) => sysClient.getData('',args),
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

      //系统设置 axios
      czsqgl,
      ygxxgl,

      //库存管理
      cprk,
      
    },
    state,
      mutations,
      getters,
      actions,
  };