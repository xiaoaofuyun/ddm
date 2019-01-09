<template>
<div>


  <div>
    <span> <router-link to="/permission/pindex">权限新增</router-link></span>
    <span> <router-link to="/permission/plist">权限列表</router-link></span>
    <span> <router-link to="/permission/prlist">查询角色下所有权限</router-link></span>

  </div>
  <br>
  <div style="">

    <div style="width: 22%;float:left" >
      <table style=" margin: 0 auto;border-collapse:collapse;" border="1">

        <th>按钮编号</th><th>按钮名称</th>


        <tr  v-for="item in items.btns">
          <td>{{item.btns_id}}</td>
          <td>{{item.name}}</td>

        </tr>

      </table>

    </div>
    <div style="width: 24%;float:left">
      <table style=" margin: 0 auto;border-collapse:collapse;" border="1">

        <th>菜单编号</th><th>菜单名称</th>


        <tr  v-for="item in items.menu">
          <td>{{item.tree_menu_id}}</td>
          <td>{{item.name}}</td>

        </tr>

      </table>
    </div>
    <div style="width: 22%;float:left">
      <table style=" margin: 0 auto;border-collapse:collapse;" border="1">

        <th>表编号</th><th>表名称</th>


        <tr  v-for="item in items.table">
          <td>{{item.menu_table_id}}</td>
          <td>{{item.show_name}}</td>

        </tr>

      </table>
    </div>
    <div style="width: 25%;float:left">
      <table style=" margin: 0 auto;border-collapse:collapse;" border="1">

        <th>功能路径</th><th>功能名称</th>


        <tr  v-for="item in items.sys">
          <td>{{item.uri}}</td>
          <td>{{item.name}}</td>

        </tr>

      </table>
    </div>
  </div>

</div>
</template>

<script>
  var qs = require('qs');
  import $ from 'jquery'
  var cookie=require('vue-cookies');
  var token=cookie.get('token');
  console.log(token);
  export default {
    name: "plist",
    mounted:function () {

    this.search();
    },

    data(){
      return{

         items:'',
      }
    },methods:{
      search:function () {

        var _this=this;
        this.$axios.post(_this.global.repathurl+'api/permission/list',qs.stringify({



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
