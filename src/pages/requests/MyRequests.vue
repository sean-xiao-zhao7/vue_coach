<template>
  <section>
    <base-card>
      <header>
        <h2>My requests</h2>
      </header>
      <ul>
        <h3 v-if="!hasRequests">No requests</h3>
        <request-item
          v-for="request in requests"
          :key="request.id"
          :email="request.email"
          :message="request.message"
        ></request-item>
      </ul>
    </base-card>
  </section>
</template>

<script>
import RequestItem from '../../components/requests/RequestItem.vue';

export default {
  components: { RequestItem },
  computed: {
    requests() {
      return this.$store.getters['requests/allRequests'];
    },
    hasRequests() {
      return this.$store.getters['requests/hasRequests'];
    },
  },
};
</script>

<style scoped>
header {
  text-align: center;
}

ul {
  list-style: none;
  margin: 2rem auto;
  padding: 0;
  max-width: 30rem;
}

h3 {
  text-align: center;
}
</style>
