<template>
<div>

  <div class="cptop">
    <span> <router-link to="/company/cpindex">所有单位</router-link></span>
    <span> <router-link to="/company/list">部门查看</router-link></span>
    <span> <router-link to="/department/dindex">添加部门</router-link></span>
    <span><router-link to="/company/index">新增单位</router-link></span>
    <!--<span><router-link to="/company/update">修改单位</router-link></span>
    <span><router-link to="/company/del">删除单位</router-link></span>-->
  </div>
  <br>

  <form>
    <table class="bianjitable" style="width: 500px; margin: 0 auto;border-collapse:collapse;" border="1">
      <tr><td>部门名称</td><td><input type="text" v-model="name"></td></tr>
      <tr><td>部门描述</td><td><textarea v-model="describe"></textarea></td></tr>
      <tr><td>部门代码</td><td><input type="text" v-model="code"></td></tr>

      <tr><td>是否启用</td><td><select name=""  v-model="is_flag">
        <option value="1" selected="selected">是</option>
        <option value="0">否</option>
      </select></td></tr>
      <tr><td>排序</td><td><input type="text" v-model="order"></td></tr>
      <tr><td>单位编号</td><td>
        <input type="text" v-model="company_id">


      </td></tr>

      <!--<tr><td></td><td><input type="button" @click="submit" value="提交"></td></tr>-->

    </table>
    <input class="bianjitable_but" type="button" @click="submit" value="提交">

  </form>

</div>
</template>

<script>
  var qs = require('qs');
  import $ from 'jquery'
  var cookie=require('vue-cookies');
  var token=cookie.get('token');
  export default {
    name: "dindex",
    data(){
      return{
        name:'',
        describe:'',
        code:'',

        is_flag:'',
        company_id:'',
        order:''
      }
    },
    mounted:function(){

    },
    methods: {


      submit:function () {
        var that=this;
        this.$axios.post(this.global.repathurl+'api/department/index ',qs.stringify({
          name:this.name,
          describe:this.describe,
          code:this.code,

          is_flag:this.is_flag,
         company_id:this.company_id,
          order:this.order,
        }),{
          headers:
            {

              'Content-Type':'application/x-www-form-urlencoded',
              "Authorization": 'Bearer'+' '+token,
            }
        }).then(function (res) {
          console.log(res);
          if(res.data.code=='1'){
            alert('添加成功');
            window.location.href=that.global.pathurl+'company/cpindex'
          }else{
            alert('添加失败');
          }
        }).catch(function (err) {
          console.log(err)
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
  .bianjitable td{
    line-height: 40px;
  }
  .bianjitable input,.bianjitable textarea,.bianjitable select{
    line-height: 40px;
    height: 40px;
    width: 100%;
    margin: 0 auto;
    border: none;
    padding: 0 10px;
    box-sizing: border-box;
  }
  .bianjitable textarea{
    height: auto;
  }
  .bianjitable_but{
    background-color: #579fe9;
    color:#fff;
    width:200px;
    height: 40px;
    line-height: 40px;
    border: none;
    margin: 20px auto;
    font-size: 16px;
    cursor: pointer;
  }
</style>
