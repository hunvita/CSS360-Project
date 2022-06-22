import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import 'vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css';
import { ValidationProvider, extend, ValidationObserver } from "vee-validate";
import { required } from "vee-validate/dist/rules";
import VueCtkDateTimePicker from 'vue-ctk-date-time-picker';

extend("required", required);
Vue.component("ValidationProvider", ValidationProvider);
Vue.component("ValidationObserver", ValidationObserver);
Vue.component('VueCtkDateTimePicker', VueCtkDateTimePicker);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
