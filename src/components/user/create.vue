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
      <tr><td>单位编号</td><td><input type="text" v-model="company_id"></td></tr>
      <tr><td>部门编号</td><td><input type="text" v-model="department_id"></input></td></tr>
      <tr><td>用户名</td><td><input type="text" v-model="username"></td></tr>

      <tr><td>密码</td><td><input type="text" v-model="password"> </td></tr>
      <tr><td>姓名</td><td><input type="text" v-model="name"></td></tr>
      <tr><td>邮箱</td><td><input type="text" v-model="email"></td></tr>
      <tr><td>排序</td><td><input type="text" v-model="order"></td></tr>
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
    name: "create",
    data(){
      return{
        name:'',
        company_id:'',
        department_id:'',
        username:'',
        password:'',
        email:'',

        order:''
      }
    },
    mounted:function(){

    },
    methods: {

      submit:function () {
        this.$axios.post(this.global.repathurl+'api/user/create ',qs.stringify({
          name:this.name,
          company_id:this.company_id,
          department_id:this.department_id,
          username:this.username,
          password:Base64.encode(this.password),
          email:this.email,

          order:this.order,
        }),{
          headers:
            {

              'Content-Type':'application/x-www-form-urlencoded',
              "Authorization": 'Bearer'+' '+token,
            }
        }).then(function (res) {
          console.log(res);
          if(res.data.code=='1'){
            alert('添加成功');
            window.location.href=that.global.pathurl+'user/ulist'
          }else{
            alert('添加失败');
          }
        }).catch(function (err) {
          console.log(err)
        })
      }
    }
  }

</script>

<style scoped>

</style>
