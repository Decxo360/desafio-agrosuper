<template>
    <div class="contenedor-general">
        <ul class="opciones">
            <li><router-link class="item" to="General">General</router-link></li>
            <li><router-link class="item" to="Variaciones">Variaciones</router-link></li>
        </ul>
        <div class="filtro">
            <div>
                <input type="checkbox" v-model="filtro.anio2020" name="" id="">
                <label for="">2020</label>
            </div>
            <div>
                <input type="checkbox" v-model="filtro.anio2021" name="" id="">
                <label for="">2021</label>
            </div>
            <div>
                <input type="checkbox" v-model="filtro.anio2022" name="" id="">
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
            <div>
                <label for="">Cada 12 representa un año, parte desde 2020</label>
            </div>
        </div>
        <button style="margin-top: 20px;" @click="filtrar">filtrar</button>
        <h2 v-if="filtro.usdm == true">USDM</h2>
        <div v-show="filtro.usdm == true" class="wrap">
            <Grafico v-if="visible !== false" :comparacion1="proyectado.ingreso" :comparacion2="real.ingreso"
                dato="Ingreso" moneda="USDM"></Grafico>
            <Grafico v-if="visible !== false" :comparacion1="proyectado.costo" :comparacion2="real.costo"
                dato="costo" moneda="USDM"></Grafico>
            <Grafico v-if="visible !== false" :comparacion1="proyectado.gav" :comparacion2="real.gav" dato="real"
                moneda="USDM"></Grafico>
            <Grafico v-if="visible !== false" :comparacion1="proyectado.resultado"
                :comparacion2="real.resultado" dato="resultado" moneda="USDM"></Grafico>
        </div>
        <h2 v-if="filtro.usdton == true">USDTON</h2>
        <div v-show="filtro.usdton == true" class="wrap">
            <Grafico v-if="visible !== false" :comparacion1="proyectado.ingreso" :comparacion2="real.ingreso"
                dato="Ingreso" moneda="usd_ton"></Grafico>
            <Grafico v-if="visible !== false" :comparacion1="proyectado.costo" :comparacion2="real.costo"
                dato="costo" moneda="usd_ton"></Grafico>
            <Grafico v-if="visible !== false" :comparacion1="proyectado.gav" :comparacion2="real.gav" dato="real"
                moneda="usd_ton"></Grafico>
            <Grafico v-if="visible !== false" :comparacion1="proyectado.resultado"
                :comparacion2="real.resultado" dato="resultado" moneda="usd_ton"></Grafico>
        </div>
    </div>
</template>
<script>
import Grafico from '../Home/graficos/Grafico.vue';
import axios from 'axios';
import { ref } from 'vue';
export default {
    components: {
        Grafico
    },
    data() {
        return {
            proyectado: {
                ingreso: null,
                costo: null,
                gav: null,
                resultado: null
            },
            real: {
                ingreso: null,
                costo: null,
                gav: null,
                resultado: null
            },
            filtro: {
                usdm: ref(true),
                usdton: ref(false),
                anio2020: ref(false),
                anio2021: ref(false),
                anio2022: ref(false),
            },
            visible: false
        }
    },
    methods: {
        async getData() {
            let response = await axios({
                method: 'post',
                url: 'http://f11.cl:8090/getCarnesRealProyeccion',
                data: {
                    auth: {
                        username: "devsafio",
                        token: "tokentokentokenABC"
                    },
                    query: {
                        initial_date: {
                            month: 1,
                            year: 2020
                        },
                        end_date: {
                            month: 1,
                            year: 2025
                        }
                    }
                },
                headers: {
                    "Access-Control-Allow-Origin": "*"
                }
            }).then((resp) => { return resp.data })

            this.real.ingreso = response.real.filter((item) => item.concepto == "INGRESO")
            this.real.ingreso.sort((a, b) => { return a.anio - b.anio })
            this.real.costo = response.real.filter((item) => item.concepto == "COSTO")
            this.real.gav = response.real.filter((item) => item.concepto == "GAV")
            this.real.resultado = response.real.filter((item) => item.concepto == "RESULTADO")

            this.proyectado.ingreso = response.proyectado.filter((item) => item.concepto == "INGRESO")
            this.proyectado.ingreso.sort((a, b) => { return a.anio - b.anio })
            this.proyectado.costo = response.proyectado.filter((item) => item.concepto == "COSTO")
            this.proyectado.gav = response.proyectado.filter((item) => item.concepto == "GAV")
            this.proyectado.resultado = response.proyectado.filter((item) => item.concepto == "RESULTADO")
            this.visible = true
        },
        async filtrar() {

            this.filtro.usdm = false
            this.filtro.usdton = false
            this.getData();
            this.visible = false
            
            this.real.ingreso = await this.filtrarXanio(this.real.ingreso)
            this.real.costo = await this.filtrarXanio(this.real.costo)
            this.real.gav = await this.filtrarXanio(this.real.gav)
            this.real.resultado = await this.filtrarXanio(this.real.resultado)
            
            this.proyectado.ingreso = await this.filtrarXanio(this.proyectado.ingreso)
            this.proyectado.costo = await this.filtrarXanio(this.proyectado.costo)
            this.proyectado.gav = await this.filtrarXanio(this.proyectado.gav)
            this.proyectado.resultado = await this.filtrarXanio(this.proyectado.resultado)

            this.filtro.usdm = true
            this.filtro.usdton = true
            this.visible = true
        },
        filtrarXanio(arr) {
            let newarr = []
            let arr2020 = []
            let arr2021 = []
            let arr2022 = []

            if (this.filtro.anio2020) {
               arr2020 = arr.filter((item)=>item.anio == 2020)
               console.log(arr2020);
            }
            if (this.filtro.anio2021) {
               arr2021 = arr.filter((item)=>item.anio == 2021)
            }
            if (this.filtro.anio2022) {
               arr2022 = arr.filter((item)=>item.anio == 2022)
            }
            
            if (arr2020.length !== 0) {
                newarr.push(...arr2020)
            }
            if (arr2021.length !== 0) {
                newarr.push(...arr2021)
            }
            if (arr2022.length !== 0) {
                newarr.push(...arr2022)
            }

            return newarr
        }
    },
    computed:{

    },
    beforeMount() {
        this.getData();
    },
}
</script>
<style scoped>
.contenedor-general {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
}

.wrap {
    width: 100%;
    display: flex;
    flex-wrap: wrap !important;
    gap: 50px;
    justify-content: center;
}


.filtro {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-content: center;
    background: #9a8f8f;
    width: 30%;
    padding-bottom: 10px;
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