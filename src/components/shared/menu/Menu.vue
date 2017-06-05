<template>
    <nav>
        <ul>
            <li v-for="rota in rotas">
                <router-link :to="rota.path ? rota.path : '/'">{{rota.titulo}}</router-link>
            </li>
        </ul>
    </nav>
</template>

<script>
    export default{

       props: {

           rotas:{//validação da rota
               type: Array,
               required:true
           }
       }

    }
</script>

<style>

</style>