<template>
    <div class="contenedor-general">
        <ul class="opciones">
                <li><router-link class="item" to="General">General</router-link></li>
                <li><router-link class="item" to="Variaciones">Variaciones</router-link></li>
        </ul>
        <div class="filtro">            
            <div>
                <input type="checkbox" name="" id="">
                <label for="">2020</label>
            </div>
            <div>
                <input type="checkbox" name="" id="">
                <label for="">2021</label>
            </div>
            <div>
                <input type="checkbox" name="" id="">
                <label for="">2022</label>
            </div>
            <div>
                <input v-model="filtro.usdm" type="checkbox" name="" id="">
                <label for="">USDM</label>
            </div>
            <div>
                <input v-model="filtro.usdton" type="checkbox">
                <label for=""> USD_TON</label>
            </div>
        </div>
        <h2 v-if="filtro.usdm == true" >Usdm</h2>
        <div v-if="filtro.usdm == true" class="wrap">
            <Grafico v-if="proyectado.ingreso !== null"  :comparacion1="proyectado.ingreso" :comparacion2="real.ingreso" dato="Ingreso" moneda="USDM"></Grafico>
            <Grafico v-if="proyectado.costo !== null"   :comparacion1="proyectado.costo" :comparacion2="real.costo" dato="costo" moneda="USDM"></Grafico>
            <Grafico v-if="proyectado.gav !== null"  :comparacion1="proyectado.gav" :comparacion2="real.gav" dato="real" moneda="USDM" ></Grafico>
            <Grafico v-if="proyectado.resultado !== null"  :comparacion1="proyectado.resultado" :comparacion2="real.resultado" dato="resultado" moneda="USDM"></Grafico>
        </div>
        <h2 v-if="filtro.usdton==true">USDTON</h2>
        <div v-if="filtro.usdton==true" class="wrap">
            <Grafico v-if="proyectado.ingreso !== null"  :comparacion1="proyectado.ingreso" :comparacion2="real.ingreso" dato="Ingreso" moneda="usd_ton"></Grafico>
            <Grafico v-if="proyectado.costo !== null"   :comparacion1="proyectado.costo" :comparacion2="real.costo" dato="costo" moneda="usd_ton"></Grafico>
            <Grafico v-if="proyectado.gav !== null"  :comparacion1="proyectado.gav" :comparacion2="real.gav" dato="real" moneda="usd_ton" ></Grafico>
            <Grafico v-if="proyectado.resultado !== null"  :comparacion1="proyectado.resultado" :comparacion2="real.resultado" dato="resultado" moneda="usd_ton"></Grafico>
        </div>
    </div>
</template>
<script>
import Grafico from '../Home/graficos/Grafico.vue';
import axios from 'axios';
import { ref } from 'vue';
export default {
    components:{
        Grafico
    },
    data() {
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
            },
            filtro:{
                usdm:ref(true),
                usdton:ref(false),
                anio2020:ref(false),
                anio2021:ref(false),
                anio2022:ref(false),
            }
        }
    },
    methods:{
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
            this.real.ingreso.sort((a,b)=> {return a.anio - b.anio})
            this.real.costo = response.real.filter((item)=> item.concepto == "COSTO")
            this.real.gav = response.real.filter((item)=> item.concepto == "GAV")
            this.real.resultado = response.real.filter((item)=> item.concepto == "RESULTADO")

            this.proyectado.ingreso = response.proyectado.filter((item)=> item.concepto == "INGRESO")
            this.proyectado.ingreso.sort((a,b)=> {return a.anio - b.anio})
            this.proyectado.costo = response.proyectado.filter((item)=> item.concepto == "COSTO")
            this.proyectado.gav = response.proyectado.filter((item)=> item.concepto == "GAV")
            this.proyectado.resultado = response.proyectado.filter((item)=> item.concepto == "RESULTADO")
        }
    },
    beforeMount() {
        this.getData();
    },
}
</script>
<style scoped>

.contenedor-general{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
}

 .wrap{
    width: 100%;
    display: flex;
    flex-wrap: wrap !important;
    gap: 50px;
    justify-content: center;
 }
 

 .filtro{
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    background: #9a8f8f;
    width: 30%;
    padding-top: 10px;
    padding-bottom: 10px;
    padding-left: 10px;
    gap: 20px;
 }
 .opciones {
    display: flex;
    flex-direction: row;
    text-decoration: none;
    list-style-type: none;

}

.opciones li {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: darkgray;
    width: 200px;
    height: 50px;
    text-decoration: none;
}

.opciones li:hover {
    background-color: rgb(79, 86, 92);
    cursor: pointer;

}
.router-link-active {
    color: rgb(211, 148, 11) !important;
    text-decoration: none;
}
.item {
    text-decoration: none;
    color: black;
}
    
</style>