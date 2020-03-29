<template>
    <div class="card">
        <div id="content">
            <div id="image">
                <img :src="serve+'/uploads/'+file" alt="">
            </div>
            <div id="text">
                <p>Name: {{ name | capital}}
                <p>Power: {{ power | capital}}</p>
                <p>Life: {{ life | capital}}</p>
                <input v-on:click="openModal(), findChar()" type="button" id="edit" value="Edit">
                <input type="button"
                v-on:click="delWorld()"
                id="del" value="Delete">
            </div>
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex';
    import {SERVER_API} from '../main'

    export default {
        name: 'card',
        props:{
            name: String,
            power: Number,
            life: Number,
            file:String
        },
        data(){
            return{
                serve: SERVER_API
            }  
        },
        methods: {
            delWorld(){
                this.$emit('deleted');
            },
            openModal(){
                this.$emit('selected');
            },
            findChar(){
                this.$emit('click')
            }
        },
        filters: {
            capital(value){
                if(!value){ return '' }

                value = value.toString();

                return value.charAt(0).toUpperCase() + value.slice(1)
            }
        },
        computed:{
            
        }
    }
</script>

<style lang="scss" scoped>

    $size: 16px;
    $width: 19vw;

    .card{
        display: inline-block;
        border-radius: 1vw;
        width: $width;
        height: 45vh;
        background-color: #27A4F2;
        color: white;
        margin-left: 2vw;
        margin-top: 2vh;
        box-shadow: 0 0 2px black;

        #content{
            display: flex;
            flex-direction: column;
            align-items: center;
            #image{
                img{
                    border-top-right-radius: 1vw;
                    border-top-left-radius: 1vw;
                    width: $width;
                    height: 25vh;
                }
            }
            #text{
                width: 18.5vw;
            }
        }

        p{
            font-size: $size;
            margin-top: 1vh;
            margin-bottom: 1vh;
            margin-left: 1vw;
        }

        #edit, #del{
            background-color: #8C170D;
            border: none;
            width: 8vw;
            height: 3.5vh;
            font-size: $size;
            margin-left: 1vw;
            margin-top: 1vh;
            color: white;
            border-radius: 1vw;
            box-shadow: 0 0 .5vh black;
        }
    }

</style>