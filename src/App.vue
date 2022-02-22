<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #92badd;
    display:inline-block;
    text-decoration: none;
    font-weight: 400;
  }
}

html { background-color: #56baed; }
body { font-family: "Poppins", sans-serif; height: 100vh; }

*:focus { outline: none; }

.icon {
  width:60%;
}

form.defForm{
  >div { margin-bottom: 1rem; }

  >.inputrow{
    display: flex;
    flex-wrap: wrap;
    align-items: flex-end;

    label { flex : 1; text-align: left; }
    input { 
      flex : 4; 
      &[type=text]{ text-align: right; border: none; border-bottom: 1px solid #0008; }
      &[type=file]{ text-align: right; font-size: 80%; border: 1px solid #0008; padding : 2px; margin-top: 4px; }
    }
    select { flex: 4; text-align: right; border: 1px solid #0008; align-self: stretch;  }
  }
}
</style>
 