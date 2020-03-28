import Vue from 'vue';
import Vuex from 'vuex';
import Axios from 'axios';
// import vueAxios from 'vue-axios';

Vue.use(Vuex, Axios);

export default new Vuex.Store({
    // variables para almacenar datos 
    state:{
        world: [],
        name: 'Hugo',
        second: 'Carlos',
        totalWorld: 0,
        before: null,
        characther: []
    },
    // cambios en las variables state commit
    mutations:{
        setWorld(state, world){
            state.world = world
        },
        totalWorld(state, total){
            state.totalWorld = total            
        },
        setBefore(state, total){
            if(total==0){
                state.before = 'There are not characthers yet'
            }else{
                state.before = 'Loading...'
            }
        },
        setChar(state, char){
            state.characther = char
        }
    },
    // metodos dispatch asyncronous
    actions:{
        getWorld({commit}){
            Axios
            .get('/api/world')
            .then(res=>{
                let world = res.data; 
                let total = world.length;
                commit('setWorld', world);
                commit('setBefore', total)
                commit('totalWorld', total);
            })
            .catch(err=>{
                console.log(err)
            })
        },
        deleteWorld({dispatch}, i){
            if(confirm('¿Seguro que deseas eliminar este registro?')){
                    Axios.delete('/api/delWorld',{
                        data:{
                            i
                        }
                    })
                    .then(()=>{
                        dispatch('getWorld');
                    })
            }
        },
        findWorld({commit},a){
            Axios
            .get('/api/findChar/' + a) 
            .then(res=>{
                let char = res.data.char;
                commit('setChar', char)
            })
        }
    },
    // obtener informacion una vez cambiada en mutaciones
    getters:{

    }
})