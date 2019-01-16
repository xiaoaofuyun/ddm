<template>
  <div>
    <div style="width: 100%;height: 50px ;border-bottom: 2px solid #579fe9">
      <div style="float: right;">
        <ul class="listul">
          <li>
            <router-link :to="{path:'/navlist/tableadd',query:{id:ids}}">新建表</router-link>
          </li>
          <li>
            <router-link :to="{path:'/navlist/tableup',query:{id:ids}}">修改</router-link>
          </li>
          <li>
            <router-link :to="{path:'/navlist/tabledel',query:{id:ids}}">删除</router-link>
          </li>
          <li>
            <router-link :to="{path:'/navlist/tablesel',query:{id:ids}}">查询</router-link>
          </li>
          <li>
            <router-link :to="{path:'/tfield/index',query:{id:ids}}">新建表字段</router-link>
          </li>
          <!--<li><router-link to="/tfield/del"   >删除表字段</router-link></li>-->
          <li>
            <router-link :to="{path:'/tfield/list',query:{id:ids}}">查看表字段</router-link>
          </li>
          <li>
            <router-link :to="{path:'/tfield/dtype',query:{id:ids}}">查询数据类型</router-link>
          </li>
        </ul>
      </div>
    </div>
  <div class="tableaddbox">

    <form >
      <h2 class="tableaddbox_h2">菜单导航ID</h2> <input type="text"  :value="ids" disabled><br>
      <h2 class="tableaddbox_h2">数据库表名称 </h2><input type="text" v-model="table_name"><br>
      <h2 class="tableaddbox_h2">前台显示表名称 </h2><input type="text" v-model="show_name"><br>
      <button class="tableaddbox_but" @click="submit()" >保存</button>
    </form></div>
  </div>
</template>

<script>

  var qs = require('qs');
import $ from 'jquery'
var cookie=require('vue-cookies');
var token=cookie.get('token');
//console.log(localStorage.getItem('key1'));
    export default {
        name: "Tableadd",
      // props:['chuanid'],
       data(){
          return{
            menu_id:'',
            table_name:'',
            show_name:'',
            chuanid:'',
            ids:this.$route.query.id,

          }
       },watch: {
        '$route' (to, from,next) {

          // console.log(to.query.listid);
          this.ids=to.query.listid
          //console.log(window.location.href.split('=')[1])
        }},
       methods:{
          submit:function () {
            var _this=this;
            this.$axios.post(_this.global.repathurl+'api/mtable/index',qs.stringify({
              menu_id:_this.ids,
              table_name:_this.table_name,
              show_name:_this.show_name
            }),{
              headers:
                {

                  'Content-Type':'application/x-www-form-urlencoded',
                  "Authorization": 'Bearer'+' '+token,
                }
            }).then(function (res) {
               // console.log(res);
              if(res.data.code=='1'){
                alert('添加数据表成功');
                window.location.href=_this.global.pathurl+'navlist/tablesel';
              }

            })
          }
       }
    }
</script>

<style scoped>
 .tableaddbox{
   width: 400px;
   margin: 20px auto;
   background-color: #f7f7f7;
   padding: 20px;
   box-sizing: border-box;
 }
  .tableaddbox_h2{
    font-size: 16px;
    line-height: 30px;
    color:#333;
    text-align: left;
  }
  .tableaddbox input{
    width: 100%;
    height: 40px;
    line-height: 40px;
    padding: 0 10px;
    box-sizing: border-box;
    overflow: hidden;
    border:1px solid #ccc;
    margin: 5px 0;
  }
  .tableaddbox_but{
    width: 100%;
    height: 40px;
    line-height: 40px;
    background-color: #579fe9;
    color:#fff;
    font-size: 16px;
    text-align: center;
    border:1px solid #579fe9;
    margin-top: 10px;
    cursor: pointer;
  }
 ul>li {
   float:left;
   margin:5px;
 }
 .listul a{
   text-decoration: none;
   color:#333;
   line-height: 40px;
 }
</style>
