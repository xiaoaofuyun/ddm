<template>
<div>
<form>
  <table class="xinjiantab" width="500px" height="600px" cellspacing="0" border="1" style="border-collapse:collapse;margin: 20px auto">
    <tr>
      <td>表ID</td><td><input type="text" v-model="menu_table_id"></td> </tr>
    <tr><td>字段名称(英文)</td><td><input type="text"  v-model="field_name"></td></tr>
    <tr><td>前台显示名称</td><td><input type="text" v-model="field_show" ></td></tr>
    <tr> <td>后台字段类型</td><td>

      <select name="" v-model="data_type" >
        <option value="text">text</option>
        <option value="text">char</option>
        <option value="int">int</option>
        <option value="varchar">varchar</option>
        <option value="time">time</option>
      </select>
    </td></tr>
    <tr> <td>前台字段类型</td><td>

      <select name="" v-model="parameter_type" >
        <option value="text">text</option>
        <option value="text">char</option>
        <option value="int">int</option>
        <option value="varchar">varchar</option>
        <option value="time">time</option>
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
    export default {
        name: "index",
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
            is_indexes:''




          }
      },
      methods:{

          submit:function () {
               this.$axios.put(this.global.repathurl+'api/tfield/index ',qs.stringify({
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
               }),{
                 headers:
                   {

                     'Content-Type':'application/x-www-form-urlencoded',
                     "Authorization": 'Bearer'+' '+token,
                   }
               }).then(function (res) {
                 console.log(res);
               }).catch(function (err) {
                 console.log(err+qs.stringify)
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
</style>
