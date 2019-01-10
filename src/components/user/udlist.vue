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
  <form >

    <div class="pindex_top">
      <h2>单位：  </h2> <select name="" v-model="company_id" @change="getdp(company_id)" style="height: 30px;width: 300px">
      <option v-for="item in citems" :value="item.company_id">
        {{item.name}}
      </option>

    </select>
      <h2>  &nbsp;部门 ：  </h2>
      <select v-model="department_id" style="width: 300px;height: 30px;">
      <option v-for="item in dpitems" :value="item.department_id" >
        {{item.name}}
      </option>

    </select>&nbsp;&nbsp;&nbsp;&nbsp;
      <button @click="csel()" >&nbsp;搜索</button>
    </div>
    <!--部门编号ID <input type="text" v-model="department_id">-->

    <!--<button @click="csel()" >搜索</button>-->
  </form>
  <table class="yhtable" style=" width: 98%; margin: 20px auto;border-collapse:collapse;" border="1">

    <th>用户编号</th>  <th>公司组编号</th><th>姓名</th><th>用户名</th><th>邮箱</th><th>操作</th>
    <tr  v-for="item in items">
      <td>{{item.user_id}}</td>
      <td>{{item.company_group_id}}</td>
      <td>{{item.name}}</td>
      <td>{{item.username}}</td>
      <td>{{item.email}}</td>
      <td>

        <router-link :to="{path:'/user/uupdate',query:{id:item.user_id}}">编辑</router-link>
        <router-link :to="{path:'/user/udel',query:{id:item.user_id}}">删除</router-link>
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
    name: "udlist",
    mounted:function () {
     this.compsel();
    },

    data(){
      return{
        department_id:'',
        company_id:'',
        items:'',
        citems:'',
        dpitems:'',
      }
    },methods:{
      compsel:function () {
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
        this.$axios.post(_this.global.repathurl+'api/user/dlist',qs.stringify({
          department_id:this.department_id


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
  .yhtable{
    margin-bottom: 40px;
  }
  .yhtable th{
    line-height: 40px;
    background-color: #f7f7f7;
  }
  .yhtable td{
    line-height: 40px;
  }
  .pindex_top{
    width: 98%;
    margin: 20px auto;
    font-size: 0;
    text-align: left;
  }
  .pindex_top h2{
    display: inline-block;
    vertical-align: middle;
    font-size: 18px;
    color:#333;
    line-height: 30px;
  }
  .pindex_top input{
    display: inline-block;
    vertical-align: middle;
    height: 30px;
    line-height: 30px;
    padding: 0 10px;
    box-sizing: border-box;
    margin: 0 15px;
  }
  .pindex_top button{
    display: inline-block;
    vertical-align: middle;
    height: 30px;
    line-height: 30px;
    padding: 0 10px;
    box-sizing: border-box;
    /*margin: 0 15px;*/
  }
</style>
