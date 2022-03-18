<template>
  <base-card>
    <section>
      <h2>Register as a coach</h2>
      <coach-form @register-complete="registerComplete"></coach-form>
    </section>
  </base-card>
</template>

<script>
import CoachForm from '../../components/coaches/CoachRegisterForm.vue';

export default {
  components: { CoachForm },
  methods: {
    registerComplete(formData) {
      this.$store.dispatch('coaches/registerCoachAction', formData);
      this.$router.replace('/coaches');
    },
  },
};
</script>
