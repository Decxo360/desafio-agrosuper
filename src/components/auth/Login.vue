<template lang="">
    <div style="display:flex; justify-content:center; align-items:center; width:100%;">
        <div class="container">
            <h1>Login</h1>
            <div class="item-centrado">
                <form action="" class="item-centrado">
                    <label for="">Usuario</label>
                    <input v-model="usuario" type="text" name="" id="">
                    <label for="">Pass</label>
                    <input v-model="pass" type="password">
                </form>
                <span v-if="itsOk == false" class="error">{{errorMessage}}</span>
                <button @click="login">Logearse</button>
            </div>
        </div>
    </div>
</template>
<script>
import { ref } from 'vue';
export default {
    data() {
        return {
            usuario: ref(""),
            pass:ref(""),
            errorMessage:"",
            itsOk:null
        }
    },
    methods:{
        login(){
            if (this.usuario !== null && this.usuario !== "" && this.pass !== null && this.pass !== "") {
                localStorage.setItem("usuario",this.usuario)
                localStorage.setItem("pass",this.pass)
                localStorage.setItem("isLogged", true)
                this.$router.push({path:'/'})                
            }else{
                console.log("falso");
                this.itsOk = false
                this.errorMessage = "Hay campos vacíos, porfavor rellenarlos todos"
            }
        }
    }
}
</script>
<style scoped>

    .container{
        display:flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 50%;
        color: black;
        background-color: rgb(132, 126, 119);
        border-radius: 10px 10px 10px 10px;
    }

    .item-centrado{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
        gap: 15px;
        margin-top: 10px;
        margin-bottom: 30px;
    }
    input{
        width: 50%;
        height: 35px;
        background-color: white;
        color: black;
        border-radius: 10px 10px 10px 10px;
    }

    label{
        color: white;
        font-size: 20px;
    }

    .error{
        color: red;
    }

    h1{
        color: wheat;
    }

    button:hover{
        background-color: rgb(66, 61, 61);
    }
    
</style>