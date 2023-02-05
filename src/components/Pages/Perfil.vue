<template lang="">
    <h1>Mis Datos</h1>
    <div class="centered">
        <div style="display:flex; flex-direction:column; text-align:center">
            <label for="">Mi nombre</label>
            <input type="text" v-model="nombre">
        </div>
        <div style="display:flex; flex-direction:column; text-align:center">
            <label for="">Mi pass</label>
            <input type="text" v-model="pass">
        </div>
   
        <button @click="logOut">LogOut</button>
    </div>
</template>
<script>
export default {
    data() {
        return {
            nombre:localStorage.getItem("usuario"),
            pass:localStorage.getItem("pass")
        }
    },
    methods: {
        logOut(){
            localStorage.clear()
            localStorage.setItem("isLogged",false);
            this.$router.push({path:'/Login'})
        }
    },
}
</script>
<style scoped>
    .centered{
       display: flex; 
       flex-direction: column;
       gap: 20px;
       background: #918383;
       justify-content: center;
       align-items: center;
       border-radius: 10px 10px 10px 10px;
    }

    button{
        margin-bottom: 10px;
    }

    button:hover{
        background-color: rgb(212, 58, 58) !important;
        color: white;
    }

    input{
        width: 100%;
        height: 50px;
        border-radius: 10px  10px  10px  10px ;
    }
    label{
        color: white;
    }
</style>