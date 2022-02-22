<template>
  <div style="min-height: 100vh; display: flex; align-items: center;">
    <div class="" style="
      text-align: center; max-width: 720px; width: max(90%, 320px);
      margin: auto; border-radius: 12px; padding: 20px;
      background: #fff; box-shadow: 0 20px 60px 0 #0005;">
      <h2>Registrar Institución Educativa</h2>

      <def-nav/>

      <form @submit.prevent="send" class="defForm">
          <div class="inputrow">
            <label for="n1" >Colegio</label><input id="n1" name="coleg" required="true" type="text">
          </div>
          <div class="inputrow">
            <label for="n2">Correo</label> <input id="n2" name="email" required="true" type="text">
          </div>
          <!-- The second value will be selected initially -->

          <div class="select-list" style="display: flex;">
            <div>
              <select name="regi" @change="change" required                              ><option selected disabled value="">Regiones</option><option v-for="(_, i) in regi" :key="i" :value="_.id" v-text="_.name"></option></select>
            </div>
            <div>
              <select name="prov" @change="change" required :disabled="prov.length === 0"><option selected disabled value="">Provincias</option><option v-for="(_, i) in prov" :key="i" :value="_.id" v-text="_.name"></option></select>
            </div>
            <div>
              <select name="dist" @change="change" required :disabled="dist.length === 0"><option selected disabled value="">Distritos</option><option v-for="(_, i) in dist" :key="i" :value="_.id" v-text="_.name"></option></select>
            </div>
          </div>

        <input type="submit" class="fadeIn fourth" value="Registrar">
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import axios from 'axios';
import vue from 'vue';
import DefNav from '@/components/nav.vue'

interface item {
  name : string,
  id : number,
};

const saxios = axios.create({
  baseURL: 'http://localhost:3000/api/',
  headers: {
    authorization : 'Bearer ' + localStorage.getItem('token') as string
  }
});

export default vue.extend({
  data: ()=> ({
    regi : [] as item[],
    prov : [] as item[],
    dist : [] as item[],
  }),
  components : {
    DefNav
  },
  created : function(){ saxios.get('/regions').then(r =>this.regi = r.data as item[]).catch(e=>console.log({...e})); },
  mounted: function() { },
  methods: {
    change(e : Event){
      const targ = e.target as HTMLSelectElement;

      switch(targ.getAttribute('name')){
        case 'regi': saxios.get(`/regions/${targ.value}/provinces`).then(r =>this.prov = r.data as item[]).catch(e=>console.log({...e})); break;
        case 'prov': saxios.get(`/provinces/${targ.value}/districts`).then(r =>this.dist = r.data as item[]).catch(e=>console.log({...e})); break;
        case 'dist': 
          break;
      }
    },
    send : function(e : Event){
      const data = Object.fromEntries((new FormData(e.target as HTMLFormElement)).entries());
      saxios.post('/educational-institutions', {
        realName : data.coleg, buyerMail : data.email, district : data.dist
      }).then( r=>{
        if(r.status !== 201) return console.log('r: ', r.data);
        console.log('success: ', r.data);
      }).catch( e => e.toJSON()).then(console.log);
    }
  }
});
</script>

<style lang="scss" scoped>
  .select-list {
    gap : 1rem;
    flex-wrap: wrap;
    >div {
      flex: 1;
      min-width: 144px;
      overflow: hidden;
        select {
          width: 100%;
          padding : 4px 8px;
        }
    }
  }
</style>