<template>
  <div>
    <!-- eslint-disable-next-line vue/no-unused-vars -->
    <ValidationObserver ref="observer" v-slot="{ invalid }">
      <b-form novalidate @submit.prevent="onSubmit">
        <b-form-group label="Title" label-for="title">
          <ValidationProvider v-slot="{ errors }" name="title" rules="required">
            <b-form-input
              v-model="form.title"
              :state="errors.length == 0"
              type="text"
              required
              placeholder="Title"
              name="title"
            />
            <b-form-invalid-feedback :state="errors.length == 0">
              Title is required
            </b-form-invalid-feedback>
          </ValidationProvider>
        </b-form-group>
        <b-form-group label="Start" label-for="start">
          <ValidationProvider v-slot="{ errors }" name="start" rules="required">
            <VueCtkDateTimePicker
              v-model="form.start"
              input-class="form-control"
              :state="errors.length == 0"
              name="start"
            />
            <b-form-invalid-feedback :state="errors.length == 0">
              Start is required
            </b-form-invalid-feedback>
          </ValidationProvider>
        </b-form-group>
        <b-form-group label="End" label-for="end">
          <ValidationProvider v-slot="{ errors }" name="end" rules="required">
            <VueCtkDateTimePicker
              v-model="form.end"
              input-class="form-control"
              :state="errors.length == 0"
              name="end"
            />
            <b-form-invalid-feedback :state="errors.length == 0">
              End is required
            </b-form-invalid-feedback>
          </ValidationProvider>
        </b-form-group>
        <b-button type="submit" variant="primary">
          Save
        </b-button>
        <b-button type="button" variant="primary" @click="deleteEvent(form.id)">
          Delete
        </b-button>
      </b-form>
    </ValidationObserver>
  </div>
</template>

<script>
import { requestsMixin } from '../mixins/requestsMixin.js';
import * as moment from 'moment';

export default {
  name: 'CalendarForm',
  mixins: [requestsMixin],
  props: {
    edit: Boolean,
    calendarEvent: Object
  },
  data() {
    return {
      form: {}
    };
  },
  watch: {
    calendarEvent: {
      immediate: true,
      deep: true,
      handler(val) {
        this.form = val || {};
      }
    }
  },
  methods: {
    async onSubmit() {
      const isValid = await this.$refs.observer.validate();
      if (!isValid) {
        return;
      }
      this.form.start = moment(this.form.start).format("YYYY-MM-DD HH:mm:ss");
      this.form.end = moment(this.form.end).format("YYYY-MM-DD HH:mm:ss");
      if (this.edit) {
        await this.editCalendar(this.form);
      } else {
        await this.addCalendar(this.form);
      }
      const response = await this.getCalendar();
      this.$store.commit("setEvents", response.data);
      this.$emit("eventSaved");
    },
    async deleteEvent(id) {
      await this.deleteCalendar(id);
      const response = await this.getCalendar();
      this.$store.commit("setEvents", response.data);
      this.$emit("eventSaved");
    }
  }
};
</script>

<style scoped lang="scss">
  button {
    margin-right: 10px;
  }
</style>
