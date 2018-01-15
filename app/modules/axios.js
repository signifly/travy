import Vue from "vue";
import axios from "axios";

const api = axios.create({
  baseURL: "https://api.sikane.signifly.com/v1/"
});

Vue.prototype.$http = api;
