<template>
  <div>
    <div class="cptop">

      <span> <router-link to="/role/rlist">角色查看</router-link></span>
      <span> <router-link to="/role/rindex">添加角色</router-link></span>
      <span> <router-link to="/role/listur">查询角色关联的用户</router-link></span>
      <span> <router-link to="/role/createur">角色用户关联</router-link></span>

    </div>
    <br>
    <form>
      <table class="bianjitable" style="width: 500px; margin: 0 auto;border-collapse:collapse;" border="1">

        <tr><td>角色名称</td><td><input type="text" v-model="name"></td></tr>
        <tr><td>角色描述</td><td><textarea cols="30" rows="10" v-model="describe"></textarea></td></tr>
        <tr><td>单位编号</td><td>

          <select  v-model="company_id" >
            <option v-for="item in citems" :value="item.company_id">
              {{item.name}}
            </option>

          </select>

        </td></tr>

      </table>
      <input class="bianjitable_but" type="button" value="提交" @click="rolesubmit">


    </form>
  </div>
</template>

<script>
  var qs = require('qs');
  import $ from 'jquery'
  var cookie=require('vue-cookies');
  var token=cookie.get('token');
  export default {
    name: "rindex",
    mounted:function () {

      this.csel();
    },

    data(){
      return{
        name:'',
        describe:'',
        company_id:'',
        citems:'',
      }
    },methods:{
      csel:function () {
        var _this=this;
        this.$axios.post(_this.global.repathurl+'api/company/list',qs.stringify({



        }),{
          headers:
            {

              'Content-Type':'application/x-www-form-urlencoded',
              "Authorization": 'Bearer'+' '+token,
            }
        }).then(function (res) {
          _this.citems=res.data.result;
          //console.log(res.data.result);

        })
      },
      rolesubmit:function () {

        var _this=this;
        this.$axios.post(_this.global.repathurl+'api/role/index',qs.stringify({
          company_id:_this.company_id,
          name:_this.name,
          describe:_this.describe


        }),{
          headers:
            {

              'Content-Type':'application/x-www-form-urlencoded',
              "Authorization": 'Bearer'+' '+token,
            }
        }).then(function (res) {
          if(res.data.code=='1'){
            alert('添加角色成功');
            window.location.href=_this.global.pathurl+'role/rlist'
          }else{
            alert('添加角色失败');
          }

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
    min-height: 100px;
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
