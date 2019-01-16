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
    数据类型：
    <select  v-model="type">

      <option value="1">前台数据类型</option>
      <option value="2">后台数据类型</option>

    </select>
    <input type="button" @click="submit" value="搜索"/>
    <table style="margin: 0 auto;border-collapse:collapse;" border="1">
         <th>数据类型</th><th>名称</th>
        <tr v-for="item in items"><td>{{item.code}}</td><td>{{item.name}}</td></tr>

    </table>
  </div>
</template>

<script>
  var qs = require('qs');
  import $ from 'jquery'
  var cookie=require('vue-cookies');
  var token=cookie.get('token');
    export default {
        name: "dtype",
        data(){

          return{
            type:'',
            items:'',
            ids:this.$route.query.id,
          }
        },methods:{
          submit:function () {
            var _this=this;
            this.$axios.post(_this.global.repathurl+'api/dtype/list',qs.stringify({
              type:_this.type,
            }),{
              headers:
                {

                  'Content-Type':'application/x-www-form-urlencoded',
                  "Authorization": 'Bearer'+' '+token,
                }
            }).then(function (res) {
              _this.items=res.data.result;
              //console.log(res);

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
