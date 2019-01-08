<template>
<div>我是删除页</div>
</template>

<script>
  var qs = require('qs');
  import $ from 'jquery'
  var cookie=require('vue-cookies');
  var token=cookie.get('token');
    export default {
        name: "Deldo",
      data(){
           return{

           }
      },
      mounted:function(){
        this.deldo()

      },
      methods:{
        deldo:function () {
          var nid=this.$route.query.id;
          console.log(nid);
          var that=this;
         // that.$router.push(that.global.pathurl)
          console.log(2);
          that.$axios.post(that.global.repathurl+'api/menu/del',qs.stringify({tree_menu_id:nid}),{
            headers:
              {

                'Content-Type':'application/x-www-form-urlencoded',
                "Authorization": 'Bearer'+' '+token,
              }
          }).then(function (res) {
            if(res.data.code=='1'){
              alert('删除成功');
           //  that.$router.push(that.global.pathurl+'menu/update')
              window.location.href=that.global.pathurl+'menu/update'
              //parent.parent.location.href=that.global.pathurl
              //location.reload();
            }else{
              alert('删除失败');
              //that.$router.push(that.global.pathurl+'menu/update')
              window.location.href=that.global.pathurl+'menu/update'
            }
          })
        }
      }


    }
</script>

<style scoped>

</style>
