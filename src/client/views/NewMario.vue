<template>
    <div class="insert">
        <div id="image">
            <img src="../assets/dbz.jpg" alt="super">
        </div>
        <form id="form">
            <h1 id="titulo">{{ msg }}</h1>
            <div id="forma">
                <v-text-field ref="first" name="char" v-model="char" label="Character Name"></v-text-field>
                <v-text-field name="power" v-model="power" label="Power" @keypress="number"></v-text-field>
                <v-text-field name="life" v-model="life" label="Life" @keypress="number"></v-text-field>
                <v-file-input v-model="file" label="Subir imagen"></v-file-input>
                <v-btn color="primary" lass="ma-2" @click="enviar()">Enviar 
                    <i style="font-size:25px; color:white; margin-left:4px; margin-top:-1px;" class="mdi mdi-cloud-upload"></i>
                </v-btn>
            </div>
        </form>
        
        <v-snackbar
        bottom
        color="error"
        v-model="barsErr">
            {{textAlert}}
        <v-btn color="red" text @click="barsErr=false">
            <i class="mdi mdi-close-circle-outline"></i>
        </v-btn>
        </v-snackbar>

        <v-snackbar
        top
        color="success"
        v-model="barsSucces">
            <i class="mdi mdi-checkbox-marked-circle"></i>{{textSuccess}}
        <v-btn color="red" text @click="barsSucces=false">
            <i class="mdi mdi-close-circle-outline"></i>
        </v-btn>
        </v-snackbar>
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
                image:'',
                file:[],
                barsErr:false,
                textAlert:'Asegurese de llenar todos los campos',
                barsSucces:false,
                textSuccess:'Archivo guardado'
            }
        },
        mounted() {
            this.$refs.first.focus();
        },
        methods: {
            enviar() {
                let image = this.file;
                if(!image || !this.char || !this.power || !this.life){
                    this.barsErr=true;
                }else{
                    let data = new FormData();
                    data.append('image', image, [this.char,this.power,this.life, image.name]);
                    this.image = data;
                    this.axios.post('/api/newMario', this.image)
                    .then((res)=>{  
                        this.barsSucces=true;
                        this.char = "";
                        this.power = "";
                        this.life = "";
                        this.$refs.first.focus();
                        this.file=[];
                        this.$store.dispatch('getWorld');
                    })
                    .catch(err=>{
                        console.log(err);
                    })
                }
                
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
                margin-top: 2vh;
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