export default {
  submitContactRequest(context, payload) {
    const newRequest = {
      id: new Date().toISOString,
      coachId: payload.coachId,
      email: payload.email,
      message: payload.message,
    };
    context.commit('addRequest', newRequest);
  },
  async getRequests(context) {
    // const userId = context.rootGetters.userId;
    const token = context.rootGetters.token;
    const res = await fetch(
      `${process.env.VUE_APP_FBBASE_REQUESTS}?auth=${token}`
    );
    const data = await res.json();

    if (!res.ok) {
      const error = new Error(
        data.message || 'Failed to fetch requests from firebase.'
      );
      throw error;
    }

    console.log(data);
  },
};
