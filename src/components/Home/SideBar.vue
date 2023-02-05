<template lang="">
    <div class="container-row">
        <router-link to="Cerdo" class="item">Cerdo</router-link>
        <router-link to="Pollo" class="item">Pollo</router-link>
        <router-link to="Pavo" class="item">Pavo</router-link>
        <router-link to="Editor" class="item">Editor</router-link>
        <router-link to="General" class="item">General</router-link>
    </div>
</template>
<script>
export default {
    
}
</script>
<style scoped>
    .container-row{
        display: flex;
        flex-direction: row;
        align-items: center;
        background: rgb(248, 244, 244);
        width: 90%;
        margin-top: 10px;
        gap: 20px;
    }
    .item{
        align-self: center;
        justify-self: center;
        width: 100%;
        height: 60px;
        text-align: center;
        text-decoration: none;
        font-size: 30px;
        color: black;
    }
    .item:hover{
        cursor: pointer;
        background-color: darkgray;
    }

    .router-link-active{
       color: rgb(211, 148, 11) !important;
        text-decoration: none;
    }
</style>