<template>
<div>
  <div>ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd</div>
  <!--<form @submit.prevent="submit">-->
    <!--<input type="text" name="name" v-model="inputtext.name">-->
    <!--<input type="file" name="file" @change="inputtext.file">-->
    <!--<input type="submit" value="提交">-->
  <!--</form>-->

  <form>

    <input type="file" @change="getfile">
    <input type="button" value="提交" @click="submit" >

  </form>
</div>
</template>

<script>
  var qs = require('qs');
  import $ from 'jquery'
  var cookie=require('vue-cookies');
  var token=cookie.get('token');
    export default {
        name: "test",
      data: {

        // inputtext:{}
      },
      methods: {
          getfile(e){
            console.log(e);
          },
        submit: function() {

         // console.log(document.querySelector('input[type=file]').files[0]);
          var _this=this;
          var formData = new FormData();
          formData.append("file", document.querySelector('input[type=file]').files[0]);
          formData.append("menu_table_id", 41);
          // console.log(formData);
          this.$axios.put(_this.global.repathurl+'api/tabledate/pack_zip',{
            "menu_table_id":41,
            "where":[
              ["id","<>","15337"]
            ]

          },{
            headers:
              {

                'Content-Type':'application/json',
                "Authorization": 'Bearer'+' '+token,
              }
          }).then(function (res) {
            console.log(res);
            _this.items=res.data.result;
           /* response.setContentType("application/vnd.ms-excel;charset=utf-8");
            response.setHeader("Content-Disposition", "attachment;filename=test.xls");*/


          })
        }
      },
    }
</script>

<style scoped>

</style>
