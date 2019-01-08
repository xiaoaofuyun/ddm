<template>
<div>
  <div>
    <span> <router-link to="/company/cpindex">所有单位</router-link></span>
    <span> <router-link to="/company/list">部门查看</router-link></span>
    <span> <router-link to="/department/dindex">添加部门</router-link></span>
    <span><router-link to="/company/index">新增单位</router-link></span>
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
    name: "ddel",
    data(){
      return{

      }
    },
    mounted:function(){
      this.deldo();
    },
    methods: {

      deldo:function () {
        var did=this.$route.query.did;
        console.log(did);
        var that=this;
        // that.$router.push(that.global.pathurl)
        console.log(2);
        that.$axios.post(that.global.repathurl+'api/department/del',qs.stringify({department_id:did}),{
          headers:
            {

              'Content-Type':'application/x-www-form-urlencoded',
              "Authorization": 'Bearer'+' '+token,
            }
        }).then(function (res) {
          if(res.data.code=='1'){
            alert('删除成功');
            //  that.$router.push(that.global.pathurl+'menu/update')
            window.location.href=that.global.pathurl+'company/cpindex'
            //parent.parent.location.href=that.global.pathurl
            //location.reload();
          }else{
            alert('删除失败');
            //that.$router.push(that.global.pathurl+'menu/update')
            window.location.href=that.global.pathurl+'company/cpindex'
          }
        })
      }
    }


  }
</script>

<style scoped>

</style>
