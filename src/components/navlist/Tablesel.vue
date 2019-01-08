<template>
  <div>
    <br>
    <form >

      菜单导航ID <input type="text" :value="menu_id">

      <button @click="submit()" >搜索</button>
    </form>
    <br><br>

  <table style="margin: 0 auto;border-collapse:collapse;" border="1">
    <th>菜单导航ID</th>
    <th>数据表ID</th>
    <th>菜单表名称</th>
    <tr  v-for="item in items">
      <td>{{item.menu_id}}</td>
      <td>{{item.menu_table_id}}</td>
      <td>{{item.table_name}}</td>
    </tr>

  </table>

  </div>
</template>

<script>
  var qs = require('qs');
  import $ from 'jquery'
  var cookie=require('vue-cookies');
  var token=cookie.get('token');

  export default {
    name: "Tableasel",
    data(){
      return{

        menu_id:'11',
        items:'',


      }
    },
    methods:{
      submit:function () {
        var _this=this;
        this.$axios.post(_this.global.repathurl+'api/mtable/info',qs.stringify({

          menu_id:_this.menu_id,

        }),{
          headers:
            {

              'Content-Type':'application/x-www-form-urlencoded',
              "Authorization": 'Bearer'+' '+token,
            }
        }).then(function (res) {
          _this.items=res.data;
          console.log(res);

        })
      }
    }
  }
</script>

<style scoped>

</style>
