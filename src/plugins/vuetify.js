import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    // ... your theme config
  },
  defaultAssets: {
    font: {
      family: 'Montserrat'
    }
  },
  treeShake: true
});
