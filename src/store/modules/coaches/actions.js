export default {
  registerCoachAction(context, formData) {
    const finalCoachData = {
      firstName: formData.first,
      lastName: formData.last,
      description: formData.description,
      hourlyRate: formData.rate,
      areas: formData.areas,
    };
    const newId = new Date().getTime();
    fetch(`${process.env.VUE_APP_FBBASE}/${newId}.json`, {
      method: 'PUT',
      body: JSON.stringify(finalCoachData),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => {
      if (res.ok) {
        context.commit('registerCoachMutation', {
          ...finalCoachData,
          id: newId,
        });
      }
    });
  },
  setCoaches(context) {
    fetch(`${process.env.VUE_APP_FBBASE}.json`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((data) => {
        const coaches = [];
        for (const key in data) {
          coaches.push({
            firstName: data[key].firstName,
            lastName: data[key].lastName,
            description: data[key].description,
            hourlyRate: data[key].hourlyRate,
            areas: data[key].areas,
          });
        }
        context.commit('setCoaches', coaches);
      });
  },
};
