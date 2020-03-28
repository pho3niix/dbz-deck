<template>
    <div class="edit">
        <div id="modal">
            <input v-show="false" class="item" 
            style="background-color:#bbbbbb;"
             type="text" readonly v-model="id">
            <input ref="first" v-on:keyup.enter="upWorld(), close()" class="item" type="text" v-model="name">
            <input v-on:keyup.enter="upWorld(), close()" class="item" type="text" v-model="power">
            <input v-on:keyup.enter="upWorld(), close()" class="item" type="text" v-model="life">
            <input v-on:click="upWorld(), close()" type="button" id="edit" value="Update"
            >
            <input type="button"
            id="save" value="Cancel" v-on:click="close">
        </div>
    </div>
</template>

<script>
    export default {
        name: 'edit',
        props:{
            name: String,
            power: Number,
            life: Number,
            id: String
        },
        data(){
            return{
                names: this.name,
                powers: this.power,
                lifes: this.life,
                ids: this.id
            }
        },
        methods:{
            close() {
                this.$emit('close');
            },
            upWorld(){
                this.axios.put('/api/upWorld', {
                    id: this.id,
                    name: this.name,
                    power: this.power,
                    life: this.life
                })
                .then(()=>{
                    this.$store.dispatch('getWorld');
                })
            }
        },
        mounted(){
            this.$refs.first.focus();
        },
        computed:{

        }
    }
</script>

<style lang="scss" scoped>

    $size: 16px;

    .edit{
        position: fixed;
        z-index: 9998;
        top: 0;
        left: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100vw;
        height: 100vh;
        background-color: rgba(0, 0, 0, .5);
        transition: opacity .3s ease;
    }

    #modal{
        display: inline-block;
        border-radius: 1vw;
        padding: .5vw;
        width: 20vw;
        height: 26vh;
        background-color: #324759;
        color: white;
        margin-left: 2vw;
        margin-top: 2vh;
        box-shadow: 0 0 2px black;

        .item{
            width: 87.8%;
            height: 4vh;
            border-radius: 1vw;
            text-indent: 1vw;
            margin: 1vh;
            margin-left: 2.4vh;
            font-size: $size;
        }

        .item:nth-child(4){
            margin-bottom: 2.5vh;
        }

        #edit, #save{
            background-color: #24A65C;
            border: none;
            width: 8.2vw;
            height: 4vh;
            font-size: $size;
            margin-left: 1vw;
            color: white;
            border-radius: 1vw;
            box-shadow: 0 0 .5vh black;
        }
        #edit{
            margin-left: 1.4vw;
        }
    }
</style>