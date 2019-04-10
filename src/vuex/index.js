import Vue from 'vue';
import Vuex from 'vuex';
import main from '#mod/main/store';
Vue.use(Vuex);
import {
	Promise
} from 'es6-promise'
window.Promise = Promise;

//注意 ： 对 store 模块注册 时 请 先下载更新此文件，然后再修改提交！
export default new Vuex.Store({
	modules: { main }
});