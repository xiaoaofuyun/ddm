<template>
<div>
  <div>
    <span> <router-link to="/user/create">新增用户</router-link></span>
    <span> <router-link to="/user/repwd">修改密码</router-link></span>
    <span> <router-link to="/user/ulist">用户列表</router-link></span>
    <span><router-link to="/user/udlist">部门用户列表</router-link></span>
    <!--  <span><router-link to="/company/update">修改单位</router-link></span>
      <span><router-link to="/company/del">删除单位</router-link></span>-->
  </div>
  <br>

</div>
</template>

<script>
  var qs = require('qs');
  import $ from 'jquery'
  var cookie=require('vue-cookies');
  var token=cookie.get('token');
  export default {
    name: "udel",
    data(){
      return{

      }
    },
    mounted:function(){
      this.deldo();
    },
    methods: {

      deldo:function () {
        var nid=this.$route.query.id;
        console.log(nid);
        var that=this;
        // that.$router.push(that.global.pathurl)
        console.log(2);
        that.$axios.post(that.global.repathurl+'api/user/del',qs.stringify({user_id:nid}),{
          headers:
            {

              'Content-Type':'application/x-www-form-urlencoded',
              "Authorization": 'Bearer'+' '+token,
            }
        }).then(function (res) {
          if(res.data.code=='1'){
            alert('删除成功');
            //  that.$router.push(that.global.pathurl+'menu/update')
            window.location.href=that.global.pathurl+'user/ulist'
            //parent.parent.location.href=that.global.pathurl
            //location.reload();
          }else{
            alert('删除失败');
            //that.$router.push(that.global.pathurl+'menu/update')
            window.location.href=that.global.pathurl+'user/ulist'
          }
        })
      }
    }


  }
</script>

<style scoped>

</style>
