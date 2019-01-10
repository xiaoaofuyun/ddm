<template>
<div>
  <div>

    <span> <router-link to="/role/rlist">角色查看</router-link></span>
    <span> <router-link to="/role/rindex">添加角色</router-link></span>
    <span> <router-link to="/role/listur">查询角色关联的用户</router-link></span>
    <span> <router-link to="/role/createur">角色用户关联</router-link></span>

  </div>
  <br>
  <form >
  角色编号:  <input type="text" v-model="role_id" >

    <table style=" margin: 0 auto;border-collapse:collapse;" border="1">

      <th>用户编号</th>  <th>姓名</th><th>用户名</th><th>操作</th>
      <tr  v-for="item in items">
        <td>{{item.user_id}}</td>

        <td>{{item.name}}</td>

        <td>{{item.username}}</td>
        <td>

          <input type="checkbox" v-model="user_id" :value="item.user_id">
        </td>
      </tr>
      <tr><td colspan="4"><input type="button" value="提交" @click="submit"></td></tr>

    </table>

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
          }
      },
      mounted:function(){
          this.userlist();
      },
      methods:{
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

</style>
