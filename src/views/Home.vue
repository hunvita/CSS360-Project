<template>
  <div class="demo-app">
    <div class="demo-app-sidebar">
      <div class="demo-app-sidebar-section">
        <h2>Instructions</h2>
        <ul>
          <li>Select dates and you will be prompted to create a new event</li>
          <li>Drag, drop, and resize events</li>
          <li>Click an event to delete it</li>
        </ul>
      </div>
      <div class="demo-app-sidebar-section">
        <label>
          <input
            type="checkbox"
            :checked="calendarOptions.weekends"
            @change="handleWeekendsToggle"
          >
          Toggle weekends
        </label>
      </div>
      <div class="demo-app-sidebar-section">
        <h2>All Events ({{ events.length }})</h2>
        <ul>
          <li v-for="event in events" :key="event.id">
            <b>{{ event.startStr }}</b> <i>{{ event.title }}</i>
          </li>
        </ul>
      </div>
    </div>
    <div class="demo-app-main">
      <FullCalendar
        class="demo-app-calendar"
        :options="calendarOptions"
      >
        <template v-slot:eventContent="arg">
          <b>{{ arg.timeText }}</b>
          <i>{{ arg.event.title }}</i>
        </template>
      </FullCalendar>
    </div>
  </div>
</template>

<script>
import FullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'

export default {
  name: "Home",
  components: {
    FullCalendar // make the <FullCalendar> tag available
  },
  data: function() {
    return {
      calendarOptions: {
        plugins: [
          dayGridPlugin,
          timeGridPlugin,
          interactionPlugin // needed for dateClick
        ],
        headerToolbar: {
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        initialView: 'dayGridMonth',
        // initialEvents: [
        //   {
        //     id: 0,
        //     title: 'All-day event',
        //     start: todayStr
        //   },
        //   {
        //     id: 1,
        //     title: 'Timed event',
        //     start: todayStr + 'T12:00:00'
        //   }
        // ], // alternatively, use the `events` setting to fetch from a feed
        editable: true,
        events: [],
        selectable: true,
        selectMirror: true,
        dayMaxEvents: true,
        weekends: true,
        select: this.handleDateSelect,
        eventClick: this.handleEventClick,
        eventsSet: this.handleEvents
        /* you can update a remote database when these fire:
        eventAdd:
        eventChange:
        eventRemove:
        */
      },
      created: false,
    }
  },
  computed: {
    events() {
      return this.$store.state.events.events
    }
  },
  async created() {
    console.log(this.$store.state.events.events)
    this.calendarOptions.events = this.$store.state.events.events

    this.created = true
  },
  methods: {
    handleWeekendsToggle() {
      this.calendarOptions.weekends = !this.calendarOptions.weekends // update a property
    },
    handleDateSelect(selectInfo) {
      // let title = prompt('Please enter a new title for your event')
      let title = 'Manual event'
      let calendarApi = selectInfo.view.calendar

      calendarApi.unselect() // clear date selection

      if (title) {
        calendarApi.addEvent({
          id: this.$store.state.events.currentEventId,
          title,
          start: selectInfo.startStr,
          end: selectInfo.endStr,
          allDay: selectInfo.allDay
        })
        this.$store.dispatch('events/incrementCurrentEventId')
      }
    },
    handleEventClick(clickInfo) {
      // if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
        clickInfo.event.remove()
      // }
    },
    handleEvents(events) {
      if (!this.created) return
      console.warn(events)
      this.$store.commit('events/setEvents', events)
    }
  }
}
</script>

<style lang='scss' scoped>
  h2 {
    margin: 0;
    font-size: 16px;
  }

  ul {
    margin: 0;
    padding: 0 0 0 1.5em;
  }

  li {
    margin: 1.5em 0;
    padding: 0;
  }

  b { /* used for event dates/times */
    margin-right: 3px;
  }

  .demo-app {
    display: flex;
    min-height: 100%;
    font-family: Arial, Helvetica Neue, Helvetica, sans-serif;
    font-size: 14px;
  }

  .demo-app-sidebar {
    width: 300px;
    line-height: 1.5;
    background: #eaf9ff;
    border-right: 1px solid #d3e2e8;
  }

  .demo-app-sidebar-section {
    padding: 2em;
  }

  .demo-app-main {
    flex-grow: 1;
    padding: 3em;
  }

  .fc { /* the calendar root */
    max-width: 1100px;
    margin: 0 auto;
  }
</style>
