<template>
<div>

  <div>
    <span> <router-link to="/user/create">新增用户</router-link></span>
    <span> <router-link to="/user/repwd">修改密码</router-link></span>
    <span> <router-link to="/user/ulist">用户列表</router-link></span>
    <span><router-link to="/user/udlist">部门用户列表</router-link></span>
    <!--  <span><router-link to="/company/update">修改单位</router-link></span>
      <span><router-link to="/company/del">删除单位</router-link></span>-->
  </div>
  <br>
  <form>

       <table style=" margin: 0 auto;border-collapse:collapse;" border="1">

         <tr><td>用户ID</td><td><input type="text" v-model="user_id"></td></tr>
         <tr><td>密码</td><td><input type="text" v-model="password"></td></tr>
         <tr><td></td><td><input type="button" @click="submit" value="提交"></td></tr>
       </table>

  </form>
</div>
</template>

<script>
  var qs = require('qs');
  import $ from 'jquery'
  var cookie=require('vue-cookies');
  var token=cookie.get('token');
  export default {
    name: "repwd",
    mounted:function () {

    },

    data(){
      return{
        user_id:'',
        password:'',
      }
    },methods:{
      submit:function () {
        var _this=this;
        this.$axios.post(_this.global.repathurl+'api/user/repwd',qs.stringify({
         user_id:this.user_id,
          password:Base64.encode(this.password)


        }),{
          headers:
            {

              'Content-Type':'application/x-www-form-urlencoded',
              "Authorization": 'Bearer'+' '+token,
            }
        }).then(function (res) {
          if(res.data.code=='1'){
            alert('修改密码成功');
            window.location.href=_this.global.pathurl+'user/ulist'
          }else{
            alert('修改失败');
          }

        })
      }
    }
  }
</script>

<style scoped>

</style>
