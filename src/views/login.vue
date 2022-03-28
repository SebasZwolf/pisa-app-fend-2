<template>
  <div class="wrapper fadeInDown" style="min-height: 100vh; display: flex; align-items: center;">
    <div style="
      text-align: center;
      max-width: 320px; margin: auto; border-radius: 12px; padding: 20px;
      background: #fff; box-shadow: 0 20px 60px 0 #0005;">
      <!-- Icon -->
      <div class="fadeIn" style="--a-delay: 0;"><img src="@/assets/logo.png" id="icon" alt="User Icon" /></div>

      <!-- Login Form -->
      <form v-on:submit.prevent="login" style="width: 80%; margin: auto;">
        <input type="text"      id="uname" class="fadeIn" style="--a-delay: 1;" name="uname" placeholder="usuario">
        <input type="password"  id="passw" class="fadeIn" style="--a-delay: 2;" name="passw" placeholder="contraseña">

        <button type="submit"   class="fadeIn" style="--a-delay: 3;">Enviar</button>

        <div class="alert alert-danger" style="width: 100%; padding: 4px; font-size: 90%;" role="alert" v-show="error_msg != '' ">
          {{error_msg}}
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import axios from '@/util/axiosInstance';
import vue from 'vue';

export default vue.extend({
  name: "login",
  data: ()=> ({
    error: false,
    error_msg: "",
  }),
  methods: {
    login(e : Event) {
      const data = Object.fromEntries((new FormData(e.target as HTMLFormElement)).entries());

      axios.post('/login', { username : data.uname, password : data.passw })
        .then((r) : string | undefined => {
          if(r.status !== 201) return this.error_msg = r.data as string;

          localStorage.setItem('token', (r.data as { token : string }).token);
          this.$router.push({ name : 'school'});
        }).catch(({ response : { status } }) => {
          this.error_msg = status === 401 ? 'usuario no valido!' : status === 404 ? 'error interno, comunicar al admin' : 'error desconocido, comunicar al admin';
        })    
      return;
    }
  }
})
</script>

<style lang="scss" scoped>
/* FORM TYPOGRAPHY*/
form{
  *{
    margin-bottom: 8px;
    display: inline-block;
    border-radius: 5px;
  }

  button {
    background-color: #56baed;
    border: none;
    color: white;
    padding: 8px 16px;
    text-align: center;
    width: 100%;
    text-decoration: none;
    
    &:hover{ background-color: #3ae; }
    &:not(:active) { box-shadow: 0 2px 8px 0 #0006; }
    &:active { transform: translateY(1px); }
  }

  input[type=text], input[type="password"] {
    background-color: #f6f6f6;
    border: none;
    color: #0d0d0d;
    padding: 8px 16px;
    text-align: center;
    text-decoration: none;
    font-size: 16px;
    width: 100%;
    border: 2px solid #f6f6f6;

    &:focus{ background-color: #fff; border-bottom: 2px solid #5fbae9; }
    &::placeholder{ color: #aaa; }
  }

}

/* ANIMATIONS */

/* Simple CSS3 Fade-in-down Animation */
.fadeInDown {
  animation-name: fadeInDown;
  animation-duration: 1s;
  animation-fill-mode: both;
}

@keyframes fadeInDown {
  from { opacity: 0; transform: translate3d(0, -100%, 0); }
  to { opacity: 1; transform: none; }
}

/* Simple CSS3 Fade-in Animation */
@keyframes fadeIn { from { opacity:0; } to { opacity:1; } }

.fadeIn {
  opacity:0;
  animation: fadeIn ease-in 1;
  animation-fill-mode:forwards;
  animation-duration:1s;
  
  --a-delay : 0;
  animation-delay: calc(.2s + var(--a-delay) * .2s);
}

</style>