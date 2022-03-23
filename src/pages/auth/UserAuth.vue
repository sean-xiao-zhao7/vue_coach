<template>
  <form @submit.prevent="submit">
    <base-card>
      <div class="form-control">
        <label>Email</label>
        <input type="email" id="email" v-model.trim="email" />
      </div>
      <div class="form-control">
        <label>Password</label>
        <input type="password" id="password" v-model.trim="password" />
      </div>
      <p v-if="!valid">Please enter all info.</p>
      <base-button v-if="mode === 'login'">Login</base-button>
      <base-button v-else-if="mode === 'register'">Register</base-button>
      <base-button
        type="button"
        mode="flat"
        @click="switchMode"
        v-if="mode === 'login'"
        >Register instead</base-button
      >
      <base-button
        type="button"
        mode="flat"
        @click="switchMode"
        v-if="mode === 'register'"
        >Login instead</base-button
      >
    </base-card>
  </form>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      valid: true,
      mode: 'login',
      loading: false,
      error: null,
    };
  },
  methods: {
    async submit() {
      this.valid = true;
      if (this.email === '' || this.password === '') {
        this.valid = false;
        return;
      }

      this.loading = true;
      try {
        if (this.mode === 'register') {
          await this.$store.dispatch('signup', {
            email: this.email,
            password: this.password,
          });
        } else {
          await this.$store.dispatch('login', {
            email: this.email,
            password: this.password,
          });
        }
        const redirect = '/' + (this.$route.query.redirect || 'coaches');
        this.$router.replace(redirect);
      } catch (err) {
        this.error = err.message || 'Could not sign up user.';
      }
      this.loading = false;
    },
    switchMode() {
      this.mode = this.mode === 'login' ? 'register' : 'login';
    },
  },
};
</script>

<style scoped>
form {
  margin: 1rem;
  padding: 1rem;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

input:focus,
textarea:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}
</style>
