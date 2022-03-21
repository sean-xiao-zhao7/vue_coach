<template>
  <div>
    <section>
      <coach-filter @change-filter="setFilters"></coach-filter>
    </section>
    <section>
      <base-card>
        <div class="controls">
          <base-button mode="outline" @click="setCoaches">Refresh</base-button>
          <base-button link to="/register" v-if="!isCoach"
            >Register</base-button
          >
        </div>
        <div v-if="loading">
          <base-spinner></base-spinner>
        </div>
        <ul v-else-if="!loading && hasCoaches">
          <coach-item
            v-for="coach in filteredCoaches"
            :key="coach.id"
            :id="coach.id"
            :first-name="coach.firstName"
            :last-name="coach.lastName"
            :areas="coach.areas"
            :rates="coach.hourlyRate"
          >
          </coach-item>
        </ul>
        <h3 v-else>No coaches yet.</h3>
      </base-card>
    </section>
  </div>
</template>

<script>
import CoachItem from '../../components/coaches/CoachItem.vue';
import CoachFilter from '../../components/coaches/CoachFilter.vue';

export default {
  components: { CoachItem, CoachFilter },
  data() {
    return {
      loading: false,
      activeFilters: {
        frontend: true,
        backend: true,
        career: true,
      },
      error: null,
    };
  },
  computed: {
    filteredCoaches() {
      const allCoaches = this.$store.getters['coaches/coaches'];
      return allCoaches.filter((c) => {
        if (this.activeFilters.frontend && c.areas.includes('frontend')) {
          return true;
        }
        if (this.activeFilters.backend && c.areas.includes('backend')) {
          return true;
        }
        if (this.activeFilters.career && c.areas.includes('career')) {
          return true;
        }
        return false;
      });
    },
    hasCoaches() {
      return this.$store.getters['coaches/hasCoaches'];
    },
    isCoach() {
      return this.$store.getters['coaches/isCoach'];
    },
  },
  methods: {
    setFilters(newFilters) {
      this.loading = true;
      this.activeFilters = newFilters;
      this.loading = false;
    },
    async setCoaches() {
      this.loading = true;
      try {
        await this.$store.dispatch('coaches/setCoaches');
      } catch (e) {
        alert(e.message);
        this.error = e.message;
      }
      this.loading = false;
    },
  },
  created() {
    this.setCoaches();
  },
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>
