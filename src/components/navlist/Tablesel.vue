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

        <h2 class="tableaddbox_h2">菜单导航ID</h2> <input type="text" :value="ids" disabled>

        <button class="tableaddbox_but" @click="submit()" >搜索</button>
      </form>
      <br><br>
    </div>



    <table class="tableaddbox_table" style="margin: 0 auto;border-collapse:collapse;" border="1">
      <th>菜单导航ID</th>
      <th>数据表ID</th>
      <th>菜单表名称</th>
      <tr  v-for="item in items">
        <td>{{item.menu_id}}</td>
        <td>{{item.menu_table_id}}</td>
        <td>{{item.show_name}}</td>
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
    name: "Tableasel",
    data(){
      return{

        menu_id:'',
        items:'',
        ids:this.$route.query.id,

      }
    },
    methods:{
      submit:function () {
        var _this=this;
        this.$axios.post(_this.global.repathurl+'api/mtable/info',qs.stringify({

          menu_id:_this.ids,

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
  .tableaddbox_table{
    width: 98%;
    margin: 20px auto;
  }
  .tableaddbox_table th{
    font-size: 18px;
    line-height: 40px;
    text-align: center;
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
