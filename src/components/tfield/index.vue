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
  <table class="xinjiantab" width="500px" height="600px" cellspacing="0" border="1" style="border-collapse:collapse;margin: 20px auto">
    <tr>
      <td>表</td>

      <td>

        <select v-model="menu_table_id" style="width:330px;height: 30px;">
          <option v-for="item in mitems" :value="item.menu_table_id">{{item.show_name}}</option>

        </select>

      </td>

    </tr>
    <tr><td>字段名称(英文)</td><td><input type="text"  v-model="field_name"></td></tr>
    <tr><td>前台显示名称</td><td><input type="text" v-model="field_show" ></td></tr>
    <tr> <td>后台字段类型</td><td>

      <select name="" v-model="data_type" >
        <option v-for="item in ditems" :value="item.code">
          {{item.name}}
        </option>
      </select>
    </td></tr>
    <tr> <td>前台字段类型</td><td>

      <select name="" v-model="parameter_type" >
        <option v-for="item in pitems" :value="item.code">
          {{item.name}}
        </option>
      </select>
    </td></tr>
  <tr> <td>显示状态</td><td>
    <select name="" v-model="is_show" >
    <option value="1">显示</option>
    <option value="0">不显示</option>
    </select></td> </tr>
   <tr> <td>前台显示宽度</td><td><input type="text" v-model="view_with"></td> </tr>
    <tr><td>排序</td><td><input type="text" v-model="order"></td> </tr>
    <tr> <td>是否必填</td><td><select name=""  v-model="is_required">
      <option value="1" selected="selected">是</option>
      <option value="0">否</option>
    </select></td></tr>
    <tr><td>是否唯一</td><td><select name="" v-model="is_indexes">
      <option value="1">是</option>
      <option value="0" selected="selected">否</option>
    </select></td></tr>
    <tr><td></td><td><input class="xinjiantab_but" type="button" value="提交" @click="submit()"></td></tr>




  </table></form>


</div>
</template>

<script>
  var qs = require('qs');
  import $ from 'jquery'
  var cookie=require('vue-cookies');
  var token=cookie.get('token');
  //console.log(token);
    export default {
        name: "index",
      mounted:function(){
          this.dat_type();
          this.par_type();
          this.tablemenuid();
      },
      data(){
          return{
            menu_table_id:'',
            field_name:'',
            field_show:'',
            data_type:'',
            parameter_type:'',
            is_show:'',
            view_with:'',
            order:'',
            is_required:'',
            is_indexes:'',
            type:'',
            pitems:'',
            ditems:'',
            ids:this.$route.query.id,
            mitems:'',



          }
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
          dat_type:function(){
            var _this=this;
            this.$axios.post(_this.global.repathurl+'api/dtype/list',qs.stringify({
              type:2,
            }),{
              headers:
                {

                  'Content-Type':'application/x-www-form-urlencoded',
                  "Authorization": 'Bearer'+' '+token,
                }
            }).then(function (res) {
              _this.ditems=res.data.result;
              //console.log(res);

            })
          },
         par_type:function(){
           var _this=this;
           this.$axios.post(_this.global.repathurl+'api/dtype/list',qs.stringify({
             type:1,
           }),{
             headers:
               {

                 'Content-Type':'application/x-www-form-urlencoded',
                 "Authorization": 'Bearer'+' '+token,
               }
           }).then(function (res) {
             _this.pitems=res.data.result;
             //console.log(res);

           })
         },
          submit:function () {
               var json=[{
                 menu_table_id:this.menu_table_id,
                 field_name:this.field_name,
                 field_show:this.field_show,
                 data_type:this.data_type,
                 parameter_type:this.parameter_type,
                 is_show:this.is_show,
                 view_with:this.view_with,
                 order:this.order,
                 is_required:this.is_required,
                 is_indexes:this.is_indexes
               }]


               this.$axios.put(this.global.repathurl+'api/tfield/index ',json,{
                 headers:
                   {

                     'Content-Type':'application/json',
                     "Authorization": 'Bearer'+' '+token,
                   }
               }).then(function (res) {

                 //console.log(res);
                 if(res.data.code=='1'){
                   alert('添加成功');

                   window.location.href=that.global.pathurl+'tfield/list'

                 }else{
                   alert('添加失败');

                   window.location.href=that.global.pathurl+'tfield/list'
                 }
               }).catch(function (err) {
                 console.log(err)
               })
          }
      }
    }
</script>

<style scoped>
  .xinjiantab input{
    width: 96%;
    padding: 0 10px;
    box-sizing: border-box;
    line-height: 30px;
    border: 1px solid #ccc;
    display: block;
    margin: 0 auto;
  }
  .xinjiantab select{
    width: 96%;
    padding: 0 10px;
    box-sizing: border-box;
    line-height: 30px;
    border: 1px solid #ccc;
    display: block;
    margin: 0 auto;
    height: 30px;
  }
  .xinjiantab_but{
    background-color: #579fe9;
    color:#fff;
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
