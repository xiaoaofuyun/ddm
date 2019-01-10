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
        <tr><td>单位编号</td><td><input type="text" :company_id="company_id" id="company_id"></td></tr>
        <tr><td>部门编号</td><td><input type="text" :department_id="department_id" id="department_id"></input></td></tr>
        <tr><td>用户名</td><td><input type="text" :username="username" id="username"></td></tr>

        <!--<tr><td>密码</td><td><input type="text" :password="password" id="password"> </td></tr>-->
        <tr><td>姓名</td><td><input type="text" :name="name" id="name"></td></tr>
        <tr><td>邮箱</td><td><input type="text" :email="email" id="email"></td></tr>
        <tr><td>排序</td><td><input type="text" :order="order" id="order"></td></tr>
        <tr><td></td><td><input type="button" @click="updatedo" value="更新"></td></tr>

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
    name: "uupdate",
    data(){
      return{
        name:'',
        company_id:'',
        department_id:'',
        username:'',
        // password:'',
        email:'',

        order:''
      }
    },
    mounted:function(){
     this.update();
    },
    methods: {
      update:function() {
        var nid=this.$route.query.id;
        //console.log(nid);
        var that=this;
        that.$axios.post(that.global.repathurl+'api/user/list',qs.stringify({}),{
          headers:
            {

              'Content-Type':'application/x-www-form-urlencoded',
              "Authorization": 'Bearer'+' '+token,
            }
        }).then(function (res) {
          console.log(res);

          for ( var i = 0; i <res.data.length; i++){
            if(res.data[i].user_id==nid){
              // $('#navname').value()=res.data[i].name;
              // res.data[i].name;
              //console.log(res.data[i]);
              $('#name').val(res.data[i].name);
              $('#department_id').val(res.data[i].department_id);
              $('#company_id').val(res.data[i].company_id);
              $('#username').val(res.data[i].username);
              // $('#password').val(res.data[i].password);
              $('#email').val(res.data[i].email);
              $('#order').val(res.data[i].order);





            }
          }

        })


      },updatedo:function () {
        var that=this;
        var nid=this.$route.query.id;
        that.$axios.post(that.global.repathurl+'api/user/update',qs.stringify({
          user_id:nid,



          name: $('#name').val(),
          department_id:$('#department_id').val(),
          company_id:$('#company_id').val(),
          username:Base64.encode($('#username').val()),
          // password:Base64.encode($('#password').val()),
          email:$('#email').val(),

          order:$('#order').val(),
        }),{
          headers:
            {

              'Content-Type':'application/x-www-form-urlencoded',
              "Authorization": 'Bearer'+' '+token,
            }
        }).then(function (res) {
          if(res.data.code=='1'){
            alert('修改成功');
            window.location.href=that.global.pathurl+'user/ulist'
          }else{
            alert('修改失败');
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
