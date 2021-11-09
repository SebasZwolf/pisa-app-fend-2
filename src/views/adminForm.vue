<script src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.5.9/vue.js"></script>
<template>
  <div class="container" id="app">
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

              <ejs-combobox :dataSource='dataItem1' :fields='dataFields1' :change='onChange' placeholder='select a region' sortOrder="Descending" id="regionBox" >

              </ejs-combobox>
              <button type="button" v-on:click="myFunction">Try it</button>

              <ejs-combobox :dataSource='dataItem2' :fields='dataFields2' :change='onchange1' :enabled='penable' :query='childDataQuery2' placeholder='select a province' sortOrder="Descending" id="provinciaBox" >

              </ejs-combobox>

              <ejs-combobox :dataSource='dataItem3' :fields='dataFields3' placeholder='select a district' sortOrder="Descending" id="distritoBox">

              </ejs-combobox>


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
import Vue from "vue";
import {ComboBoxPlugin} from '@syncfusion/ej2-vue-dropdowns';
Vue.use(ComboBoxPlugin);
import {DataManager,WebApiAdaptor} from '@syncfusion/ej2-data';

let provinciaData =1;
    //document.getElementById("regionBox").value;
let distritoData =1;
    //document.getElementById("provinciaBox").value;;
let regionData=1;
    //document.getElementById("distritoBox").value;;
axios.interceptors.request.use(
    config =>{
      config.headers.authorization=`Bearer ${llave}`;
      return config;
    },
    error =>{
      console ("error en llave ")
    }
)


/*var select = document.getElementById("select")
for(var i=0;i<regionArray.length;i++)
{
  var option = document.createElement("OPTION"),
      txt=document.createTextNode(regionArray[i]);
  option.appendChild(txt);
  option.setAttribute("value",regionArray[i]);
  select.insertBefore(option,select.lastChild)
}*/
export default Vue.extend({
  name: "adminForm",
  data: ()=> ({
    penable: false,
    dataItem1: new DataManager({
      headers: [{ 'Authorization': `Bearer ${llave}` }] ,


      url: 'http://localhost:3000/api/regions',
      adaptor:new WebApiAdaptor,
      crossDomain:true
    }),
    //provincia: document.getElementById("regionBox").ej2_instances[0].itemData.id,
    //region:regionData,
    dataFields1: {Value:'id',text:'name'},
    dataItem2: new DataManager({
      headers: [{ 'Authorization': `Bearer ${llave}` }] ,

      url: 'http://localhost:3000/api/regions/'+ regionData+'/provinces' ,
      adaptor:new WebApiAdaptor,
      crossDomain:true
    }),
    childDataQuery2: null,
    dataFields2: {Value:'id',text:'name'},
    //distrito: document.getElementById("provinciaBox").ej2_instances[0].itemData.id,
    dataItem3: new DataManager({
      headers: [{ 'Authorization': `Bearer ${llave}` }] ,

      url: 'http://localhost:3000/api/provinces/'+provinciaData+'/districts',
      adaptor:new WebApiAdaptor,
      crossDomain:true
    }),
    dataFields3: {Value:'id',text:'name'},
    colegio: "",
    correo: "",


  }),
      /* mounted() {
         axios.get('http://localhost:3000/api/regions')
             .then(response=>{
                   regionArray=response.data;
                   console.log(regionArray);
                  // console.log("regionArray");
              // for (var i = 0; i < 3; i++) {
                // regionArray.push(response.data.at(i).name);
               //}
               console.log(regionArray);
               console.log(llave);

            }
        )



  },*/
  computed:
      {


  },
  methods: {
    myFunction: function (){
      var x = document.getElementById("regionBox").ej2_instances[0].itemData.id;
      console.log(x) ;
    },
    onChange : function() {

      regionData =document.getElementById("regionBox").ej2_instances[0].itemData.id;
      console.log(regionData);
      this.dataItem2.url='http://localhost:3000/api/regions/'+ regionData+'/provinces';
      this.penable = true;

    },
    onchange1 : function()

    {
      /*new DataManager({ url: SERVICE_URI, adaptor: new ODataAdaptor, headers:[{ 'syncfusion': 'true' }] })
          .executeQuery(new Query())
          .then((e) => {
            //get result from e.result
          });*/
      console.log("xd");
    },


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
})
</script>

<style scoped>
@import url(https://cdn.syncfusion.com/ej2/material.css);
</style>