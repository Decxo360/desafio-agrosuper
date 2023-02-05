<template lang="">
    <div class="contenedor-global">
        <div class="contenedor-header">
            <img src="https://uploads-ssl.webflow.com/5e97df93958d593cca9157a4/62c5f54f349880e24852fd07_Logo_agrosuper.png" alt="agrosuperLogo" width="300">
            <h1>{{titulo}}</h1>
            <img src="https://img.icons8.com/ios/512/user-male-circle.png" alt="icono usuario" width="150" @click="irPerfil">
        </div>
        <SideBar></SideBar>
    </div>
    <div class="contenedor">
        <div>
        </div>
        <div class="contenedor-global">
            <div style="display:'flex';flex-direction:'wrap'; width:'100%'; justify-content:'center'; align-items:'center'">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>
<script>
import SideBar from './SideBar.vue';
import axios from 'axios'

export default {
    components: {
        SideBar,
    },
    data() {
        let titulo = this.$router.currentRoute.value.name
        return{
            titulo
        }
    },
    methods: {
        irPerfil(){
            this.$router.push({path:'Perfil'})
        }
    },
    updated(){
        this.titulo = this.$router.currentRoute.value.name
    }

}
</script>
<style scoped>
.contenedor-header {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    width: 90%;
    background: rgb(248, 244, 244);
}

.contenedor {
    display: flex;
    flex-direction: row;
    justify-content: start;
    align-content: center;
    margin-left: 94px;
    width: 90%;
    align-items: center;
}

.contenedor-global {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
}

.router-link-active {
    color: rgb(211, 148, 11);
    text-decoration: none;
}
img:hover{
    cursor: pointer;
}
</style>