let timer;

export default {
  async auth(context, payload) {
    const res = await fetch(
      payload.mode === 'login'
        ? process.env.VUE_APP_FBSIGNIN
        : process.env.VUE_APP_FBSIGNUP,
      {
        method: 'POST',
        body: JSON.stringify({
          email: payload.email,
          password: payload.password,
          returnSecureToken: true,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    const data = await res.json();
    if (!res.ok) {
      const error = new Error(
        data.message || 'Failed to authenticate within firebase.'
      );
      throw error;
    }

    // save to LS
    localStorage.setItem('token', data.idToken);
    localStorage.setItem('userId', data.localId);

    // set token expiration for auto logout
    const expiresIn = 5000; //+data.expiresIn * 1000;
    const expireDate = new Date().getTime() + expiresIn;
    localStorage.setItem('expirationDate', expireDate);
    timer = setTimeout(() => {
      context.dispatch('logout');
    }, expiresIn);

    // update state
    context.commit('setUser', {
      token: data.idToken,
      userId: data.localId,
      tokenExpiration: data.expiresIn,
    });
  },
  async login(context, payload) {
    context.dispatch('auth', { ...payload, mode: 'login' });
  },
  async signup(context, payload) {
    context.dispatch('auth', { ...payload, mode: 'register' });
  },
  logout(context) {
    if (timer) {
      clearTimeout(timer);
    }
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('expirationDate');
    context.commit('logout');
  },
  autoLogin(context) {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const expirationDate = localStorage.getItem('expirationDate');

    // reset timer
    const newExpiresIn = expirationDate - new Date().getTime();
    clearTimeout(timer);
    timer = setTimeout(() => {
      context.dispatch('logout');
    }, newExpiresIn);

    if (token && userId) {
      context.commit('setUser', {
        token: token,
        userId: userId,
      });
    }
  },
};
