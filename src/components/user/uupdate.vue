<template>
  <div>
    <div class="cptop">
      <span> <router-link to="/user/create">新增用户</router-link></span>
      <span> <router-link to="/user/repwd">修改密码</router-link></span>
      <span> <router-link to="/user/ulist">用户列表</router-link></span>
      <span><router-link to="/user/udlist">部门用户列表</router-link></span>
      <!--  <span><router-link to="/company/update">修改单位</router-link></span>
        <span><router-link to="/company/del">删除单位</router-link></span>-->
    </div>
    <br>
    <form>
      <table class="bianjitable" style="width: 500px;  margin: 0 auto;border-collapse:collapse;" border="1">
        <tr><td>单位</td><td>
          <select name="" v-model="company_id" @change="getdp(company_id)">
          <option v-for="item in citems" :value="item.company_id">
            {{item.name}}
          </option>

        </select>
        </td></tr>
        <tr><td>部门</td><td><select v-model="department_id">
          <option v-for="item in dpitems" :value="item.department_id" >
            {{item.name}}
          </option>

        </select></td></tr>
        <tr><td>用户名</td><td><input type="text" :username="username" id="username"></td></tr>

        <!--<tr><td>密码</td><td><input type="text" :password="password" id="password"> </td></tr>-->
        <tr><td>姓名</td><td><input type="text" :name="name" id="name"></td></tr>
        <tr><td>邮箱</td><td><input type="text" :email="email" id="email"></td></tr>
        <tr><td>排序</td><td><input type="text" :order="order" id="order"></td></tr>
        <!--<tr><td></td><td><input type="button" @click="updatedo" value="更新"></td></tr>-->

      </table>
      <input class="bianjitable_but" type="button" @click="updatedo" value="更新">

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

        order:'',
        citems:'',
        dpitems:'',
      }
    },
    mounted:function(){
     this.update();
      this.csel();
    },
    methods: {
      getdp:function (id) {

        var _this=this;
        this.$axios.post(_this.global.repathurl+'api/department/list',qs.stringify({
          company_id:id


        }),{
          headers:
            {

              'Content-Type':'application/x-www-form-urlencoded',
              "Authorization": 'Bearer'+' '+token,
            }
        }).then(function (res) {
          _this.dpitems=res.data.result;
          //console.log(res);

        })
      },
      csel:function () {
        var _this=this;
        this.$axios.post(_this.global.repathurl+'api/company/list',qs.stringify({



        }),{
          headers:
            {

              'Content-Type':'application/x-www-form-urlencoded',
              "Authorization": 'Bearer'+' '+token,
            }
        }).then(function (res) {
          _this.citems=res.data.result;
          //console.log(res.data.result);

        })
      },
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
          department_id:that.department_id,
          company_id:that.company_id,
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
  .cptop{
    width: 100%;
    height: 50px;
    background-color: #fff;
    border-bottom: 1px solid #ccc;
    text-align: right;
  }
  .cptop span{
    margin-right: 20px;
  }
  .cptop span a{
    line-height: 30px;
    padding: 10px 0;
    box-sizing: border-box;
    text-decoration: none;
    display: inline-block;
  }
  .bianjitable td{
    line-height: 40px;
  }
  .bianjitable input,.bianjitable textarea,.bianjitable select{
    line-height: 40px;
    height: 40px;
    width: 100%;
    margin: 0 auto;
    border: none;
    padding: 0 10px;
    box-sizing: border-box;
  }
  .bianjitable textarea{
    height: auto;
  }
  .bianjitable_but{
    background-color: #579fe9;
    color:#fff;
    width:200px;
    height: 40px;
    line-height: 40px;
    border: none;
    margin: 20px auto;
    font-size: 16px;
    cursor: pointer;
  }
</style>
