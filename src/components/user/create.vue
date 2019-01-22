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
    <table class="bianjitable" style="width:500px;border-collapse:collapse;" border="1">
      <tr><td>单位</td><td>
        <select name="" v-model="company_id" @change="getdp(company_id)">
          <option v-for="item in citems" :value="item.company_id">
            {{item.name}}
          </option>

        </select>
        <!--<input type="text" v-model="company_id">-->

      </td></tr>
      <tr><td>部门</td><td>

        <select v-model="department_id">
          <option v-for="item in dpitems" :value="item.department_id" >
            {{item.name}}
          </option>

        </select>

      </td></tr>
      <tr><td>用户名</td><td><input type="text" v-model="username"></td></tr>

      <tr><td>密码</td><td><input type="text" v-model="password"> </td></tr>
      <tr><td>姓名</td><td><input type="text" v-model="name"></td></tr>
      <tr><td>邮箱</td><td><input type="text" v-model="email"></td></tr>
      <tr><td>排序</td><td><input type="text" v-model="order"></td></tr>
      <!--<tr><td></td><td><input type="button" @click="submit" value="提交"></td></tr>-->

    </table>
    <input class="bianjitable_but" type="button" @click="submit" value="提交">

  </form>
  </div>
</template>

<script>
  var qs = require('qs');
  import $ from 'jquery'
  var cookie=require('vue-cookies');
  var token=cookie.get('token');
 // console.log(token);
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

        order:'',
        citems:'',
        dpitems:'',
      }
    },
    mounted:function(){
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
      submit:function () {
        this.$axios.post(this.global.repathurl+'api/user/create ',qs.stringify({
          name:this.name,
          company_id:this.company_id,
          department_id:this.department_id,
          username:Base64.encode(this.username),
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
         // console.log(res);
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
  .cptop{
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
