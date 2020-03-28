<template>
    <div class="world">
        <div id="title">
            <h1>DBZ Universe</h1>
        </div>
        <div id="content">
            <div id="deck">
                <h3 id="else" v-if="totalWorld == 0">{{ before }}</h3>
                <card v-else
                v-for="dato in world"
                :key="dato.id" 
                :name='dato.name' 
                :power="dato.power" 
                :life="dato.life" 
                :file="dato.document"
                @deleted="deleteM(dato)"
                @selected="isOpen = true"
                @click="findChar(dato._id)"
                />
            </div>
            <transition name="fade">
                <modal
                v-show="isOpen"
                @close="isOpen = false"
                :id="characther._id"
                :name="characther.name" 
                :power="characther.power"
                :life="characther.life"
                />
            </transition>
        </div>
    </div>
</template>

<script>
    import card from '../components/card.vue';
    import modal from '../components/editModal.vue';
    import {mapState, mapGetter, mapActions} from 'vuex';

    export default {
        name: 'world',
        components:{
            card,
            modal
        },
        data() {
            return{
                isOpen: false,
                perPage: 12,
                page: 1,
                pages: []
            }
        },
        methods: {
            deleteM(i){
                this.$store.dispatch('deleteWorld', i)
            },
            findChar(a){
                this.$store.dispatch('findWorld',a)
            }
        },
        mounted(){
            this.$store.dispatch('getWorld');
        },
        computed:{
            ...mapState([
                'world',
                'totalWorld',
                'before',
                'characther'
            ])
        }
    }
</script>

<style lang="scss" scoped>
    .world{
        width: 100vw;
        height: auto;
        h1{
            font-size: 2.5vw;
            margin: 1vh;
            text-align: center;
        }

        #content{
            display: flex;
            width: 100vw;
            height: auto;
            justify-content: center;

            #deck{
                width: 86vw;
                padding-bottom: 2vh;

                #else{
                    display: block;
                    margin-right: auto;
                    margin-left: auto;
                    align-self: center;
                }
            }

        }

        .fade-enter-active, .fade-leave-active {
            transition: opacity .3s;
        }
        .fade-enter, .fade-leave-to{
            opacity: 0;
        }
    }
</style>