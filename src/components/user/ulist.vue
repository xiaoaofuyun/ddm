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

  <table class="yhtable" style=" width:98%;margin: 0 auto 40px auto;border-collapse:collapse;" border="1">

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
        name: "ulist",
      data(){
          return{
             items:''
          }
      },
      mounted:function(){
          this.userlist();
      },
      methods:{
        userlist:function () {
          var _this=this;
          this.$axios.post(_this.global.repathurl+'api/user/list',qs.stringify({



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
</style>
