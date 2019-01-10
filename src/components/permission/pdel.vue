<template>
<div>
  <div>
    <span> <router-link to="/permission/pindex">权限新增</router-link></span>
    <!--<span> <router-link to="/permission/pupdate">权限修改</router-link></span>-->
    <span> <router-link to="/permission/plist">权限列表</router-link></span>
    <span> <router-link to="/permission/prlist">查询角色下所有权限</router-link></span>

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
    name: "pdel",
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

        var that=this;

        that.$axios.post(that.global.repathurl+'api/permission/del',qs.stringify({permission_column_id:nid}),{
          headers:
            {

              'Content-Type':'application/x-www-form-urlencoded',
              "Authorization": 'Bearer'+' '+token,
            }
        }).then(function (res) {
          if(res.data.code=='1'){
            alert('删除成功');

            window.location.href=that.global.pathurl+'permission/prlist'

          }else{
            alert('删除失败');

            window.location.href=that.global.pathurl+'permission/prlist'
          }
        })
      }
    }


  }
</script>

<style scoped>

</style>
