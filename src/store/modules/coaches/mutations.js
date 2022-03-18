export default {
  registerCoachMutation(state, payload) {
    state.coaches.push(payload);
  },
};
