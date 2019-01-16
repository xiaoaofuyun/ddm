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
  <form>

    数据表ID：<select v-model="menu_table_id" style="width:330px;height: 30px;">
    <option v-for="item in mitems" :value="item.menu_table_id">{{item.show_name}}</option>

  </select>
    <input type="button" value="提交" @click="submit">
  </form>
   <table  style="margin: 0 auto;border-collapse:collapse;" border="1">
     <th>表ID</th>
     <th>表字段ID</th>
     <th>表字段名称</th>
     <th>前台显示标题</th>
     <th>后台字段类型</th>
     <th>前台字段类型</th>
     <th>操作</th>
      <tr v-for="item in items">
        <td>{{item.menu_table_id}}</td>
        <td>{{item.table_field_id}}</td>
        <td>{{item.field_name}}</td>
        <td>{{item.field_show}}</td>
        <td>{{item.data_type}}</td>
        <td>{{item.parameter_type}}</td>
        <td>
          <router-link :to="{path:'/tfield/del',query:{tid:item.menu_table_id,fid:item.table_field_id}}">
            删除
          </router-link></td>
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
        name: "list",
      data(){
          return{
            menu_table_id:'',
            items:'',
            ids:this.$route.query.id,
            mitems:'',
          }
      },
      mounted:function(){
          this.tablemenuid();
      },
      methods:{
        tablemenuid:function(){
          var _this=this;
          this.$axios.post(_this.global.repathurl+'api/mtable/info',qs.stringify({

            menu_id:this.ids,

          }),{
            headers:
              {

                'Content-Type':'application/x-www-form-urlencoded',
                "Authorization": 'Bearer'+' '+token,
              }
          }).then(function (res) {
            _this.mitems=res.data;
            //console.log(res);

          })
        },
          submit:function () {
            var _this=this;
            this.$axios.post(_this.global.repathurl+'api/tfield/list',qs.stringify({
              menu_table_id:_this.menu_table_id,
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
