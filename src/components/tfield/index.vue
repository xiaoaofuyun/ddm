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
  <table class="xinjiantab" width="1000px" height="auto" cellspacing="0" border="1" style="border-collapse:collapse;margin: 20px auto">
    <tr >
      <td>表</td><td><select v-model="menu_table_id" style="width:100px;height: 30px;" id="tsel">
      <option v-for="item in mitems" :value="item.menu_table_id">{{item.show_name}}</option>

    </select></td>
      <td    colspan="6" style="text-align: right;border: none"><a href="#" @click="lanadd">添加栏目</a></td>
      <td colspan="3" style="border: none;padding: 0 5px;"><a href="#" @click="landel">删除栏目</a></td></tr>
    <!--<th>表</th>-->
    <th>字段名称(英文)</th>
     <th>前台显示名称</th>
    <th>后台字段类型</th>
    <th>前台字段类型</th>
    <th>显示状态</th>
    <th>前台显示宽度</th>
    <th>排序</th>
    <th>是否必填</th>
    <th>是否唯一</th>
    <th>操作</th>



    <tr class="li_bar" v-for="(v,i) in list ">

      <td style="display: none"><input v-model="menu_table_id"  type="text" /></td>
    <td><input type="text"  v-model="list[i].field_name"></td>
     <td><input type="text" v-model="list[i].field_show" ></td>
      <td><select name="" v-model="list[i].data_type" >
        <option v-for="item in ditems" :value="item.code">
          {{item.name}}
        </option>
      </select></td>
      <td><select name="" v-model="list[i].parameter_type" >
        <option v-for="item in pitems" :value="item.code">
          {{item.name}}
        </option>
      </select></td>
      <td><select name="" v-model="list[i].is_show" >
        <option value="1">显示</option>
        <option value="0">不显示</option>
      </select></td>
      <td><input type="text" v-model="list[i].view_with"></td>
      <td ><input type="text" v-model="list[i].order"></td>
      <td><select name=""  v-model="list[i].is_required">
        <option value="1" >是</option>
        <option value="0">否</option>
      </select></td>
      <td><select name="" v-model="list[i].is_indexes">
        <option value="1">是</option>
        <option value="0" >否</option>
      </select></td>
      <td><input type="checkbox"    v-model="deleterow" :value="i"></td>
    </tr>



<!--{{menu_table_id}}-->


<!--{{deleterow}}-->

  </table>
   <div>
    <!--{{selvalue}}-->
       <input  class="xinjiantab_but" type="button" value="提交" @click="submit()" style="border-radius: 20px;width: 70px ;height: 30px;">

   </div>
</form>



</div>
</template>

<script>
  var qs = require('qs');
  import $ from 'jquery'
  var cookie=require('vue-cookies');
  var token=cookie.get('token');
    export default {
        name: "index",
      mounted:function(){
          this.dat_type();
          this.par_type();
          this.tablemenuid();
      },
      data(){
          return{
            menu_table_id:this.menu_table_id,
            list:[{
            menu_table_id:$('#sel').val(),
            field_name:'',
            field_show:'',
            data_type:'',
            parameter_type:'',
            is_show:'',
            view_with:'',
            order:'',
            is_required:'',
            is_indexes:''}],
            type:'',
            pitems:'',
            ditems:'',
            ids:this.$route.query.id,
            mitems:'',
            deleterow:[],



          }
      },
      methods:{

          landel:function(){
            for (let i = 0; i < this.deleterow.length; i++) {
              let val = this.deleterow
              val.forEach((val, index) => {
                //console.log(val);
                this.list.splice(val,1);



              })

            }
            this.deleterow=[];
          },
          lanadd:function(){

           this.menu_table_id=$('#tsel').val();
            this.list.push({ menu_table_id:this.menu_table_id,
              field_name:'',
              field_show:'',
              data_type:'',
              parameter_type:'',
              is_show:'',
              view_with:'',
              order:'',
              is_required:'',
              is_indexes:''});
          },
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
           var that=this;

               var json=that.list;
                json[0].menu_table_id=this.menu_table_id;

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

                   window.location.href=that.global.pathurl+'tfield/list?id='+that.ids;

                 }else{
                   alert('添加失败');

                   window.location.href=that.global.pathurl+'tfield/list?id='+that.ids;
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
