<template>
<div>
  <div class="cptop">
    <span> <router-link to="/permission/pindex">权限新增</router-link></span>
    <span> <router-link to="/permission/pupdate">权限修改</router-link></span>
    <span> <router-link to="/permission/plist">权限列表</router-link></span>
    <span> <router-link to="/permission/prlist">查询角色下所有权限</router-link></span>

  </div>
  <br>

  <form >

    <!--<table  style=" margin: 0 auto;border-collapse:collapse;" border="1">-->
      <!--<tr><td>角色编号</td><td><input type="text" v-model="role_id"></td><td><input type="button" @click="search" value="搜索"></td></tr>-->
    <!--</table>-->
    <div class="pindex_top">
      <h2>角色编号</h2><input type="text" v-model="role_id"><input type="button" @click="search" value="搜索">
    </div>
  </form>

  <div style="">

    <div style="width: 98%;margin: 20px auto">
      <!--<table style=" margin: 0 auto;border-collapse:collapse;" border="1">-->
        <!--<th>按钮编号</th><th>按钮名称</th>-->
        <!--<tr  v-for="item in items.btns">-->
          <!--<td v-if="item>0">{{item}}</td>-->
          <!--<td>{{item.name}}</td>-->
        <!--</tr>-->
      <!--</table>-->

      <div class="quanxiantitle">
        <h2>按钮类</h2>
      </div>
      <ul class="quanxianlist">
        <li  v-for="item in items.btns">
          <h2 class="on" v-if="item>0">{{item}}</h2>
          <h2>{{item.name}}</h2>
        </li>
      </ul>

    </div>
    <div  style="width: 98%;margin: 20px auto">
      <!--<table style=" margin: 0 auto;border-collapse:collapse;" border="1">-->
        <!--<th>菜单编号</th><th>菜单名称</th>-->
        <!--<tr  v-for="item in items.menu">-->
          <!--<td v-if="item>0">{{item}}</td>-->
          <!--<td>{{item.name}}</td>-->
        <!--</tr>-->
      <!--</table>-->

      <div class="quanxiantitle">
        <h2>菜单类</h2>
      </div>
      <ul class="quanxianlist">
        <li v-for="item in items.menu">
          <h2 class="on"  v-if="item>0">{{item}}</h2>
          <h2>{{item.name}}</h2>
        </li>
      </ul>
    </div>
    <div  style="width: 98%;margin: 20px auto">
      <!--<table style=" margin: 0 auto;border-collapse:collapse;" border="1">-->
        <!--<th>表编号</th><th>表名称</th>-->
        <!--<tr  v-for="item in items.table">-->
          <!--<td v-if="item>0" >{{item}}</td>-->
          <!--<td>{{item.show_name}}</td>-->
        <!--</tr>-->
      <!--</table>-->
      <div class="quanxiantitle">
        <h2>表单类</h2>
      </div>
      <ul class="quanxianlist">
        <li  v-for="item in items.table">
          <h2 class="on" v-if="item>0" >{{item}}</h2>
          <h2>{{item.name}}</h2>
        </li>
      </ul>

    </div>
    <div  style="width: 98%;margin: 20px auto">
      <!--<table style=" margin: 0 auto;border-collapse:collapse;" border="1">-->
        <!--<th>功能路径</th><th>功能名称</th>-->
        <!--<tr  v-for="item in items.sys">-->
          <!--<td  v-if="item!=0">{{item}}</td>-->
          <!--<td>{{item.name}}</td>-->
        <!--</tr>-->
      <!--</table>-->

      <div class="quanxiantitle">
        <h2>功能类</h2>
      </div>
      <ul class="quanxianlist">
        <li   v-for="item in items.sys">
          <h2 class="on" v-if="item!=0">{{item}}</h2>
          <h2>{{item.name}}</h2>
        </li>
      </ul>
    </div>
  </div>
  <div style="clear: both"></div>
  <div class="quanxian_but"><router-link  :to="{path:'/permission/pupdate',query:{id:permission_column_id,rid:role_id}}">修改</router-link>
    <router-link :to="{path:'/permission/pdel',query:{id:permission_column_id,rid:role_id}}">删除</router-link>
  </div>
</div>
</template>

<script>
  var qs = require('qs');
  import $ from 'jquery'
  var cookie=require('vue-cookies');
  var token=cookie.get('token');
  export default {
    name: "prlist",
    mounted:function () {

      //this.roleshow();
    },

    data(){
      return{
        role_id:'',
        items:'',
        permission_column_id:'',
      }
    },methods:{
      search:function () {

        var _this=this;
        this.$axios.post(_this.global.repathurl+'api/permission/rlist',qs.stringify({
          role_id:_this.role_id


        }),{
          headers:
            {

              'Content-Type':'application/x-www-form-urlencoded',
              "Authorization": 'Bearer'+' '+token,
            }
        }).then(function (res) {
          if(typeof(res.data[0])=='undefined'){
            res.data[0]="";
          }else{






            var result=res.data[0].permission;
            _this.permission_column_id=res.data[0].permission_column_id;
            _this.items=result;
            _this.role_id=res.data[0].role_id;
          }

          //console.log(res);

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
  }
  .quanxianlist li h2 input{
    display: inline-block;
    vertical-align: middle;
    margin: 0 5px;
  }
  .quanxianlist li.on{
    width: 20%;
  }
  .quanxianlist li h2.on{
    background-color: #e5e5e5;
  }

  .quanxiantitle{
    width: 100%;
    margin: 0 auto 20px auto;
    border-bottom: 1px solid #ccc;
  }
  .quanxiantitle:after{
    content: "";
    clear: both;
    display: block;
  }
  .quanxiantitle h2{
    width: 10%;
    background-color: #579fe9;
    color:#fff;
    text-align: center;
    line-height: 40px;
    font-size: 18px;
    font-weight: normal;
    float: left;
  }
  .quanxianbox{
    float: right;
    font-size: 16px;
    line-height: 40px;
  }
  .quanxianbox input{
    display: inline-block;
    vertical-align: middle;
  }
  .quanxian_but input{
    width: 200px;
    margin: 20px auto;
    display: block;
    background-color: #579fe9;
    color:#fff;
    font-size: 18px;
    line-height: 40px;
    text-align: center;
    border: none;
    cursor: pointer;
  }
  .quanxian_but{
    text-align: center;
    font-size: 0;
  }
  .quanxian_but a{
    display: inline-block;
    vertical-align: middle;
    width: 200px;
    line-height: 40px;
    font-size: 16px;
    text-align: center;
    margin: 0 20px;
    text-decoration: none;
    background-color: #e5e5e5;
    color:#333;
  }
  .quanxian_but a:first-child{
    background-color: #579fe9;
    color:#fff;
  }
</style>
