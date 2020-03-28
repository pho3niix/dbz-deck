<template>
    <div class="insert">
        <div id="image">
            <img src="../assets/dbz.jpg" alt="super">
        </div>
        <div id="form">
            <h1 id="titulo">{{ msg }}</h1>
            <div id="forma">
                <input ref="first" v-on:keyup.enter="enviar()" v-model="char" type="text" name="nick" id="character" placeholder="Character Name"><br>
                <input v-on:keyup.enter="enviar()" v-model="power" type="text"
                v-on:keypress="number" name="power" id="power" placeholder="Power"><br>
                <input v-on:keyup.enter="enviar()" v-model="life" type="text" v-on:keypress="number" v-on:input="number" name="life" id="life" placeholder="Life"><br><br>
                <input type="file" name="" id="files" value="Upload image" @change="upload"><br><br>
                <input type="button" value="Save" id="save" v-on:click="enviar()">
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                char: null,
                power: null,
                life: null,
                msg: 'DBZ deck',
                image:''
            }
        },
        mounted() {
            this.$refs.first.focus();
        },
        methods: {
            upload(event){
                let image = event.target.files[0];
                let data = new FormData();
                data.append('image', image, [this.char,this.power,this.life, image.name]);
                this.image = data;
            },
            enviar() {
                if(!this.char || !this.power==null || !this.life || !this.image){
                    alert('Asegurese de llenar todos los campos');
                }else{
                    this.axios.post('/api/newMario', this.image)
                    .then((res)=>{
                        let input = document.getElementById('files');
                        
                        alert('Datos Guardados');
                        this.char = "";
                        this.power = "";
                        this.life = "";
                        this.$refs.first.focus();
                        input.value = "";
                    })
                    .catch(err=>{
                        console.log(err);
                    })
                };
            },
            number ($event) {
                let keyCode = $event.keyCode;
                if ((keyCode < 48 || keyCode > 57) && (keyCode !== 46 || this.price.indexOf('.') != -1)) {
                $event.preventDefault();
                }
            }
        },
    }
</script>

<style lang="scss" scoped>
    $altura: 90vh;
    $ancho: 50vw;

    .insert{
        display: flex;
        width: 100vw;
        height: $altura;
        overflow: hidden;

        input[type="text"]{
            width: 100%;
            margin-top: 2vh;
            margin-bottom: 2vh;
            text-decoration: none;
            border: none;
            border-bottom: 2px solid gray;
            font-size: 1.2vw;
        }

        #image, #form{
            width: $ancho;
            height: $altura;
        }

        #image{
            img{
                width: $ancho;
                height: 90vh;
                margin: 0;
                padding: 0;
            }
        }

        #form{
            display: flex;
            align-items: center;
            flex-direction: column;

            #titulo{
                margin-top: 4vh; 
            }

            #forma{
                margin-top: 5vh;
                width: 80%;
                p{
                    margin-top: 2vh;
                }
            }

            #save{
                background-color: #8C170D;
                color: white;
                padding: 1vw;
                border: none;
                border-radius: .5vw;
                margin-top: 2vh;
                transition: .5s;
                &:hover{
                    box-shadow: 0 0 1vh black;

                }
            }
        }
    }
</style>