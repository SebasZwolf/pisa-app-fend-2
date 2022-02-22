<template>
    <div style="min-height: 100vh; display: flex; align-items: center;">
        <div class="" style="
            text-align: center; max-width: 720px; width: max(90%, 320px);
            margin: auto; border-radius: 12px; padding: 20px;
            background: #fff; box-shadow: 0 20px 60px 0 #0005;">
            <h2>Registrar Topico</h2>
            <def-nav/>

            <form @submit.prevent="send" class="defForm">
                <div class="inputrow">
                    <label for="n1" >Archivo</label><input  id="n1" name="file" required="true" type="file">
                </div>

                <div class="inputrow">
                    <label for="n2" >Area</label>
                    <select id="n2" name="area" required="true" type="select">
                        <option v-for="(a, i) in ['matematicas','ciencias','lenguaje','educación financiera']" :key="a" v-text="a" :value="i"></option>
                    </select>
                </div>

                <div class="inputrow">
                    <label for="n1" >Tema</label><input     id="n1" name="tema" required="true" type="text">
                </div>

                <input type="submit" class="fadeIn fourth" value="Guardar">
            </form>

        </div>
    </div>
</template>

<script lang="ts">
import vue from 'vue';
import axios from 'axios';

import DefNav from '@/components/nav.vue'

const saxios = axios.create({
  baseURL: 'http://localhost:3000/api/',
  headers: {
    authorization : 'Bearer ' + localStorage.getItem('token') as string
  }
});

export default vue.extend({
    methods : {
        send : async function(e : Event){
            const data = Object.fromEntries((new FormData(e.target as HTMLFormElement)).entries());
            //console.log(data);

            const blob = data.file as File;
            const place_holder = "/study-materials";

            //lo primero que tengo que hacer es enviar y recibir un Object con el { id y filename }
            //EDUCATIONAL > TOPIC.CONTROLLER -

            const r : { id : number, name : string } = await saxios.post(place_holder, {
                name    : data.nombre,
                topic   : data.area,
                prefix  : data.tema,
            });

            //solo hago pull para provar no mpas no?
            //yo no lo descargo porque ya lo tengo

            //estoy usando TS porque el recurso quizo usar TS, y no se porque y no lo supó usar

            saxios.post(`${place_holder}/${r.id}/upload`, blob, {
                headers: { "content-type": blob.type }
            })
            .then(r => console.log( r.status === 201 ? ['succ', r.data] : ['fail', r.data]))
            .catch(e => console.log('error: ', {...e}))
        }
    },
    components : {
        DefNav
    }
})
</script>

<style lang="scss" scoped>

</style>