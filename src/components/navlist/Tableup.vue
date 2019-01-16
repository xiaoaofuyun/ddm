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
      <h2 class="tableaddbox_h2">数据表ID </h2>


      <select v-model="menu_table_id" style="width:360px;height: 30px;" @change="selchange">
        <option v-for="item in ditems" :value="item.menu_table_id">{{item.menu_table_id}}</option>

      </select>

      <br>
      <h2 class="tableaddbox_h2">菜单导航ID</h2> <input type="text" :value="ids" disabled><br>
      <h2 class="tableaddbox_h2">数据库表名称</h2>
              <input type="text" id="tn">
             <input type="text" v-for="item in chitems"  v-if="item.menu_table_id==tablename_id" :value="item.table_name" :t_name="item.table_name" id="tablename">
      <br>
      <h2 class="tableaddbox_h2">前台显示表名称</h2>
      <input type="text" id="sn">
             <input type="text" v-for="item in chitems" v-if="item.menu_table_id==tablename_id" :value="item.show_name" :s_name="item.show_name" id="showname">
      <br>
      <button class="tableaddbox_but" @click="submit()" >保存</button>
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
        menu_id:'',
        table_name:'',
        show_name:'',
        ids:this.$route.query.id,
        ditems:'',
        chitems:'',
        tablename_id:'',
        t_name:'',
        s_name:'',
      }
    },
    mounted:function(){
      this.tablemenuid();
    },
    methods:{
      selchange:function(){
        $('#tn').css('display','none');
        $('#sn').css('display','none');
        var _this=this;
        this.tablename_id=this.menu_table_id;
        this.$axios.post(_this.global.repathurl+'api/mtable/info',qs.stringify({

          menu_id:this.$route.query.id,

        }),{
          headers:
            {

              'Content-Type':'application/x-www-form-urlencoded',
              "Authorization": 'Bearer'+' '+token,
            }
        }).then(function (res) {
          _this.chitems=res.data;
          console.log(res);

        })
      },
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
        this.$axios.post(_this.global.repathurl+'api/mtable/update',qs.stringify({
          menu_table_id:this.menu_table_id,
          menu_id:_this.ids,
          table_name:$('#tablename').val(),
          show_name:$('#showname').val()
        }),{
          headers:
            {

              'Content-Type':'application/x-www-form-urlencoded',
              "Authorization": 'Bearer'+' '+token,
            }
        }).then(function (res) {
          console.log(res);

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
