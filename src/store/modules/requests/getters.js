export default {
  allRequests(state, _, _2, rootGetters) {
    const currentCoachId = rootGetters.userId;
    return state.requests.filter((r) => r.coachId === currentCoachId);
  },
  hasRequests(_, getters) {
    return getters.allRequests && getters.allRequests.length > 0;
  },
};
