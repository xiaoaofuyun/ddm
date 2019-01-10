<template>
<div>
  <div>
    <span> <router-link to="/permission/pindex">权限新增</router-link></span>
    <span> <router-link to="/permission/plist">权限列表</router-link></span>
    <span> <router-link to="/permission/prlist">查询角色下所有权限</router-link></span>

  </div>
  <br>

  <form >

    <table  style=" margin: 0 auto;border-collapse:collapse;" border="1">
      <tr><td>角色编号</td><td><input type="text" v-model="role_id"></td><td><input type="button" @click="search" value="搜索"></td></tr>

    </table>
  </form>

  <div style="">

    <div style="width: 22%;float:left" >
      <table style=" margin: 0 auto;border-collapse:collapse;" border="1">

        <th>按钮编号</th><th>按钮名称</th>


        <tr  v-for="item in items.btns">
          <td v-if="item>0">{{item}}</td>
          <td>{{item.name}}</td>

        </tr>

      </table>

    </div>
    <div style="width: 24%;float:left">
      <table style=" margin: 0 auto;border-collapse:collapse;" border="1">

        <th>菜单编号</th><th>菜单名称</th>


        <tr  v-for="item in items.menu">
          <td v-if="item>0">{{item}}</td>
          <td>{{item.name}}</td>

        </tr>

      </table>
    </div>
    <div style="width: 22%;float:left">
      <table style=" margin: 0 auto;border-collapse:collapse;" border="1">

        <th>表编号</th><th>表名称</th>


        <tr  v-for="item in items.table">
          <td v-if="item>0" >{{item}}</td>
          <td>{{item.show_name}}</td>

        </tr>

      </table>
    </div>
    <div style="width: 25%;float:left">
      <table style=" margin: 0 auto;border-collapse:collapse;" border="1">

        <th>功能路径</th><th>功能名称</th>


        <tr  v-for="item in items.sys">
          <td  v-if="item!=0">{{item}}</td>
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
  export default {
    name: "prlist",
    mounted:function () {

      //this.roleshow();
    },

    data(){
      return{
        role_id:'',
        items:'',
      }
    },methods:{
      search:function () {

        var _this=this;
        this.$axios.post(_this.global.repathurl+'api/permission/rlist',qs.stringify({
          role_id:_this.role_id


        }),{
          headers:
            {

              'Content-Type':'application/x-www-form-urlencoded',
              "Authorization": 'Bearer'+' '+token,
            }
        }).then(function (res) {
          var result=res.data[0].permission;

          _this.items=result;
         // console.log(res.data[0].permission);

        })
      }


    }
  }
</script>

<style scoped>

</style>
