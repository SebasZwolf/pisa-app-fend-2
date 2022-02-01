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
</style>
 