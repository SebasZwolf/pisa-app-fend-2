<template>
  <div class="container">
    <table class="table table-striped">
      <tbody>
      <tr>
        <td colspan="1">
          <form class="well form-horizontal" @submit.prevent="send">
            <fieldset>
              <div class="form-group">
                <label class="col-md-4 control-label">Colegio</label>
                <div class="col-md-8 inputGroupContainer">
                  <div class="input-group"><span class="input-group-addon"><i class="glyphicon glyphicon-user"></i></span><input id="fullName" name="coleg" placeholder="Colegio" class="form-control" required="true" value="" type="text"></div>
                </div>
              </div>
              <div class="form-group">
                <label class="col-md-4 control-label">Correo</label>
                <div class="col-md-8 inputGroupContainer">
                  <div class="input-group"><span class="input-group-addon"><i class="glyphicon glyphicon-home"></i></span><input id="postcode" name="email" placeholder="Correo" class="form-control" required="true" value="" type="text"> </div>
                </div>
              </div>
              <!-- The second value will be selected initially -->

              <select name="regi" @change="change" required                              ><option selected disabled value="">Regiones</option><option v-for="(_, i) in regi" :key="i" :value="_.id" v-text="_.name"></option></select>
              <select name="prov" @change="change" required :disabled="prov.length === 0"><option selected disabled value="">Provincias</option><option v-for="(_, i) in prov" :key="i" :value="_.id" v-text="_.name"></option></select>
              <select name="dist" @change="change" required :disabled="dist.length === 0"><option selected disabled value="">Distritos</option><option v-for="(_, i) in dist" :key="i" :value="_.id" v-text="_.name"></option></select>

            </fieldset>
            <input type="submit" class="fadeIn fourth" value="Log In">
          </form>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import axios from 'axios';
import vue from 'vue';

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
  computed : {
  },
  created : function(){ saxios.get('/regions').then(r =>this.regi = r.data as item[]).catch(e=>console.log({...e})); },
  mounted: function() { },
  methods: {
    change(e : Event){
      const targ = e.target as HTMLSelectElement;
      //console.log(targ.getAttribute('name'));

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

<style scoped>

</style>