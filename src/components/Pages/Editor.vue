
<template lang="">
    <div class="contenedor-general">
        <div style="display:flex; gap:20px;">
            <div class="variable">
                <router-link to="Variable1">Variabe</router-link>
            </div>
            <div class="variable">
                <router-link to="Editor">Editor</router-link>
            </div>
        </div>
        <table v-show="tabla !== null">
            <tr>
                <th>Variable</th>
                <th>Anterior</th>
                <th>Actual</th>
                <th>Variacion %</th>
                <th>status</th>
                <th>editar</th>
                <th>OK</th>
            </tr>
            <tr v-for="(datos,index) in tabla" :key="index">
                <tablerow :datos="datos" :obtenerCheckBoxes="obtenerCheckboxes"/>
            </tr>
        </table>
        <button :disabled="isDisabled" style="margin-top:20px" @click="generarReporte">Generar Reporte</button>
    </div>
</template>
<script>
import axios from 'axios';
import tablerow from '../Home/tabla/tablerow.vue';
export default {
    components:{
        tablerow
    },
    data() {
        let tabla = null
        let validaciones = {
            variableA:false,
            variableB:false,
            variableC:false,
            variableD:false,
        }
        let isDisabled = true
        let checkbox =""
        return {
            tabla,
            validaciones,
            isDisabled,
            checkbox
        }
    },
    methods: {
        async getEditorSemanal(){
            let response = await axios({
                method:'post',
                url:'https://f11.cl:8090/editorSemanal',
                data:{
                    auth:{
                        username:"devsafio",
                        token:"tokentokentokenABC"
                    }
                }
            }).then((res)=>{return res.data})
            response.data.map((item)=>{
                item.checked = false
            })
            this.tabla = response.data
            let variable1 = localStorage.getItem("variable1") 
            if (variable1!==undefined && variable1 !== null) {
                let variable = JSON.parse(variable1)
                this.tabla.push(variable)
            }
        },
        obtenerCheckboxes(){
            this.checkbox = document.querySelectorAll('input[type="checkbox"]')
            let count = 0 
            this.tabla.map((item,index)=>{
                if (this.checkbox[index].checked == true) {
                    count = count + 1
                }else{
                    count = count - 1
                }
                if (count >= this.checkbox.length) {
                    this.isDisabled = false
                }else{
                    this.isDisabled = true
                }
            })
        },  
        generarReporte(){
            alert("Reporte Generado")
        },
    },
    beforeMount() {
        this.getEditorSemanal()
    },
    watch:{
        tabla(newvalue,oldvalue){
            newvalue.map((item,index)=>{
                if (index == 0) {
                    if (item.checked == true) {
                        this.validaciones.variableA = true
                    }
                }
                if (index == 1) {
                    if (item.checked == true) {
                        this.validaciones.variableB = true
                    }
                }
                if (index == 2) {
                    if (item.checked == true) {
                        this.validaciones.variableC = true
                    }
                }
                if (index == 3) {
                    if (item.checked == true) {
                        this.validaciones.variableD = true
                    }
                }
            })
        },
        validaciones(newvalue,oldvalue){
            console.log(newvalue);
            if (newvalue.variableA == true && newvalue.variableB == true && newvalue.variableC == true && newvalue.variableD == true) {
                this.isDisabled = false
            }
            console.log(newvalue);
        }
    }

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
.variable{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 200px;
    height: 80px;
    background-color: darkgray;
    margin-top: 10px;
    margin-bottom: 10px;
}
.variable a{
    text-decoration: none;
    color: black;
}
.variable:hover{
    background-color: rgb(191, 184, 184);
    cursor: pointer;
}
.router-link-active {
    color: rgb(211, 148, 11) !important;
    text-decoration: none;
}
    
</style>