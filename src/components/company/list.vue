<template>
<div>
  <div class="cptop">
    <span> <router-link to="/company/cpindex">所有单位</router-link></span>
    <span> <router-link to="/company/list">部门查看</router-link></span>
    <span> <router-link to="/department/dindex">添加部门</router-link></span>
    <span><router-link to="/company/index">新增单位</router-link></span>
   <!-- <span><router-link to="/company/update">修改单位</router-link></span>
    <span><router-link to="/company/del">删除单位</router-link></span>-->
  </div>
  <br>
  <div class="cptop_div">
    <form >

      <h2>单位</h2>

      <select  v-model="company_id"  style="width:370px;height:40px;">
        <option v-for="item in citems" :value="item.company_id">
          {{item.name}}
        </option>

      </select>
      <!--<input type="text" v-model="company_id">-->

      <button class="cptop_div_but" @click="csel()" >搜索</button>
    </form>
  </div>

  <table class="cptop_table" style="border-collapse:collapse;" border="1">

  <th>单位编号</th><th>部门编号</th>  <th>部门名称</th><th>操作</th>
    <tr  v-for="item in items">
      <td>{{item.company_id}}</td>
      <td>{{item.department_id}}</td>
      <td>{{item.name}}</td>
      <td>

        <router-link :to="{path:'/department/dupdate',query:{did:item.department_id,cid:item.company_id}}">编辑</router-link>
        <router-link :to="{path:'/department/ddel',query:{did:item.department_id,cid:item.company_id}}">删除</router-link>
      </td>
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
        name:"list",
      mounted:function () {
       this.compsel();
        this.departmentshow();
      },
   data(){
     return{
               company_id:'',
            items:'',
            citems:'',
          }
    },methods:{
        compsel:function () {
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
          departmentshow:function () {
            var nid=this.$route.query.id;
            var _this=this;
            this.$axios.post(_this.global.repathurl+'api/department/list',qs.stringify({
              company_id:nid


            }),{
              headers:
                {

                  'Content-Type':'application/x-www-form-urlencoded',
                  "Authorization": 'Bearer'+' '+token,
                }
            }).then(function (res) {
              _this.items=res.data.result;
              console.log(res);

            })
          }
       , csel:function () {
          var _this=this;
          this.$axios.post(_this.global.repathurl+'api/department/list',qs.stringify({
            company_id:this.company_id


          }),{
            headers:
              {

                'Content-Type':'application/x-www-form-urlencoded',
                "Authorization": 'Bearer'+' '+token,
              }
          }).then(function (res) {
            _this.items=res.data.result;
            console.log(res);

          })
        }
      }
    }
</script>

<style scoped>
  .cptop{
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
  .cptop_table{
    width: 98%;
    margin: 20px auto;
  }
  .cptop_table th{
    line-height: 40px;
    background-color: #f2f2f2;
  }
  .cptop_table td{
    line-height: 35px;
  }
  .cptop_div{
    width: 98%;
    margin: 20px auto;
  }
  .cptop_div h2{
    display: inline-block;
    vertical-align: middle;
    font-size: 18px;
    line-height: 40px;
    margin-right: 2%;
  }
  .cptop_div input{
    height: 40px;
    overflow: hidden;
    line-height: 40px;
    padding: 0 10px;
    box-sizing: border-box;
    border: 1px solid #ccc;
    display: inline-block;
    vertical-align: middle;
    width: 40%;
  }
  .cptop_div_but{
    height: 40px;
    line-height: 40px;
    background-color: #579fe9;
    color:#fff;
    font-size: 16px;
    border: 1px solid #579fe9;
    overflow: hidden;
    box-sizing: border-box;
    display: inline-block;
    vertical-align: middle;
    width: 10%;
    cursor: pointer;
  }
</style>
