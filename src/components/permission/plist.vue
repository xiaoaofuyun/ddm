<template>
<div>


  <div  class="cptop">
    <span> <router-link to="/permission/pindex">权限新增</router-link></span>
    <!--<span> <router-link to="/permission/pupdate">权限修改</router-link></span>-->
    <span> <router-link to="/permission/plist">权限列表</router-link></span>
    <span> <router-link to="/permission/prlist">查询角色下所有权限</router-link></span>

  </div>
  <br>
  <div style="">

    <div style="width: 98%;margin: 20px auto" >
      <!--<table style=" margin: 0 auto;border-collapse:collapse;" border="1">-->

        <!--<th>按钮编号</th><th>按钮名称</th>-->


        <!--<tr  v-for="item in items.btns">-->
          <!--<td>{{item.btns_id}}</td>-->
          <!--<td>{{item.name}}</td>-->

        <!--</tr>-->

      <!--</table>-->
      <div class="quanxiantitle">
        <h2>按钮类</h2>
      </div>
      <ul class="quanxianlist">
        <li v-for="item in items.btns">
          <h2 class="on">{{item.btns_id}}</h2>
          <h2>{{item.name}}</h2>
        </li>
      </ul>

    </div>
    <div style="width: 98%;margin: 20px auto">
      <!--<table style=" margin: 0 auto;border-collapse:collapse;" border="1">-->

        <!--<th>菜单编号</th><th>菜单名称</th>-->


        <!--<tr  v-for="item in items.menu">-->
          <!--<td>{{item.tree_menu_id}}</td>-->
          <!--<td>{{item.name}}</td>-->

        <!--</tr>-->

      <!--</table>-->
      <div class="quanxiantitle">
        <h2>菜单类</h2>
      </div>
      <ul class="quanxianlist">
        <li  v-for="item in items.menu">
          <h2 class="on">{{item.tree_menu_id}}</h2>
          <h2>{{item.name}}</h2>
        </li>
      </ul>
    </div>
    <div style="width: 98%;margin: 20px auto">
      <!--<table style=" margin: 0 auto;border-collapse:collapse;" border="1">-->
        <!--<th>表编号</th><th>表名称</th>-->
        <!--<tr  v-for="item in items.table">-->
          <!--<td>{{item.menu_table_id}}</td>-->
          <!--<td>{{item.show_name}}</td>-->
        <!--</tr>-->
      <!--</table>-->
      <div class="quanxiantitle">
        <h2>表单类</h2>
      </div>
      <ul class="quanxianlist">
        <li v-for="item in items.table">
          <h2 class="on">{{item.menu_table_id}}</h2>
          <h2>{{item.show_name}}</h2>
        </li>
      </ul>
    </div>
    <div style="width: 98%;margin: 20px auto">
      <!--<table style=" margin: 0 auto;border-collapse:collapse;" border="1">-->
        <!--<th>功能路径</th><th>功能名称</th>-->
        <!--<tr  v-for="item in items.sys">-->
          <!--<td>{{item.uri}}</td>-->
          <!--<td>{{item.name}}</td>-->
        <!--</tr>-->
      <!--</table>-->
      <div class="quanxiantitle">
        <h2>功能类</h2>
      </div>
      <ul class="quanxianlist">
        <li class="on"  v-for="item in items.sys">
          <h2 class="on">{{item.uri}}</h2>
          <h2>{{item.name}}</h2>
        </li>
      </ul>
    </div>
  </div>

</div>
</template>

<script>
  var qs = require('qs');
  import $ from 'jquery'
  var cookie=require('vue-cookies');
  var token=cookie.get('token');
  //console.log(token);
  export default {
    name: "plist",
    mounted:function () {

    this.search();
    },

    data(){
      return{

         items:'',
      }
    },methods:{
      search:function () {

        var _this=this;
        this.$axios.post(_this.global.repathurl+'api/permission/list',qs.stringify({



        }),{
          headers:
            {

              'Content-Type':'application/x-www-form-urlencoded',
              "Authorization": 'Bearer'+' '+token,
            }
        }).then(function (res) {
          _this.items=res.data;
         // console.log(res);

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
  .quanxiantitle{
    width: 100%;
    margin: 0 auto 20px auto;
    border-bottom: 1px solid #ccc;
  }
  .quanxiantitle h2{
    width: 10%;
    background-color: #579fe9;
    color:#fff;
    text-align: center;
    line-height: 40px;
    font-size: 18px;
    font-weight: normal;
  }
  .quanxianlist{
    text-align: left;
    font-size: 0;
  }
  .quanxianlist li{
    display: inline-block;
    vertical-align: middle;
    width: 12.5%
  }
  .quanxianlist li h2{
    font-size: 16px;
    line-height: 40px;
    text-align: center;
    border: 1px solid #ccc;
    margin: 0 0 -1px -1px;
    font-weight: normal;
  }
  .quanxianlist li.on{
    width: 20%;
  }
  .quanxianlist li h2.on{
    background-color: #e5e5e5;
  }
  @media screen and (max-width: 1366px){
    .quanxianlist li h2{
      font-size: 14px;
    }
  }
</style>
