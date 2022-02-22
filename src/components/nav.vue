<template>
  <div class="def-nav">
      <a 
        v-for="(r, i) in routes" :key="i"
        @click="()=>$router.push({ name : r.name })"
        :class="{ active : r.name === current }"        
        v-text="r.display"
        ></a>
  </div>
</template>

<script lang="ts">
import vue from 'vue';
import { routes, linkDetail } from '@/navigation'

export default vue.extend({
    name : 'DefNav',
    data : ()=>({
        
    }),
    /*props : {
        current : {
            type : String,
            default : '',
        }
    },*/
    computed : {
        routes : () : linkDetail[] => routes,
        current : function () { return this.$route.name; },
    },
})
</script>

<style>
.def-nav { font-size : 80%; }
.def-nav > a { margin: 8px; cursor: pointer; }
.def-nav > a.active { pointer-events: none; color: #0e6; }
</style>