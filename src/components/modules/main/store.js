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
    state,
      mutations,
      getters,
      actions
  };