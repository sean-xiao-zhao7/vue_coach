export default {
  registerCoachAction(context, formData) {
    const finalCoachData = {
      firstName: formData.first,
      lastName: formData.last,
      description: formData.description,
      hourlyRate: formData.rate,
      areas: formData.areas,
      id: context.rootGetters.userId,
    };
    context.commit('registerCoachMutation', finalCoachData);
  },
};
