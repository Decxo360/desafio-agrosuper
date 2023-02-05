import Login from '../components/auth/Login.vue'
import Home from '../components/Home/Home.vue'
import General from '../components/Pages/General.vue'
import Cerdo from '../components/Pages/Cerdo.vue'
import Editor from '../components/Pages/Editor.vue'
import Pavo from '../components/Pages/Pavo.vue'
import Pollo from '../components/Pages/Pollo.vue'
import Variaciones from '../components/Pages/Variaciones.vue'
import Variable from '../components/Pages/Variable.vue'
import Perfil from '../components/Pages/Perfil.vue'
import { createRouter, createWebHashHistory } from 'vue-router'

const routes =[
    {
        path:'/',
        component:Home, 
        redirect:'General',      
        beforeEnter: (to, from, next) => {
            let isLogged = JSON.parse(localStorage.getItem("isLogged"))
            if( isLogged!==true){
                next({path:'/Login'})
            }else{
                next()
            }
        },
        children:[
            {path:'General',component:General, name:"General Carnes"},
            {path:'Variaciones',component:Variaciones, name:"General Variaciones"},
            {path:'Editor',component:Editor,name:'Editor Semanal'},
            {path:'Variable1',component:Variable,name:'Variable'},
            {path:'Cerdo',component:Cerdo,name:"Cerdo"},
            {path:'Pavo',component:Pavo,name:"Pavo"},
            {path:'Pollo',component:Pollo,name:"Pollo"},
            {path:'Perfil',component:Perfil,name:"Perfil"},
        ],

    },
    {
        path:'/Login', 
        beforeEnter: (to, from, next) => {
            beforeEnter: (to, from, next) => {
                let isLogged = JSON.parse(localStorage.getItem("isLogged"))
                if( isLogged==true){
                    next({path:'/'})
                }else{
                    next()
                }
            },
        },
        component:Login,
    },
    // {path:'/valoraciones'},
    // {path:'/editor'},
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router