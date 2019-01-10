<template>
<div>
  <div>

    <span> <router-link to="/role/rlist">角色查看</router-link></span>
    <span> <router-link to="/role/rindex">添加角色</router-link></span>

  </div>
  <br>
  <form >

     <table  style=" margin: 0 auto;border-collapse:collapse;" border="1">
       <tr><td>单位编号</td><td><input type="text" v-model="company_id"></td><td><input type="button" @click="search" value="搜索"></td></tr>

     </table>
  </form>
  <table style=" margin: 0 auto;border-collapse:collapse;" border="1">

  <th>角色编号</th>  <th>角色名称</th><th>操作</th>
  <tr  v-for="item in items">
    <td>{{item.role_id}}</td>

    <td>{{item.name}}</td>


    <td>

      <router-link :to="{path:'/role/rupdate',query:{id:item.role_id,cid:item.company_id}}">编辑</router-link>
      <router-link :to="{path:'/role/rdel',query:{id:item.role_id,cid:item.company_id}}">删除</router-link>
    </td>
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
    name: "rlist",
    mounted:function () {

      //this.roleshow();
    },

    data(){
      return{
        company_id:'',
        items:'',
      }
    },methods:{
     search:function () {

        var _this=this;
        this.$axios.post(_this.global.repathurl+'api/role/list',qs.stringify({
           company_id:_this.company_id


        }),{
          headers:
            {

              'Content-Type':'application/x-www-form-urlencoded',
              "Authorization": 'Bearer'+' '+token,
            }
        }).then(function (res) {
          _this.items=res.data.result;
          console.log(res);

        })
      }


    }
  }
</script>

<style scoped>

</style>
