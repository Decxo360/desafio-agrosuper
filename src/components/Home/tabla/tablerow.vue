<template>
        <td>{{datos.nombre_var}}</td>
        <td>{{datos.anterior}}</td>
        <td v-if="editar == false">{{datos.actual}}</td>
        <td v-if="editar == true"><input v-model="actual"></td>
        <td>{{datos.variacion_porc}}%</td>
        <td><div :style="`border-radius:10px 10px 10px 10px; ${datos.status=='verde'?'background-color:green;':datos.status=='amarillo'?'background-color:yellow;':'background-color:red;'} width:15px; height:15px;`"/></td>
        <td><img width="25" src="https://img.icons8.com/metro/256/edit-file.png" alt="editar" @click="editable"></td>
        <td><input type="checkbox" v-model="datos.checked" @click="obtenerCheckBoxes"></td>
</template>
<script>
export default {
    props: {
        datos: {
            type: Object,
            required: true
        },
        obtenerCheckBoxes:{
            required:true
        }
    },
    data() {
        return {
            editar: false,
            actual: this.datos.actual
        }
    },
    methods: {
        editable() {
            this.editar = !this.editar
        },
    },
}
</script>
<style scoped>
th,
td {
    border: 1px solid black;
    padding: 8px;
    text-align: left;
}

img:hover {
    cursor: pointer;
}
</style>