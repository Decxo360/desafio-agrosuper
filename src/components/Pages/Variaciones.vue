<template>
    <div style="margin-top: 30px;">
        <ul class="opciones">
                <li><router-link class="item" to="General">General</router-link></li>
                <li><router-link class="item" to="Variaciones">Variaciones</router-link></li>
        </ul>
        <table v-if="tabla !== null">
            <tr>
                <th>Sector</th>
                <th>Sem Ant.</th>
                <th>Sem Act.</th>
                <th>Variacion %</th>
            </tr>
            <tr v-for="datos in tabla" :key="datos.nro">
                <td>{{datos.linea}}</td>
                <td>{{datos.ropSemAnt}}</td>
                <td>{{datos.ropSemActual}}</td>
                <td>{{((datos.ropSemAnt - datos.ropSemActual) / datos.ropSemAnt )*100}}%</td>
            </tr>
        </table>
        <div>
            <textarea cols="100" rows="10" style="overflow-y: scroll; margin-top: 30px; resize: none;" v-model="explicacion">

            </textarea>
        </div>
        <div style="display: flex; justify-content: center;">
            <button @click="guardarRespuesta">Guardar</button>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
export default {
    data() {
        let tabla = null;
        return {
            tabla,
            explicacion: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. At eligendi magnam distinctio non quam rerum quisquam omnis quod voluptatem quidem? Hic similique alias odit quo quidem maiores ullam corporis cupiditate. Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam, esse? Quibusdam, esse placeat nostrum natus vitae nulla sequi, dolorem amet quidem quia iste? Rem consectetur tempora animi iusto placeat magni.Lorem ipsum, dolor sit amet consectetur adipisicing elit. Culpa, ratione tenetur. Ut ea veniam vel velit, magnam minima, voluptatem eaque omnis excepturi assumenda dignissimos? Facilis quod quas odit non aliquam.Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur accusantium voluptates a maxime, facere delectus sit nemo veritatis sequi aperiam iste aliquid dolorem quasi consequatur, ullam ipsam corporis dignissimos molestiae.Lorem ipsum dolor sit amet consectetur, adipisicing elit. Labore ad aliquam molestiae voluptatem sit quisquam exercitationem voluptate distinctio facilis laborum atque a cum vero nesciunt inventore, aliquid tempora veniam maiores."
        }
    },
    methods: {
        async getDataVariaciones(){
            let response = await axios({
                method:"POST",
                url:"https://f11.cl:8090/obtenerVariaciones",
                data:{
                    auth:{
                        username:"devsafio",
                        token:"tokentokentokenABC"
                    }
                }
            }).then((res)=>{return res.data})
            this.tabla = response.data
        },
        guardarRespuesta(){
            localStorage.setItem("explicacion",this.explicacion)
        }
    },
    beforeMount() {
        this.getDataVariaciones()
    },
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