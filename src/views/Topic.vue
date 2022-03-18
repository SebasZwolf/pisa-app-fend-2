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
                    <label for="n1" >Archivo</label><input  id="n1" name="file" required="true" type="file" accept=".pdf">
                </div>

                <div class="inputrow">
                    <label for="n2" >Area</label>
                    <select id="n2" required="true" type="select" @change="change">
                        <option disabled selected>selecciona un area</option>
                        <option v-for="(a, i) in ['matematicas','ciencias','lenguaje','educación financiera']" :key="a" v-text="a" :value="i + 1"></option>
                    </select>
                </div>

                <div class="inputrow">
                    <label for="n2" >Tema</label>
                    <select id="n2" name="topic" required="true" type="select">
                        <option v-for="(a) in temas" :key="a.id" v-text="a.name" :value="a.id"></option>
                    </select>
                </div>

                <div class="inputrow">
                    <label for="n1" >Tema</label><input     id="n1" name="name" required="true" type="text">
                </div>

                <input type="submit" class="fadeIn fourth" value="Guardar">
            </form>

        </div>
    </div>
</template>

<script lang="ts">
import vue from 'vue';
import axios from '@/util/axiosInstance';

import DefNav from '@/components/nav.vue'

type topic = {
    id : number,
    name : string
}

export default vue.extend({
    data : ()=>({
        temas : [] as topic[],
    }),
    methods : {
        change : function ( e : Event ) {
            axios.get(`/areas/${(e.target as HTMLSelectElement).value}/topics`).then(r => this.temas = r.data as topic[]).catch(err => console.log({...err}));
        },
        send : async function(e : Event){
            const data = Object.fromEntries((new FormData(e.target as HTMLFormElement)).entries());

            const blob = data.file as File;
            const place_holder = "/study-materials";
            
            type returnValue = { id : number, name : string };
            axios.post<returnValue>(place_holder, {
                topic   : data.topic,
                name    : data.name,
                prefix  : '.' + blob.name.split('.').pop(),
            }).then(res => {
                const r : returnValue = res.data;

                axios.post(`${place_holder}/${r.id}/upload`, blob, {
                    headers: { "content-type": blob.type }
                }).then(({status, data}) => console.log( status === 201 ? ['succ', data] : ['fail', data]))
                .catch(console.warn);
                
            }).catch(console.warn);
        }
    },
    components : {
        DefNav
    }
})
</script>

<style lang="scss" scoped>

</style>