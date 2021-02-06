import App from './newApp.js';

const app = Vue.createApp({render: () => Vue.h(App)});
app.mount('#app');