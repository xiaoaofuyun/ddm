<template>
<div>
  <div class="cptop">

    <span> <router-link to="/role/rlist">角色查看</router-link></span>
    <span> <router-link to="/role/rindex">添加角色</router-link></span>
    <span> <router-link to="/role/listur">查询角色关联的用户</router-link></span>
    <span> <router-link to="/role/createur">角色用户关联</router-link></span>

  </div>
  <br>
  <form >
  <!--角色编号:  <input type="text" v-model="role_id" >-->
    <div class="pindex_top">
      <h2>单位：</h2>
      <select name="" v-model="company_id" @change="getdp(company_id)" style="width: 300px;height: 30px;">
        <option v-for="item in citems" :value="item.company_id">
          {{item.name}}
        </option>

      </select>
      <h2>角色</h2>
      <select v-model="role_id" style="width: 300px;height: 30px;">
      <option v-for="item in ritems" :value="item.role_id" >
        {{item.name}}
      </option>

    </select>
    </div>

    <table  class="yhtable" style="width: 98%; margin: 20px auto;border-collapse:collapse;" border="1">

      <th>用户编号</th>  <th>姓名</th><th>用户名</th><th>操作</th>
      <tr  v-for="item in items">
        <td>{{item.user_id}}</td>

        <td>{{item.name}}</td>

        <td>{{item.username}}</td>
        <td>

          <input type="checkbox" v-model="user_id" :value="item.user_id">
        </td>
      </tr>
      <!--<tr><td colspan="4"><input class="bianjitable_but" type="button" value="提交" @click="submit"></td></tr>-->

    </table>
    <input class="bianjitable_but" type="button" value="提交" @click="submit">
  </form>
</div>
</template>

<script>
  var qs = require('qs');
  import $ from 'jquery'
  var cookie=require('vue-cookies');
  var token=cookie.get('token');
    export default {
        name: "createur",

      data(){
          return{
            role_id:'',
            user_id:[],
            items:'',
            ritems:'',
            citems:'',
          }
      },
      mounted:function(){
          this.userlist();
        this.csel();
      },
      methods:{
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
        getdp:function (id) {

          var _this=this;
          this.$axios.post(_this.global.repathurl+'api/role/list',qs.stringify({
            company_id:id


          }),{
            headers:
              {

                'Content-Type':'application/x-www-form-urlencoded',
                "Authorization": 'Bearer'+' '+token,
              }
          }).then(function (res) {
            _this.ritems=res.data.result;
            //console.log(res);

          })
        },
          userlist:function () {
            var _this=this;
            this.$axios.post(_this.global.repathurl+'api/user/list',qs.stringify({



            }),{
              headers:
                {

                  'Content-Type':'application/x-www-form-urlencoded',
                  "Authorization": 'Bearer'+' '+token,
                }
            }).then(function (res) {
              _this.items=res.data;
             // console.log(res);

            })
          },submit:function () {
          var _this=this;
          this.$axios.put(this.global.repathurl+'api/role/createur',{
            role_id:this.role_id,

           user_id:this.user_id,


          },{
            headers:
              {

                'Content-Type':'application/json',
                "Authorization": 'Bearer'+' '+token,
              }
          }).then(function (res) {
            console.log(res)
            if(res.data.code=='1'){
              alert('关联成功');
              window.location.href=_this.global.pathurl+'role/listur'
            }else{
              alert('关联失败');
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
  .pindex_top{
    width: 98%;
    margin: 20px auto;
    font-size: 0;
    text-align: left;
  }
  .pindex_top h2{
    display: inline-block;
    vertical-align: middle;
    font-size: 18px;
    color:#333;
    line-height: 30px;
  }
  .pindex_top input{
    display: inline-block;
    vertical-align: middle;
    height: 30px;
    line-height: 30px;
    padding: 0 10px;
    box-sizing: border-box;
    margin: 0 15px;
  }

  .yhtable{
    margin-bottom: 40px;
  }
  .yhtable th{
    line-height: 40px;
    background-color: #f7f7f7;
  }
  .yhtable td{
    line-height: 40px;
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
