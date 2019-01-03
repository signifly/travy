import {plugin} from "./lib";
import Vue from "vue";

Vue.use(plugin, {
	api: process.env.API
});

const instance = new Vue({
	el: "#app"
});
