<template>
    <div>
        <ul>
            <li v-for="item in world" :key="item._id">{{item.name}}</li>
        </ul>
    </div>
</template>

<script>
    import { mapState } from 'vuex'

    export default {
        name: 'practica',
        data(){
            return{
                name: this.$store.state.name
            }
        },
        methods:{

        },
        mounted(){
            this.$store.dispatch('getWorld')
        },
        computed: {
            ...mapState([
                'world'
            ])
        }
    }
</script>

<style lang="scss" scoped>

</style>