<template>
    <v-app>
        <div id="app">
        <nav id="nav">
            <ul>
                <li>
                <router-link class="nav-link" to="/">Home</router-link>
                </li>
                <li>
                <router-link class="nav-link" to="/world">World</router-link>
                </li>
            </ul>
        </nav>
        <router-view/>
    </div>
    </v-app>
</template>

<script>
    export default {
        
    }
</script>

<style lang="scss">
    *{
        font-family: sans-serif;
        margin: 0;
        padding: 0;
    }

    input[type='button']{
        cursor: pointer;
        outline: none;
    }

    input[type=text]:focus{
        outline: none;
    }

    button:focus{
        outline: 0;
    }

    #nav{
        height: 10vh;
        width: 100vw;
        background-color: #F28157;
        display: flex;
        align-items: center;

        a{
            color: rgb(255, 255, 255);
            text-decoration: none;
            &.router-link-exact-active{
                color: #8C170D;
            }
        }

         ul{
             li{
                 float: left;
                 margin-left: 2vw;
                 list-style: none;
                 font-size: 1.4vw;
             }
         }
    }

</style>