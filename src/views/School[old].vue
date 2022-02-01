<script src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.5.9/vue.js"></script>
<template>
  <div class="container">
    <table class="table table-striped">
      <tbody>
      <tr>
        <td colspan="1">
          <form class="well form-horizontal" v-on:submit.prevent="login">
            <fieldset>
              <div class="form-group">
                <label class="col-md-4 control-label">Colegio</label>
                <div class="col-md-8 inputGroupContainer">
                  <div class="input-group"><span class="input-group-addon"><i class="glyphicon glyphicon-user"></i></span><input id="fullName" name="colegio" placeholder="Colegio" class="form-control" required="true" value="" type="text" v-model="colegio"></div>
                </div>
              </div>
              <div class="form-group">
                <label class="col-md-4 control-label">Correo</label>
                <div class="col-md-8 inputGroupContainer">
                  <div class="input-group"><span class="input-group-addon"><i class="glyphicon glyphicon-home"></i></span><input id="postcode" name="correo" placeholder="Correo" class="form-control" required="true" value="" type="text" v-model="correo"> </div>
                </div>
              </div>
              <!-- The second value will be selected initially -->

              <select name="provincia">
                <option  value="value1">Value 1</option>
                <option value="value2" >Value 2</option>
                <option value="value3">Value 3</option>
              </select>
              <select name="distrito">
                <option value="value1">Value 1</option>
                <option value="value2" >Value 2</option>
                <option value="value3">Value 3</option>
              </select>

            </fieldset>
            <input type="submit" class="fadeIn fourth" value="Log In">
          </form>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios';
const llave = localStorage.getItem('rolUsuario');
let regionArray = [];
let provinciaArray = [];



console.log("hola");
console.log(provinciaArray);








axios.interceptors.request.use(
    config =>{
      config.headers.authorization=`Bearer ${llave}`;
      return config;
    },
    error =>{
      console ("error papu xd")
    }
);

axios.get('http://localhost:3000/api/regions')
    .then(regiondata=>{
          regionArray=regiondata.data;
          console.log(regionArray);
          console.log("regionArray");
        }
    )
console.log("hola1", regionArray, "prueba", regionArray);

var select = document.getElementById("select")
for(var i=0;i<regionArray.length;i++)
{
  var option = document.createElement("OPTION"),
      txt=document.createTextNode(regionArray[i]);
  option.appendChild(txt);
  option.setAttribute("value",regionArray[i]);
  select.insertBefore(option,select.lastChild)
}
export default {
  name: "adminForm",
  data: ()=> ({
    colegio: "",
    correo: "",
    region:"re",
    provincia:"pr",
    distrito:2,
    extrakey :llave,
  }),
  methods: {
    login() {
      let json =
          {
            "realName" : this.colegio,
            "buyerMail": this.correo,

            "district": this.distrito,



          };

      console.log(json);
//mounted, v-bind , v-for


      axios.post('http://localhost:3000/api/educational-institutions',json)
          .then (data =>{
            if(data.status==201)
            {

              console.log("todo correcto");
              console.log(data);
              console.log(data);
            }
            else {
              console.log("todo incorrecto");
              console.log(data);
              console.log(data);
              this.error=true;
              this.error_msg ="incorrecto";
            }
          })


    }
  }
}
</script>

<style scoped>

</style>