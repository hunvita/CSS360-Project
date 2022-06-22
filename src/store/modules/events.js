export default {
  namespaced: true,
  state: {
    events: [],
    currentEventId: 0,
  },
  mutations: {
    setCurrentEventId(state, data) { state.currentEventId = data },
    setEvents(state, data) { state.events = data }
  },
  actions: {
    incrementCurrentEventId({ commit, state }) {
      commit("setCurrentEventId", state.currentEventId + 1)
    },
    async fetchEvents({ commit }) {
      // Fetch events from deep store (database)
      const dummyAPI = [
        {
          id: 0,
          title: "initial 1",
          start: new Date(),
          allDay: true,
        },
        {
          id: 1,
          title: "initial 2",
          start: new Date(),
          end: new Date().setDate(new Date().getDate()+2),
          allDay: true,
        }
      ]
      commit("setEvents", dummyAPI)
      commit("setCurrentEventId", 2)
    },
    async storeEvents({ commit }, payload) {
      commit("setEvents", payload)

      // store to deep store (database)
    }
  }
};
