<template>
<div>

  <div class="cptop">

    <span> <router-link to="/role/rlist">角色查看</router-link></span>
    <span> <router-link to="/role/rindex">添加角色</router-link></span>
    <span> <router-link to="/role/listur">查询角色关联的用户</router-link></span>
    <span> <router-link to="/role/createur">角色用户关联</router-link></span>

  </div>
  <br>
  <form >

    <!--<table  style=" margin: 0 auto;border-collapse:collapse;" border="1">-->
      <!--<tr><td>角色编号</td><td><input type="text" v-model="role_id"></td><td><input type="button" @click="search" value="搜索"></td></tr>-->

    <!--</table>-->
    <div class="pindex_top">
      <h2>单位：</h2>
      <select name="" v-model="company_id" @change="getdp(company_id)" style="width: 300px;height: 30px;">
        <option v-for="item in citems" :value="item.company_id">
          {{item.name}}
        </option>

      </select>
      <h2>角色：</h2>
      <select v-model="role_id" style="width: 300px;height: 30px;">
        <option v-for="item in ritems" :value="item.role_id" >
          {{item.name}}
        </option>

      </select>
      <input type="button" @click="search" value="搜索">
    </div>
  </form>
  <table class="yhtable" style="width: 98%; margin: 20px auto;border-collapse:collapse;" border="1">

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

      this.csel();
    },

    data(){
      return{
        role_id:'',
        items:'',
        ritems:'',
        citems:'',
      }
    },methods:{
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
      getdp:function (id) {

        var _this=this;
        this.$axios.post(_this.global.repathurl+'api/role/list',qs.stringify({
          company_id:id


        }),{
          headers:
            {

              'Content-Type':'application/x-www-form-urlencoded',
              "Authorization": 'Bearer'+' '+token,
            }
        }).then(function (res) {
          _this.ritems=res.data.result;
          //console.log(res);

        })
      },
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
</style>
