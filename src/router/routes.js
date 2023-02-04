import Login from '../components/auth/Login.vue'
import Home from '../components/Home/Home.vue'
import General from '../components/Pages/General.vue'
import Cerdo from '../components/Pages/Cerdo.vue'
import Editor from '../components/Pages/Editor.vue'
import Pavo from '../components/Pages/Pavo.vue'
import Pollo from '../components/Pages/Pollo.vue'
import Variaciones from '../components/Pages/Variaciones.vue'
import { createRouter, createWebHashHistory } from 'vue-router'

const routes =[
    {
        path:'/',
        component:Home, 
        redirect:'General',      
        children:[
            {path:'General',component:General, name:"General Carnes"},
            {path:'Variaciones',component:Variaciones, name:"General Variaciones"},
            {path:'Cerdo',component:Cerdo},
            {path:'Editor',component:Editor,name:'Editor Semanal'},
            {path:'Pavo',component:Pavo},
            {path:'Pollo',component:Pollo},
        ],

    },
    {
        path:'/Login', 
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