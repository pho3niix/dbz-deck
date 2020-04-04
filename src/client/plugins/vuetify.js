import '@mdi/font/css/materialdesignicons.css';
import Vue from 'vue';
import Vuetify,{
    VBtn,
    VApp,
    VFileInput,
    VTextField,
    VSnackbar
} from 'vuetify/lib';
import {Ripple} from 'vuetify/lib/directives';

Vue.use(Vuetify,{
    components:{
        VBtn,
        VApp,
        VFileInput,
        VTextField,
        VSnackbar
    },
    directives:{
        Ripple
    },
    iconfont:'mdi'
});

export default new Vuetify({});