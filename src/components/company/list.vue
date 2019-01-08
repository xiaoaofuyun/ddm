<template>
<div>
  <div>
    <span> <router-link to="/company/cpindex">所有单位</router-link></span>
    <span> <router-link to="/company/list">部门查看</router-link></span>
    <span> <router-link to="/department/dindex">添加部门</router-link></span>
    <span><router-link to="/company/index">新增单位</router-link></span>
   <!-- <span><router-link to="/company/update">修改单位</router-link></span>
    <span><router-link to="/company/del">删除单位</router-link></span>-->
  </div>
  <br>
  <form >

    单位编号ID <input type="text" v-model="company_id">

    <button @click="csel()" >搜索</button>
  </form>
  <table style=" margin: 0 auto;border-collapse:collapse;" border="1">

  <th>单位编号</th>  <th>部门名称</th><th>操作</th>
    <tr  v-for="item in items">
      <td>{{item.company_id}}</td>

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
        name: "list",
      mounted:function () {
       // this.csel()
        this.departmentshow();
      },

    data(){
          return{
               company_id:'',
            items:'',
          }
    },methods:{
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

</style>
