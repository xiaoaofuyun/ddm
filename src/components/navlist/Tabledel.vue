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
      <h2 class="tableaddbox_h2">数据表ID</h2>

      <select v-model="menu_table_id" style="width:360px;height: 30px;" >
        <option v-for="item in ditems" :value="item.menu_table_id">{{item.show_name}}</option>

      </select>

      <button class="tableaddbox_but" @click="submit()" >删除</button>
    </form></div>
  </div>
</template>

<script>
  var qs = require('qs');
  import $ from 'jquery'
  var cookie=require('vue-cookies');
  var token=cookie.get('token');

  export default {
    name: "Tableaup",
    data(){
      return{
        menu_table_id:'',
        ids:this.$route.query.id,
        ditems:'',

      }
    },
    mounted:function(){
      this.tablemenuid();
    },
    methods:{
      tablemenuid:function(){
        var _this=this;
        this.$axios.post(_this.global.repathurl+'api/mtable/info',qs.stringify({

          menu_id:this.$route.query.id,

        }),{
          headers:
            {

              'Content-Type':'application/x-www-form-urlencoded',
              "Authorization": 'Bearer'+' '+token,
            }
        }).then(function (res) {
          _this.ditems=res.data;
          //console.log(res);

        })
      },
      submit:function () {
        var _this=this;
        this.$axios.post(_this.global.repathurl+'api/mtable/del',qs.stringify({
          menu_table_id:this.menu_table_id,

        }),{
          headers:
            {

              'Content-Type':'application/x-www-form-urlencoded',
              "Authorization": 'Bearer'+' '+token,
            }
        }).then(function (res) {
          //console.log(res);
          if(res.data.code=='1'){
            alert('删除成功');
            window.location.href=_this.global.pathurl+'navlist/tablesel?id='+_this.ids;
          }else{
            alert('删除失败');
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
  }ul>li {
     float:left;
     margin:5px;
   }
  .listul a{
    text-decoration: none;
    color:#333;
    line-height: 40px;
  }
</style>
