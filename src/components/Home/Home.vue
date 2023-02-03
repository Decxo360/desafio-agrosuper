<template lang="">
    <div class="contenedor-global">
        <div class="contenedor-header">
            <img src="https://uploads-ssl.webflow.com/5e97df93958d593cca9157a4/62c5f54f349880e24852fd07_Logo_agrosuper.png" alt="agrosuperLogo" width="300">
            <h1>General Carnes</h1>
            <img src="https://img.icons8.com/ios/512/user-male-circle.png" alt="icono usuario" width="150">
        </div>
    </div>
    <div class="contenedor">
        <SideBar></SideBar>
        <router-view></router-view>
    </div>
</template>
<script>
import SideBar from './SideBar.vue';
import axios from 'axios'
import apexchart from "apexcharts"
export default {
    components:{
        SideBar,
        apexchart
    },
    data(){
        return{
            proyectado:{
                ingreso : null,
                costo:null,
                gav:null,
                resultado:null
            },
            real:{
                ingreso : null,
                costo:null,
                gav:null,
                resultado:null
            }
        }
    },  
    methods: {
        async getData(){
            let response = await axios({
                method:'post',
                url:'http://f11.cl:8090/getCarnesRealProyeccion',
                data:{
                    auth:{
                        username:"devsafio",
                        token:"tokentokentokenABC"
                    },
                    query:{
                        initial_date:{
                            month:1,
                            year:2020
                        },
                        end_date:{
                            month:1,
                            year:2025
                        }
                    }
                },
                headers:{
                    "Access-Control-Allow-Origin":"*"
                }
            }).then((resp)=>{return resp.data})

            this.real.ingreso = response.real.filter((item)=> item.concepto == "INGRESO")
            this.real.costo = response.real.filter((item)=> item.concepto == "COSTO")
            this.real.gav = response.real.filter((item)=> item.concepto == "GAV")
            this.real.resultado = response.real.filter((item)=> item.concepto == "RESULTADO")

            this.proyectado.ingreso = response.proyectado.filter((item)=> item.concepto == "INGRESO")
            this.proyectado.costo = response.proyectado.filter((item)=> item.concepto == "COSTO")
            this.proyectado.gav = response.proyectado.filter((item)=> item.concepto == "GAV")
            this.proyectado.resultado = response.proyectado.filter((item)=> item.concepto == "RESULTADO")

            console.log("proyectado", this.real)
        }
    },
    beforeMount() {
        this.getData();
    },
}
</script>
<style>

    .contenedor-header{
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        width: 90%;
        background: rgb(248, 244, 244);
    }
    .contenedor{
        display: flex;
        flex-direction: row;
        margin-left: 94px;
        width: 90%;
        align-items: center;
    }
    .contenedor-global{
        display: flex;
        justify-content: center;
        align-items: center;
    }


</style>