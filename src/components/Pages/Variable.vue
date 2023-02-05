<template>
    <div>
        <div style="display: flex;gap: 20px;">
            <div class="editor">
                <router-link to="Variable1">Variable1</router-link>
            </div>
            <div class="editor">
                <router-link to="Editor">Editor</router-link>
            </div>
        </div>
        <div v-if="res!==null">
            <GraficoEditor :comparacion1="serieA.variablex" :comparacion2="serieA.variabley" :comparacion3="serieB.variablex" :comparacion4="serieA.variabley"/>
        </div>
        <div v-if="res!==null" style="display:flex; flex-direction: row; justify-content: center; align-items: center;">
            <div v-if="res!==null" style="display: flex; flex-wrap: wrap; width: 100%; gap: 30px; justify-content: center; align-items: center;">
                <input type="number" v-model="rango" style="width:50%;">
                <input type="range" :min="res.deslizante.min" :max="res.deslizante.max" v-model="rango" style="width:50%;">
                <button style="width:50%;" @click="probarVariable">Probar Variable</button>
                <button style="width:50%; margin-bottom: 10px;" @click="guardarVariable">Guardar Variable</button>
            </div>
            <table>
                <tr>
                    <th>Variable</th>
                    <th>Valor original</th>
                    <th>Valor afectado</th>
                    <th>Variacion %</th>
                </tr>
                <tr>
                    <td>Venta Int.</td>
                    <td>{{ res.afectadas.vta_int }}</td>
                    <td>{{ valorActual.vta_int }}</td>
                    <td :style="valoraciones.vta_int < 0 ? 'color:red' : 'color:blue'">{{ valoraciones.vta_int}}%</td>
                </tr>
                <tr>
                    <td>Venta Nac.</td>
                    <td>{{ res.afectadas.vta_nac }}</td>
                    <td>{{valorActual.vta_nac}}</td>
                    <td :style="valoraciones.vta_nac < 0 ? 'color:red' : 'color:blue'">{{ valoraciones.vta_nac}}%</td>
                </tr>
                <tr>
                    <td>Rop</td>
                    <td>{{ res.afectadas.ingreso }}</td>
                    <td>{{valorActual.ingreso}}</td>
                    <td :style="valoraciones.ingreso < 0 ? 'color:red' : 'color:blue'">{{valoraciones.ingreso}}%</td>
                </tr>
                
            </table>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
import GraficoEditor from '../Home/graficos/GraficoEditor.vue';
import { ref } from 'vue';
export default {
    components:{
        GraficoEditor
    },
    data(){
        let serieA=null;
        let serieB=null;
        let res = null
        let rango = ref(0)
        let valorActual = {
            vta_int:ref(0),
            vta_nac:ref(0),
            ingreso:ref(0)
        }
        let valoraciones = {
            vta_int:ref(0),
            vta_nac:ref(0),
            ingreso:ref(0)
        }
        return{
            serieA,
            serieB,
            res,
            rango,
            valorActual,
            valoraciones
        }
    },
    methods: {
        async getEditorVariables(){
            let response = await axios({
                method:"post",
                url:'http://f11.cl:8090/editorVariables',
                data:{
                    auth:{
                        username:"devsafio",
                        token:"tokentokentokenABC"
                    },
                    var_name:"variableA"
                }
            }).then((res)=>{return res.data})

            this.serieA = {
                variablex:response.data.serie_A.x,
                variabley:response.data.serie_A.y
            }
            this.serieB = {
                variablex:response.data.serie_B.x,
                variabley:response.data.serie_B.y
            }
            this.res = response.data
        },
        async probarVariable(){
            let response = await axios({
                method:'post',
                url:'http://f11.cl:8090/probarVariable',
                data:{
                    auth:{
                        username:"devsafio",
                        token:"tokentokentokenABC"
                    },
                    var_name:"variableA",
                    value_test:this.rango
                }
            }).then((res)=>{return res.data})
            response.data.map((item)=>{
                if (item.var_afectada_name=='ingreso') {
                    this.valorActual.ingreso = item.var_afectada_value
                }
                if (item.var_afectada_name=='vta_int') {
                    this.valorActual.vta_int = item.var_afectada_value
                }
                if (item.var_afectada_name=='vta_nac') {
                    this.valorActual.vta_nac = item.var_afectada_value
                }
           })

           this.valoraciones.ingreso = ((this.valorActual.ingreso-this.res.afectadas.ingreso)/this.res.afectadas.ingreso)*100
           this.valoraciones.vta_int = ((this.valorActual.vta_int-this.res.afectadas.vta_int)/this.res.afectadas.vta_int)*100
           this.valoraciones.vta_nac = ((this.valorActual.vta_nac-this.res.afectadas.vta_nac)/this.res.afectadas.vta_nac)*100
        },
        guardarVariable(){
            if (this.rango !== 0 ) {
                let variable={
                    nombre_var:'variable1',
                    anterior:  this.res.afectadas.vta_nac,
                    actual:  this.valorActual.vta_nac,
                    variacion_porc : ((this.valorActual.vta_nac-this.res.afectadas.vta_nac)/this.res.afectadas.vta_nac)*100
                }
                localStorage.setItem("variable1",JSON.stringify(variable))
                this.$router.push({path:"Editor"})
            }
        }
    },
    beforeMount(){
        this.getEditorVariables()
    }
}
</script>
<style scoped>

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  border: 1px solid black;
  padding: 8px;
  text-align: left;
}

th {
  background-color: #f2f2f2;
  font-weight: bold;
}
.editor{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 200px;
    height: 80px;
    background-color: darkgray;
    margin-top: 10px;
    margin-bottom: 10px;
}
.editor a{
    text-decoration: none;
    color: black;
}
.editor:hover{
    background-color: rgb(191, 184, 184);
    cursor: pointer;
}
.router-link-active {
    color: rgb(211, 148, 11) !important;
    text-decoration: none;
}
    
</style>