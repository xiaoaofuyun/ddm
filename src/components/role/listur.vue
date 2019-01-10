<template>
<div>

  <div>

    <span> <router-link to="/role/rlist">角色查看</router-link></span>
    <span> <router-link to="/role/rindex">添加角色</router-link></span>
    <span> <router-link to="/role/listur">查询角色关联的用户</router-link></span>
    <span> <router-link to="/role/createur">角色用户关联</router-link></span>

  </div>
  <br>
  <form >

    <table  style=" margin: 0 auto;border-collapse:collapse;" border="1">
      <tr><td>角色编号</td><td><input type="text" v-model="role_id"></td><td><input type="button" @click="search" value="搜索"></td></tr>

    </table>
  </form>
  <table style=" margin: 0 auto;border-collapse:collapse;" border="1">

    <th>用户编号</th>
    <tr  v-for="item in items">
      <td>{{item.user_id}}</td>





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
    name: "listur",
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
        this.$axios.post(_this.global.repathurl+'api/role/listur',qs.stringify({
         role_id:_this.role_id


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
