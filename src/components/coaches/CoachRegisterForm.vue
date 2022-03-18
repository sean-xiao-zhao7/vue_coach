<template>
  <form @submit.prevent="submitForm">
    <div class="form-control" :class="{ invalid: !firstName.valid }">
      <label>First name</label>
      <input
        type="text"
        id="firstname"
        v-model.trim="firstName.value"
        @blur="resetValidity('firstName')"
      />
      <p v-if="!firstName.valid">Please enter first name.</p>
    </div>
    <div class="form-control" :class="{ invalid: !lastName.valid }">
      <label>Last name</label>
      <input
        type="text"
        id="lastname"
        v-model.trim="lastName.value"
        @blur="resetValidity('lastName')"
      />
      <p v-if="!lastName.valid">Please enter last name.</p>
    </div>
    <div class="form-control" :class="{ invalid: !description.valid }">
      <label>Description</label>
      <textarea
        type="text"
        id="description"
        rows="5"
        v-model="description.value"
        @blur="resetValidity('description')"
      ></textarea>
      <p v-if="!description.valid">Please enter a description for yourself.</p>
    </div>
    <div class="form-control" :class="{ invalid: !rate.valid }">
      <label>Hourly rate</label>
      <input
        type="number"
        id="rate"
        v-model.number="rate.value"
        @blur="resetValidity('rate')"
      />
      <p v-if="!rate.valid">Please enter a rate greater than $0/hr.</p>
    </div>
    <div class="form-control" :class="{ invalid: !areas.valid }">
      <h3>Areas of expertise</h3>
      <div>
        <input
          type="checkbox"
          id="frontend"
          value="frontend"
          v-model="areas.value"
          @blur="resetValidity('areas')"
        />
        <label for="frontend">Frontend</label>
      </div>
      <div>
        <input
          type="checkbox"
          id="backend"
          value="backend"
          v-model="areas.value"
        />
        <label for="backend">Backend</label>
      </div>
      <div>
        <input
          type="checkbox"
          id="career"
          value="career"
          v-model="areas.value"
        />
        <label for="career">Career</label>
      </div>
      <p v-if="!areas.valid">Please select at least one area of expertise.</p>
    </div>
    <p v-if="!formIsValid" :class="{ invalid: !formIsValid }">
      Please enter valid info for all the fields.
    </p>
    <base-button>Complete registration</base-button>
  </form>
</template>

<script>
export default {
  emits: ['register-complete'],
  data() {
    return {
      firstName: { value: '', valid: true },
      lastName: { value: '', valid: true },
      description: { value: '', valid: true },
      rate: { value: null, valid: true },
      areas: { value: [], valid: true },
      formIsValid: true,
    };
  },
  methods: {
    resetValidity(input) {
      this[input].valid = true;
    },
    validateForm() {
      this.formIsValid = true;
      if (this.firstName.value === '') {
        this.firstName.valid = false;
        this.formIsValid = false;
      }
      if (this.lastName.value === '') {
        this.lastName.valid = false;
        this.formIsValid = false;
      }
      if (this.description.value === '') {
        this.description.valid = false;
        this.formIsValid = false;
      }
      if (this.rate.value === null || this.rate.value < 0) {
        this.rate.valid = false;
        this.formIsValid = false;
      }
      if (this.areas.value.length <= 0) {
        this.areas.valid = false;
        this.formIsValid = false;
      }
    },
    submitForm() {
      this.validateForm();
      if (this.formIsValid) {
        const formData = {
          first: this.firstName.value,
          last: this.lastName.value,
          description: this.description.value,
          rate: this.rate.value,
          areas: this.areas.value,
        };
        this.$emit('register-complete', formData);
      }
    },
  },
};
</script>

<style scoped>
.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

input[type='checkbox'] + label {
  font-weight: normal;
  display: inline;
  margin: 0 0 0 0.5rem;
}

input,
textarea {
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  font: inherit;
}

input:focus,
textarea:focus {
  background-color: #f0e6fd;
  outline: none;
  border-color: #3d008d;
}

input[type='checkbox'] {
  display: inline;
  width: auto;
  border: none;
}

input[type='checkbox']:focus {
  outline: #3d008d solid 1px;
}

h3 {
  margin: 0.5rem 0;
  font-size: 1rem;
}

.invalid label {
  color: red;
}

.invalid input,
.invalid textarea {
  border: 1px solid red;
}
</style>
