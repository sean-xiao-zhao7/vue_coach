import { createApp, defineAsyncComponent } from 'vue';

import App from './App.vue';

import router from './router.js';
import store from './store/index.js';

const BaseSpinner = defineAsyncComponent(() => {
  return import('./components/UI/BaseSpinner.vue');
});
const BaseCard = defineAsyncComponent(() => {
  return import('./components/UI/BaseCard.vue');
});
const BaseButton = defineAsyncComponent(() => {
  return import('./components/UI/BaseButton.vue');
});
const BaseBadge = defineAsyncComponent(() => {
  return import('./components/UI/BaseBadge.vue');
});

const app = createApp(App);

app.use(router);
app.use(store);

app.component('base-card', BaseCard);
app.component('base-button', BaseButton);
app.component('base-badge', BaseBadge);
app.component('base-spinner', BaseSpinner);

app.mount('#app');
