import Vue from "vue";
import Vuex from "vuex";

import PersistedState from 'vuex-electron-store'

import events from './modules/events'

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [
    PersistedState.create()
  ],
  modules: {
    events
  }
});