<template>
  <div>
     <h1 class="centralizado">{{titulo}}</h1>
     <p class="centralizado">{{mensagem}}</p>
     <input type="search" class="filtro" @input="filtro=$event.target.value" placeholder="Filtre pelo Título">

     {{filtro}}
     <ul class="lista-fotos">
      <li class="lista-fotos-item" v-for="foto of fotosComFiltro">
        <meu-painel :titulo="foto.titulo">
           <imagem-responsiva v-meu-transform:scale.animate="1.1" :url="foto.url" :titulo="foto.titulo"/>
           <meu-botao 
            tipo="botao" 
            rotulo="Remover" 
            @botaoAtivado="remove(foto)"
            :confirmacao="true"
            estilo="perigo"/>
           
        </meu-painel>
       
            
      </li>
     </ul>
  </div>
</template>

<script>
import Painel from '../shared/painel/Painel.vue';
import ImagemResponsiva from '../shared/imagem-responsiva/ImagemResponsiva.vue';
import Botao from '../shared/botao/Botao.vue';
import FotoService from '../../domain/foto/FotoService';

export default {

    components:{
      'meu-painel':Painel, //define nome do painel para meu-painel
      'imagem-responsiva':ImagemResponsiva,
      'meu-botao':Botao
    },
    data(){
      return {
        titulo: 'Alurapic',
        fotos: [],
        filtro: '',
        mensagem:''
      }
    },
    computed:{//computed property
      fotosComFiltro(){
        if(this.filtro){//se houver filtro
          let exp = new RegExp(this.filtro.trim(),'i');//i de insensitive
          return this.fotos.filter(foto=>exp.test(foto.titulo));
        }else{
          return this.fotos;
        }
      }
    },

    methods:{
      remove(foto){

        this.service.apaga(foto._id)
          .then(
            () => {
            let indice = this.fotos.indexOf(foto); // acha a posição da foto na lista
            this.fotos.splice(indice, 1); // a instrução altera o array
            this.mensagem = 'Foto removida com sucesso'
           }, 
           err => {
            this.mensagem = 'Não foi possível remover a foto';
          });


         
      }
    },

    created(){

    this.service = new FotoService(this.$resource); 

    this.service
      .lista()
      .then(fotos => this.fotos = fotos, err => console.log(err));
    }
  }
</script>

<style>
  
  .centralizado{
    text-align: center;
  }

  .lista-fotos{
    list-style:none;
  }

  .lista-fotos .lista-fotos-item{
    display: inline-block;
  }

  .filtro{
    display:block;
    width:100%;
  }

</style>
