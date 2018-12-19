import {plugin} from "./lib";
import Vue from "vue";
Vue.use(plugin);

const instance = new Vue({
	el: "#app"
});

window.travy = instance;
window.Vue = Vue;
